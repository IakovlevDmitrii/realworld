import { combineReducers } from 'redux';

import article from './article-reducer';
import articleList from './arcticle-list-reducer';
import auth from './auth-reducer';

const reducer = combineReducers({
  articlePage: article,
  articleList,
  auth,
});

export default reducer;
