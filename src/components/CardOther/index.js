import { useNavigate } from 'react-router-dom';

import './style.css';

function CardOther({ pdId, img, title, price, setOtherProducts }) {
  const navigate = useNavigate();

  const value = `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  return (
    <div
      className="card-other"
      onClick={() => {
        setOtherProducts([]);
        navigate(`/home/${pdId}`);
      }}
    >
      <img src={img} alt="" />
      <span>{title}</span>
      <h1>{value}</h1>
    </div>
  );
}

export default CardOther;
