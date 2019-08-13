import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import NavigationService from '../../../services/navigation';
import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Erro na autenticação',
      'Verifique as suas credenciais e tente novamente'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    console.tron.log(response);

    Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso');
    NavigationService.navigate('SignIn');
  } catch (err) {
    Alert.alert('Falha no cadastro', 'Verifique seus dados e tente novamente');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
