import { useNavigate } from 'react-router-dom';

import './style.css';

import CreatedProduct from '../../assets/produto-criado.svg';

function ModalCreatedProduct({ functionClose }) {
  const navigate = useNavigate();
  return (
    <div className="container-modal-created-product ">
      <div className="modal-created-product">
        <img src={CreatedProduct} alt="X" onClick={functionClose} />
        <h1>O anúncio foi publicado</h1>
        <span>O anúncio está ativo e o produto disponível para venda</span>
        <button
          className="btn-modal-created-product"
          onClick={() => {
            functionClose();
            navigate('/products');
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalCreatedProduct;
