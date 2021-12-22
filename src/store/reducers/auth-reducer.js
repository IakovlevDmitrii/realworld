import actionTypes from '../actions-types';

const { ADD_USER } = actionTypes.auth;

const initialState = {
  user: {},
  isLoggedIn: false,
};

const auth = (state = initialState, action) => {
  // switch (action.type) {
  //    case ADD_USER:
  //       return {
  //          user: action.payload.user,
  //          isLoggedIn: true,
  //       };
  //
  //    case IS_LOGGED_IN:
  //       return {
  //          ...state,
  //          loggedIn: action.payload.loggedIn,
  //       };
  //
  //    default:
  //       return state;
  // }
  if (action.type === ADD_USER) {
    return {
      user: action.payload.user,
      isLoggedIn: true,
    };
  }

  return state;
};

export default auth;
