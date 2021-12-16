import actionTypes from '../actions-types';

const { LOADING, LOADED, HAS_ERROR, PAGE_CHANGED } = actionTypes.ARTICLE_LIST;

const listLoading = () => ({
  type: LOADING,
});

const listLoaded = (articles) => ({
  type: LOADED,
  payload: articles,
});

const listHasError = () => ({
  type: HAS_ERROR,
});

const listPageChanged = (articleListPage) => ({
  type: PAGE_CHANGED,
  payload: articleListPage,
});

const articleListActions = {
  listLoading,
  listLoaded,
  listHasError,
  listPageChanged,
};

export default articleListActions;
