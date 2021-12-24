import actionTypes from '../actions-types';

const { CHANGE_SLUG } = actionTypes.article;

const changeSlug = (slug) => ({
  type: CHANGE_SLUG,
  payload: {
    slug,
  },
});

const articleActions = {
  changeSlug,
};

export default articleActions;
