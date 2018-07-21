import { Map } from 'immutable';

export const authConstants = {
  SET_ACCESS_TOKEN: 'auth/SET_ACCESS_TOKEN',
  SET_REFRESH_TOKEN: 'auth/SET_REFRESH_TOKEN',
  CHECK_ACCESS_TOKEN: 'auth/CHECK_ACCESS_TOKEN',
};

const initialState = Map({
  accessToken: null,
  refreshToken: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case authConstants.SET_ACCESS_TOKEN: {
    return state.set('accessToken', action.payload);
  }
  case authConstants.SET_REFRESH_TOKEN: {
    return state.set('refreshToken', action.payload);
  }
  default: return state;
  }
};

const setAccessToken = token => ({ type: authConstants.SET_ACCESS_TOKEN, payload: token });
const setRefreshToken = token => ({ type: authConstants.SET_REFRESH_TOKEN, payload: token });
const checkAccessToken = () => ({ type: authConstants.CHECK_ACCESS_TOKEN });

export const authActions = {
  setAccessToken,
  setRefreshToken,
  checkAccessToken,
};

const getAccessToken = state => state.auth.get('accessToken');
const getRefreshToken = state => state.auth.get('refreshToken');

export const authSelectors = {
  getAccessToken,
  getRefreshToken,
};
