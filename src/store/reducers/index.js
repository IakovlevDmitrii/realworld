import { combineReducers } from 'redux';

import article from './article-reducer';
import articleList from './arcticle-list-reducer';
import user from './user-reducer';

const reducer = combineReducers({
  articlePage: article,
  articleList,
  user,
});

export default reducer;
