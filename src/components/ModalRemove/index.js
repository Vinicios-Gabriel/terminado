import { getItem } from '../../utils/storage';

import api from '../../services/api';

import './style.css';

import CloseIcon from '../../assets/close-icon.svg';

function ModalRemove({ functionClose }) {
  async function hadleDeleteProduct() {
    const id = getItem('pdID');

    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
        },
      });
      functionClose();
    } catch (error) {}
  }
  return (
    <div className="container-modal-remo">
      <div className="modal-remo">
        <img src={CloseIcon} alt="X" onClick={functionClose} />
        <h1>Remover produto</h1>
        <span>Tem certeza que deseja remover esse produto do estoque? A ação não poderá ser desfeita.</span>
        <div className="container-btn-modal">
          <button className="btn-action" onClick={hadleDeleteProduct}>
            Remover
          </button>
          <button className="btn-cancelar" onClick={functionClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalRemove;
