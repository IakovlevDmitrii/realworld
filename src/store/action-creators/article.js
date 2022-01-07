import actionTypes from '../actions-types';

const { CHANGE_SLUG } = actionTypes.article;

const changeSlug = (slug) => ({
  type: CHANGE_SLUG,
  payload: {
    slug,
  },
});

const article = {
  changeSlug,
};

export default article;
