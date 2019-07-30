import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

import Background from '../../components/Background';
import Header from '../../components/Header';

import {
  Container,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um email válido'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, password) => {
    return oldPassword
      ? password.required('A sua nova senha é obrigatória')
      : password;
  }),
  confirmPassword: Yup.string().when(
    'password',
    (password, confirmPassword) => {
      return password
        ? confirmPassword
            .required('A confirmação de senha é obrigatória')
            .oneOf(
              [Yup.ref('password')],
              'Verifique a sua senha de confirmação'
            )
        : confirmPassword;
    }
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  async function handleSubmit() {
    const data = {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
    };

    try {
      await schema.validate(data);
    } catch (err) {
      Alert.alert('Erro', err.errors[0]);
      return;
    }

    dispatch(updateProfileRequest(data));
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            placeholder="Nome completo"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            placeholder="Digite seu e-mail"
            ref={emailRef}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            placeholder="Senha atual"
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            placeholder="Sua senha secreta"
            ref={passwordRef}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton onPress={handleSubmit} loading={loading}>
            Salvar Perfil
          </SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Meetup</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
