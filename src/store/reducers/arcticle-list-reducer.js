import { ARTICLE_LIST } from '../actions-types';

const { LOADING, LOADED, PAGE_CHANGED, HAS_ERROR } = ARTICLE_LIST;

const initialState = {
  isLoading: true,
  articles: [],
  articlesCount: 0,
  articleListPage: 1,
  hasError: false,
};

const articleList = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...initialState,
        articleListPage: state.articleListPage,
      };

    case LOADED:
      return {
        isLoading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        articleListPage: state.articleListPage,
        hasError: false,
      };

    case PAGE_CHANGED:
      return {
        ...state,
        articleListPage: action.payload,
      };

    case HAS_ERROR:
      return {
        ...initialState,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};

export default articleList;
