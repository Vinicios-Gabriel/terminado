import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import NavbarUser from '../../components/NavbarUser';
import ProductDetail from '../../components/ProductDetail';
import Info from '../../components/Info';
import CardOther from '../../components/CardOther';

import './style.css';

import Arrow from '../../assets/arrow-right.svg';

function Detail() {
  const [product, setProduct] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const { id } = useParams();

  async function handleDetail() {
    try {
      const response = await api.get(`/list-products/${id}`);

      setProduct(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOtherProducts() {
    try {
      const response = await api.get(`/list-products/category/${product.categoria_id}?pd=${Number(product.id)}`);

      setOtherProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleDetail();
    handleOtherProducts();
  }, [product]);
  return (
    <div className="container-body-products ">
      <NavbarUser route={'/home'} />
      <div className="container-bosy-detail">
        <h4 className="nav">
          <Link className="nav-link" to={'/home'}>
            Página inicial
          </Link>

          <img className="img-arrow" src={Arrow} alt=">" />
          <samp>{product.titulo}</samp>
        </h4>
        <ProductDetail img={product.url} title={product.titulo} price={product.preco} stock={product.estoque} />
        <Info detail={product.descricao} />

        <h2 className="detail-other">Outros produtos</h2>
        <div className="container-cards-products display-flex">
          {otherProducts.map(pd => (
            <CardOther key={pd.id} pdId={pd.id} img={pd.url} title={pd.titulo} price={pd.preco} setOtherProducts={setOtherProducts} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
