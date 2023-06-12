import { useNavigate } from 'react-router-dom';

import './style.css';

function Card({ productId, img, title, price }) {
  const navigate = useNavigate();

  const value = `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  return (
    <div
      className="card-home"
      onClick={() => {
        navigate(`/home/${productId}`);
      }}
    >
      <img src={img} alt="" />
      <span>{title}</span>
      <h1>{value}</h1>
    </div>
  );
}

export default Card;
