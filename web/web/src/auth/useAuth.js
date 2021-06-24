import { useDispatch } from 'react-redux';
import { api } from 'API';
import { ACCESS_TOKEN } from 'API';
import { toast } from 'react-toastify';

import allActions from 'actions';

const useAuth = () => {
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const { data } = await api.me();
      dispatch(allActions.authActions.setUser(data));
    } catch (e) {
      dispatch(allActions.authActions.setNoAuth());
      return;
    }
  };

  const login = async loginData => {
    try {
      const { data } = await api.login(loginData);
      localStorage.setItem(ACCESS_TOKEN, `${data.token}`);

      delete data.token;
      dispatch(allActions.authActions.setUser(data));

      toast.success('Nastąpiło poprawne zalogowanie!');
    } catch (e) {
      return e?.response;
    }
  };

  const logout = async () => {
    dispatch(allActions.authActions.logout());

    localStorage.removeItem(ACCESS_TOKEN);
    toast.success("You're safely logged out!");
    window.location.replace('/login');
    return 'done';
  };

  const signup = async data => {
    try {
      await api.signup(data);
      toast.success(
        'Nastąpiła poprawna rejestracja! Aktywuj konto za pomocą linku aktywacyjnego, który wysłaliśmy na wskazany e-mail.'
      );

      return 'success';
    } catch (e) {
      if (!e?.data?.errors) {
        toast.error(
          'Coś poszło nie tak, spróbuj ponownie lub skontaktuj się z administratorem'
        );
      }
      // eslint-disable-next-line no-console
      console.log(e);
      return e?.response;
    }
  };

  return {
    getCurrentUser,
    login,
    logout,
    signup,
  };
};

export default useAuth;
