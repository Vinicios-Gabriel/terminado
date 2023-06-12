import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getItem } from '../../utils/storage';
import api from '../../services/api';

import Input from '../../components/Input';
import CreatedUser from '../../components/CreatedUser';
import './style.css';
import Logo from '../../assets/logo-vertical.svg';

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [menssage, setMenssage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [created, setCreated] = useState(false);

  function handleForm(e) {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setMenssage('* Todos os campos devem ser preenchidos');
      setError(true);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMenssage('* As senhas devem ser iguais');
      setError(true);
      return;
    }

    await handleRegistration();
    return;
  }

  async function handleRegistration() {
    try {
      await api.post('/sign-up', {
        nome: form.name,
        email: form.email,
        senha: form.password,
      });

      setCreated(!created);
    } catch (error) {
      setMenssage(error.response.data.mensagem);
      setError(true);
    }
  }

  useEffect(() => {
    if (getItem('token')) {
      navigate('/home');
    }
  }, []);
  return (
    <div className="sing-up display-flex flex-column">
      {created && <CreatedUser />}
      <img className="logo-sing-up" src={Logo} alt="Market Cubos" />

      <h1>Boas-vindas!</h1>
      <h4>Use seu e-mail e senha para acessar a conta</h4>

      <form className="display-flex flex-column " onSubmit={e => handleSubmit(e)}>
        <Input classLabel="label-sign-up" id="name" type="text" name="name" label="Nome" functionChange={handleForm} />
        <Input classLabel="label-sign-up" id="email" type="text" name="email" label="E-mail" functionChange={handleForm} />
        <Input classLabel="label-sign-up" id="password" type="password" name="password" label="Senha" functionChange={handleForm} />
        <Input
          classLabel="label-sign-up"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          label="Confirmação de senha"
          functionChange={handleForm}
        />
        {error && <span className="error">{menssage}</span>}
        <span className="span-sign-up">
          Ao criar uma conta, você concorda com a nossa <strong className="strong-sign-up"> Política de Privacidade</strong> e
          <strong className="strong-sign-up"> Termos de serviço</strong>
        </span>
        <button className="btn-sign-up display-flex display-flex-align-justify">Criar conta</button>
      </form>
      <span>
        Já tem uma conta?{' '}
        <Link className="link" to={'/login'}>
          Fazer login
        </Link>{' '}
      </span>
    </div>
  );
}

export default SignUp;
