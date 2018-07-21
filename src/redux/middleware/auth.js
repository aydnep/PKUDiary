import { AsyncStorage } from 'react-native';
import { NavigationService } from '../../navigator';
import { authConstants, authActions } from '../auth';

const actions = {
  [authConstants.CHECK_ACCESS_TOKEN]: (store, action, next) => {
    if (!store.getState().auth.get('accessToken')) {
      console.log(action, next);
      Promise.all([AsyncStorage.getItem('accessToken'), AsyncStorage.getItem('refreshToken')])
        .then(([accessToken, refreshToken]) => {
          if (accessToken && refreshToken) {
            store.dispatch(authActions.setAccessToken(accessToken));
            store.dispatch(authActions.setRefreshToken(refreshToken));
          } else {
            NavigationService.navigate('auth');
          }
        })
        .catch(() => {
          NavigationService.navigate('auth');
        });
    }
  },
};

export default store => next => action => {
  if (actions[action.type]) {
    actions[action.type](store, action, next);
  } else {
    next(action);
  }
};
