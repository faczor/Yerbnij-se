import { SET_USER, LOGOUT, SET_NO_AUTH } from 'actions/auth.action';

const INITIAL_STATE = {
  isAuthenticated: null,
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.item,
        isAuthenticated: true,
      };

    case SET_NO_AUTH:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOGOUT:
      return {
        isAuthenticated: null,
      };
    default:
      return state;
  }
};

export default moviesReducer;
