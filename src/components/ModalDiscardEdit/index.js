import { useNavigate } from 'react-router-dom';

import './style.css';

import CloseIcon from '../../assets/close-icon.svg';

function ModalDiscardEdit({ functionClose }) {
  const navigate = useNavigate();
  return (
    <div className="container-modal-remo">
      <div className="modal-remo">
        <img src={CloseIcon} alt="X" onClick={functionClose} />
        <h1>Descartar alterações</h1>
        <span>As alterações realizadas não foram salvas, deseja descartá-las?</span>
        <div className="container-btn-modal">
          <button
            className="btn-action"
            onClick={() => {
              navigate('/products');
            }}
          >
            Descartar
          </button>
          <button className="btn-cancelar" onClick={functionClose}>
            Continuar editando
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDiscardEdit;
