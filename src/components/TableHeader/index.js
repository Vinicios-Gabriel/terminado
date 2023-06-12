import './style.css';

function TableHeader() {
  return (
    <div className="table-header font-weight-700 font-line-17 font-size-14  display-flex display-flex-align-justify font-lato">
      <div className="header-column">
        <strong></strong>
      </div>
      <div className="header-column">
        <strong>Nome</strong>
      </div>
      <div className="header-column">
        <strong>Estoque</strong>
      </div>
      <div className="header-column">
        <strong>Vendidos</strong>
      </div>
      <div className="header-column">
        <strong>Valor</strong>
      </div>
      <div className="header-column">
        <strong></strong>
      </div>
    </div>
  );
}

export default TableHeader;
