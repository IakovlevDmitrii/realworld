import actionTypes from '../actions-types';

const { SET_SLUG } = actionTypes.article;

const changeSlug = (slug) => ({
  type: SET_SLUG,
  payload: {
    slug,
  },
});

const article = {
  changeSlug,
};

export default article;
