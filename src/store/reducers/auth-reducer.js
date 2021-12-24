import actionTypes from '../actions-types';

const { ADD_USER, LOG_OUT } = actionTypes.auth;

const initialState = {
  user: {},
  isLoggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        user: action.payload.user,
        isLoggedIn: true,
      };

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default auth;
