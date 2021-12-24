import { combineReducers } from 'redux';
import auth from './auth-reducer';
import article from './article-reducers';

const reducer = combineReducers({
  auth,
  article,
});

export default reducer;
