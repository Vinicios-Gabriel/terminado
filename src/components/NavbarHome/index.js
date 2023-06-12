import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem } from '../../utils/storage';

import './style.css';

import Logo from '../../assets/logo-horizontal.svg';
import Carrinho from '../../assets/carrinho.svg';
import Loja from '../../assets/loja-icon.svg';
import User from '../../assets/user-icon.svg';
import Vector from '../../assets/vector.svg';

function NavbarHome() {
  const navigate = useNavigate();
  const [name, setName] = useState('Usuário');

  useEffect(() => {
    if (getItem('userName')) {
      setName(getItem('userName'));
    }
  }, []);
  return (
    <nav>
      <img className="logo-navbar" src={Logo} alt="Market Cubos" />
      <ul>
        <li>
          <img src={Carrinho} alt="" /> Meu carrinho
        </li>
        <li onClick={() => navigate('/products')}>
          <img src={Loja} alt="" /> Meus anúncios
        </li>
        <li>
          <img src={User} alt="" />
          {name}
        </li>
      </ul>
      <button onClick={() => navigate('/products')}>
        <img src={Vector} alt="$" /> Quero vender
      </button>
    </nav>
  );
}

export default NavbarHome;
