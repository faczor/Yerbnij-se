export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const SET_NO_AUTH = 'SET_NO_AUTH';

const setUser = item => ({
  type: SET_USER,
  item,
});

const setNoAuth = item => ({
  type: SET_NO_AUTH,
  item,
});

const logout = item => ({
  type: LOGOUT,
  item,
});

export default {
  setUser,
  logout,
  setNoAuth,
};
