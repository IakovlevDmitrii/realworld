import actionTypes from '../actions-types';

const { SET_SLUG, DELETE_ARTICLE } = actionTypes.article;
// const initialState = {
//   slug: '',
// };

const article = (state = {}, action) => {
  switch (action.type) {
    case SET_SLUG:
      return {
        slug: action.payload.slug,
      };

    case DELETE_ARTICLE:
      return {};

    default:
      return state;
  }

  // if (action.type === SET_SLUG) {
  //   return {
  //     slug: action.payload.slug,
  //   };
  // }

  // return state;
};

export default article;
