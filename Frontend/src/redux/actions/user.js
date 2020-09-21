import openNotification from '../../utils/helpers/openNotification';
import userApi from '../../utils/api/user';

const Actions = {
  setUserData: data => ({
    type: 'USER:SET_DATA',
    payload: data,
  }),
  setIsAuth: bool => ({
    type: 'USER:SET_IS_AUTH',
    payload: bool,
  }),
  fetchUserData: () => dispatch => {
    userApi
      .getMe()
      .then(({ data }) => {
        dispatch(Actions.setUserData(data));
      })
      .catch(err => {
        if (err.response.status === 403) {
          dispatch(Actions.setIsAuth(false));
          delete window.localStorage.token;
        }
      });
  },
  fetchUserLogin: postData => dispatch => {
    return userApi
      .signIn(postData)
      .then(({ data }) => {
        const { token } = data;
        openNotification({
          title: 'Отлично!',
          text: 'Авторизация успешна.',
          type: 'success',
        });
        window.axios.defaults.headers.common['token'] = token;
        window.localStorage['token'] = token;
        dispatch(Actions.fetchUserData());
        dispatch(Actions.setIsAuth(true));
        return data;
      })
      .catch(({ response }) => {
        openNotification({
          title: 'Ошибка при авторизации',
          text: 'Неверный логин или пароль',
          type: 'error',
        });
      });
  }
};

export default Actions;