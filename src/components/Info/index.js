import './style.css';

function Info({ detail }) {
  return (
    <div className="description-product">
      <h1>Descrição do produto</h1>
      <p>{detail}</p>
    </div>
  );
}

export default Info;
