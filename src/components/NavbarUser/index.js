import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem } from '../../utils/storage';

import './style.css';

import Arrow from '../../assets/arrow-back.svg';
import Logo from '../../assets/logo-horizontal.svg';
import User from '../../assets/user-icon.svg';

function NavbarUser({ route }) {
  const navigate = useNavigate();
  const [name, setName] = useState('Usuário');

  useEffect(() => {
    if (getItem('userName')) {
      setName(getItem('userName'));
    }
  }, []);
  return (
    <nav className="nav-user">
      <img className="cursor-pointer" src={Arrow} alt="<" onClick={() => navigate(route)} />
      <img className="logo-navbar " src={Logo} alt="Market Cubos" />

      <li className="user">
        <img src={User} alt="" />
        {name}
      </li>
    </nav>
  );
}

export default NavbarUser;
