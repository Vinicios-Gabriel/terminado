import { useState, useEffect } from 'react';
import api from '../../services/api';

import NavbarHome from '../../components/NavbarHome';
import Card from '../../components/Card';

import './style.css';

function Home() {
  const [products, setProducts] = useState([]);

  async function handleListAllProducts() {
    try {
      const response = await api.get('/list-products');

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleListAllProducts();
  }, []);
  return (
    <div className="container-body ">
      <NavbarHome />
      <div className="container-cards">
        {products.map(product => (
          <Card key={product.id} productId={product.id} img={product.url} title={product.titulo} price={product.preco} />
        ))}
      </div>
    </div>
  );
}

export default Home;
