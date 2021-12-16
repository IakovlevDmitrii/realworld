import actionTypes from '../actions-types';

const { ADD_USER, LOADING, LOGGED_IN } = actionTypes.AUTH;

const addUser = (user) => ({
  type: ADD_USER,
  payload: {
    user,
  },
});

const authLoading = (status) => ({
  type: LOADING,
  payload: {
    loading: status,
  },
});

const loggedIn = (status) => ({
  type: LOGGED_IN,
  payload: {
    loggedIn: status,
  },
});

const authActions = {
  addUser,
  authLoading,
  loggedIn,
};

export default authActions;
