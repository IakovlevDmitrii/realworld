import actionTypes from '../actions-types';

const { SLUG_CHANGED, LOADING, LOADED, HAS_ERROR } = actionTypes.ARTICLE;

const slugChanged = (slug) => ({
  type: SLUG_CHANGED,
  payload: slug,
});

const articleLoading = () => ({
  type: LOADING,
});

const articleLoaded = (article) => ({
  type: LOADED,
  payload: article,
});

const articleHasError = () => ({
  type: HAS_ERROR,
});

const articleActions = {
  slugChanged,
  articleLoading,
  articleLoaded,
  articleHasError,
};

export default articleActions;
