import { useNavigate } from 'react-router-dom';

import './style.css';

import EditIcon from '../../assets/Edit-Icon.svg';
import TrashIcon from '../../assets/Trash-Icon.svg';

function TableLine({ functionModal, pdId, img, title, stock, price }) {
  const navigate = useNavigate();

  const value = `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  return (
    <div className="table-line display-flex display-flex-align-justify font-lato">
      <div className="line-column line-bold">
        <img className="product-img" src={img} alt="" />
      </div>
      <div className="line-column line-normal">
        <span>{title}</span>
      </div>
      <div className="line-column line-normal">
        <span>{stock}</span>
      </div>
      <div className="line-column line-normal">
        <span>{0}</span>
      </div>
      <div className="line-column line-normal">
        <span className={`transaction-date-value transaction-value`}>{value}</span>
      </div>
      <div className="line-column display-flex display-flex-align-justify edit-delete cursor-pointer">
        <img src={EditIcon} alt="Editar" onClick={() => navigate(`/edit/${pdId}`)} />
        <img src={TrashIcon} alt="Excluir" onClick={() => functionModal(pdId)} />
      </div>
    </div>
  );
}

export default TableLine;
