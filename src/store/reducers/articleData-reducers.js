import actionTypes from '../actions-types';

const { SET_SLUG, DELETE_ARTICLE } = actionTypes.articleData;

const initialState = {
  article: {},
  isTheArticleNew: false,
};

const articleData = (state = initialState, action) => {
  switch (action.type) {
    case SET_SLUG:
      return {
        ...state,
        article: {
          slug: action.payload.slug,
        },
      };

    case DELETE_ARTICLE:
      return initialState;

    default:
      return state;
  }
};

export default articleData;
