import actionTypes from '../actions-types';

const { SET_SLUG } = actionTypes.article;
const initialState = {
  slug: '',
};

const article = (state = initialState, action) => {
  if (action.type === SET_SLUG) {
    return {
      slug: action.payload.slug,
    };
  }

  return state;
};

export default article;
