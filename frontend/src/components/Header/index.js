import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="MeetApp" />
        </Link>
        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </Profile>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
