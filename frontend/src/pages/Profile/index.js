import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';

import { updateProfileRequest } from '../../store/modules/user/actions';

import Loading from '../../components/Loading';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um email válido'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, password) => {
    return oldPassword ? password.required() : password;
  }),
  confirmPassword: Yup.string().when(
    'password',
    (password, confirmPassword) => {
      return password
        ? confirmPassword.required().oneOf([Yup.ref('password')])
        : confirmPassword;
    }
  ),
});

function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const loading = useSelector(state => state.user.loading);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={profile}>
        <Input type="text" name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <hr />
        <Input type="password" name="oldPassword" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova Senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação da Senha"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Salvar Perfil
        </button>
      </Form>
    </Container>
  );
}

export default Profile;
