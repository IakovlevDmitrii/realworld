import actionTypes from '../actions-types';

const { SET_SLUG, DELETE_ARTICLE } = actionTypes.article;

const setSlug = (slug) => ({
  type: SET_SLUG,
  payload: {
    slug,
  },
});

const deleteArticle = () => ({
  type: DELETE_ARTICLE,
});

const article = {
  setSlug,
  deleteArticle,
};

export default article;
