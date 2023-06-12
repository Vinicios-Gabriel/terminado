import './style.css';

function Input({ classLabel, classInput, id, type, name, label, functionChange }) {
  return (
    <>
      <label className={classLabel ? classLabel : ''} htmlFor={id}>
        {label}
      </label>
      <input className={classInput ? classInput : ''} type={type} id={id} name={name} onChange={e => functionChange(e)} />
    </>
  );
}

export default Input;
