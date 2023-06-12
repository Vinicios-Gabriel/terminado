import './style.css';
import { useNavigate } from 'react-router-dom';

function CreatedUser() {
  const navigate = useNavigate();
  return (
    <div className="container-modal display-flex display-flex-align-justify">
      <div className="modal display-flex flex-column font-rubik">
        <h1>Usuario foi cadastrado com sucesso.</h1>
        <button
          onClick={() => {
            navigate('/login');
          }}
        >
          Ir para tela de login
        </button>
      </div>
    </div>
  );
}

export default CreatedUser;
