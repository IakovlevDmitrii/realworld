import actionTypes from '../actions-types';

const { ADD_USER, LOG_OUT } = actionTypes.auth;

const addUser = (user) => ({
  type: ADD_USER,
  payload: {
    user,
  },
});

const logOut = () => ({
  type: LOG_OUT,
});

const authActions = {
  addUser,
  logOut,
};

export default authActions;
