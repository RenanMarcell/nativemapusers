import { call, put, select } from 'redux-saga/effects';

import { api } from '~/services';
import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  const { user, coordinates } = action.payload;
  try {
    const { data } = yield call(api.get, user);

    const isDuplicated = yield select(state => state.users.find(item => (
      item.id === data.id
    )));

    if (isDuplicated) {
      console.log('O usuário ja foi adicionado');
    }
    const userData = {
      avatar: data.avatar_url,
      coordinates,
      name: data.name,
      id: data.id,
      bio: data.bio,
    };

    console.log('Usuário adicionado com sucesso');
    yield put(UserActions.addUserSuccess(userData));
  } catch (err) {
    console.log('Ocorreu um erro ao adicionar o usuário');
  }
}

export function* removeUser(action) {
  const updatedUsers = yield select(state => state.users.filter(user => (
    user.id !== action.payload.id
  )));

  console.log('Usuário removido com sucesso');
  yield put(UserActions.removeUserSuccess(updatedUsers));
}
