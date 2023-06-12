import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo-vertical.svg';
import Input from '../../components/Input';
import api from '../../services/api';

import { getItem, setItem } from '../../utils/storage';

import './style.css';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  function handleForm(e) {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!form.email || !form.password) {
      setError(true);
      return;
    }

    await handleLogin();
    return;
  }

  async function handleLogin() {
    try {
      const response = await api.post('/login', {
        email: form.email,
        senha: form.password,
      });

      setItem('token', response.data.token);
      setItem('userId', response.data.id);
      setItem('userName', response.data.name);
      navigate('/home');
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    if (getItem('token')) {
      navigate('/home');
    }
  }, []);
  return (
    <div className="login display-flex flex-column">
      <img className="logo-login" src={Logo} alt="Market Cubos" />

      <h1>Boas-vindas!</h1>
      <h4>Use seu e-mail e senha para acessar a conta</h4>

      <form className="display-flex flex-column" onSubmit={e => handleSubmit(e)}>
        <Input id="email" type="text" name="email" label="E-mail" functionChange={handleForm} />
        <Input id="password" type="password" name="password" label="Password" functionChange={handleForm} />
        {error && <span className="error">* Senha ou e-mail incorretos</span>}
        <button className="display-flex display-flex-align-justify">Fazer login</button>
      </form>

      <span>
        Não possui conta?
        <Link className="link" to={'/sign-up'}>
          {' '}
          Cadastro
        </Link>
      </span>
    </div>
  );
}

export default Login;
