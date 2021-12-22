// import { createStore, applyMiddleware, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import reducer from './reducers';
//
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;
//
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
//
// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('user', serialisedState);
  } catch (error) {
    console.warn(error);
  }
};
const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem('user');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(reducer, loadFromLocalStorage(), composeEnhancers(applyMiddleware(thunkMiddleware)));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
