import src from '../../components/header/image/User.png';

const initialState = {
  isAuthenticated: false,
  name: '',
  imageSrc: src,
};

const user = (state = initialState, action) => {
  if (action.type === 'user_authenticated') {
    return {
      isAuthenticated: true,
      name: '',
      imageSrc: '',
    };
  }

  return state;
};

export default user;
