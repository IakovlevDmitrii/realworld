import actionTypes from '../actions-types';

const { ADD_USER } = actionTypes.auth;

const addUser = (user) => ({
  type: ADD_USER,
  payload: {
    user,
  },
});

const authActions = {
  addUser,
};

export default authActions;
