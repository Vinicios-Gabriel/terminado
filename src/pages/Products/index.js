import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setItem, getItem, removeItem } from '../../utils/storage';
import api from '../../services/api';

import NavbarUser from '../../components/NavbarUser';
import Empty from '../../components/Empty';
import TableHeader from '../../components/TableHeader';
import TableLine from '../../components/TableLine';
import ModalRemove from '../../components/ModalRemove';

import './style.css';

import PlusIcon from '../../assets/mais-branco-icon.svg';

function Products() {
  const navigate = useNavigate();
  const [modalRemove, setModalRemove] = useState(false);
  const [noProducts, setNoProducts] = useState(true);
  const [products, setProducts] = useState([]);

  async function handleModalRemove(id) {
    if (id) {
      setItem('pdID', id);
    } else {
      removeItem('pdID');
      await handleListAllProducts();
    }

    setModalRemove(!modalRemove);

    return;
  }

  async function handleListAllProducts() {
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
        },
      });
      if (response.data.length >= 1) {
        setNoProducts(false);
      }
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleListAllProducts();
  }, []);
  return (
    <div className="container-body-products ">
      {modalRemove && <ModalRemove functionClose={handleModalRemove} />}
      <NavbarUser route={'/home'} />
      <div className="body display-flex">
        <div className="header-body">
          <h1>Meus produtos</h1>
          <button className="btn-products" onClick={() => navigate('/create')}>
            <img src={PlusIcon} alt="" /> Criar anúncio
          </button>
        </div>
        <div className="container-products-table">
          <TableHeader />
          {noProducts && <Empty />}
          {products.map(product => (
            <TableLine
              functionModal={handleModalRemove}
              key={product.id}
              pdId={product.id}
              img={product.url}
              title={product.titulo}
              stock={product.estoque}
              price={product.preco}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
