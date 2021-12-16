import actionTypes from '../actions-types';

const { ADD_USER, LOADING, LOGGED_IN } = actionTypes.AUTH;

const initialState = {
  loading: false,
  loggedIn: false,
  user: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        loading: false,
        loggedIn: true,
        user: action.payload.user,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
      };

    default:
      return state;
  }
};

export default auth;
