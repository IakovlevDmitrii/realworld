import { ARTICLE } from '../actions-types';

const { SLUG_CHANGED, LOADING, LOADED, HAS_ERROR } = ARTICLE;

export const slugChanged = (slug) => ({
  type: SLUG_CHANGED,
  payload: slug,
});

export const articleLoading = () => ({
  type: LOADING,
});

export const articleLoaded = (article) => ({
  type: LOADED,
  payload: article,
});

export const articleHasError = () => ({
  type: HAS_ERROR,
});
