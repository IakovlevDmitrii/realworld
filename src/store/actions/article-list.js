import { ARTICLE_LIST } from '../actions-types';

const { LOADING, LOADED, HAS_ERROR, PAGE_CHANGED } = ARTICLE_LIST;

export const listLoading = () => ({
  type: LOADING,
});

export const listLoaded = (articles) => ({
  type: LOADED,
  payload: articles,
});

export const listHasError = () => ({
  type: HAS_ERROR,
});

export const listPageChanged = (articleListPage) => ({
  type: PAGE_CHANGED,
  payload: articleListPage,
});
