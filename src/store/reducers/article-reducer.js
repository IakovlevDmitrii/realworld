import actionTypes from '../actions-types';

const { SLUG_CHANGED, LOADING, LOADED, HAS_ERROR } = actionTypes.ARTICLE;

const initialState = {
  isLoading: true,
  article: { slug: '' },
  hasError: false,
};

const article = (state = initialState, action) => {
  switch (action.type) {
    case SLUG_CHANGED:
      if (action.payload !== state.article.slug) {
        return {
          ...initialState,
          article: { slug: action.payload },
        };
      }
      return state;

    case LOADING:
      return {
        isLoading: true,
        article: { ...state.article },
        hasError: false,
      };

    case LOADED:
      return {
        isLoading: false,
        article: action.payload,
        hasError: false,
      };

    case HAS_ERROR:
      return {
        isLoading: false,
        hasError: true,
        article: { ...state.article },
      };

    default:
      return state;
  }
};

export default article;
