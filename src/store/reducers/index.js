import { combineReducers } from 'redux';
import article from './article-reducers';
import authentication from './auth-reducer';

const reducer = combineReducers({
  article,
  authentication,
});

export default reducer;
