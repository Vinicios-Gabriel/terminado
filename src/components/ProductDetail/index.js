import { getItem } from '../../utils/storage';

import './style.css';

import BarCode from '../../assets/barcode.svg';
import CardIcon from '../../assets/cartao-icon.svg';
import Pix from '../../assets/pix-icon.svg';
import Plus from '../../assets/mais-icon.svg';
import Minus from '../../assets/menos-icon.svg';
import Carrinho from '../../assets/carrinho_colorido.svg';

function ProductDetail({ img, title, price, stock }) {
  const name = getItem('userName');

  const value = `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  return (
    <div className="desc-product">
      <img className="img-product" src={img} alt="" />
      <div className="container-product-info">
        <div>
          <h2>{title}</h2>
          <span>
            Vendido e entregue por | <strong>{name}</strong>
          </span>
        </div>
        <h1>{value}</h1>

        <h3>Formas de pagamento</h3>
        <div className="payments">
          <img src={BarCode} alt="" />
          <img src={CardIcon} alt="" />
          <img src={Pix} alt="" />
        </div>

        <h3>Quantidade</h3>
        <div className="quantity">
          <div className="container-quantity">
            <img src={Minus} alt="" />
            <input className="stock" type="text" />
            <img src={Plus} alt="" />
          </div>
          <span>{`${stock} disponíveis`}</span>
        </div>

        <h3>Calcular frete e prazo</h3>
        <input className="cep" placeholder="Digite o CEP" />

        <div className="display">
          <button className="btn-add">
            <img src={Carrinho} alt="" />
            Adicionar ao carrinho
          </button>
          <button className="btn-buy">Comprar agora</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
