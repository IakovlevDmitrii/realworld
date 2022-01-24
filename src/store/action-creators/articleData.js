import actionTypes from '../actions-types';

const { SET_SLUG, DELETE_ARTICLE } = actionTypes.articleData;

const setSlug = (slug) => ({
  type: SET_SLUG,
  payload: { slug },
});

const deleteArticle = () => ({
  type: DELETE_ARTICLE,
});

const articleData = {
  setSlug,
  deleteArticle,
};

export default articleData;
