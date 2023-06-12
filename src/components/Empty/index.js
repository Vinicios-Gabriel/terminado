import EmptyImg from '../../assets/estoque-vazio.svg';

import './style.css';

function Empty() {
  return (
    <div className="container-empty display-flex display-flex-align-justify">
      <img src={EmptyImg} alt="Sem Produtos" />
    </div>
  );
}

export default Empty;
