import { createStore } from 'redux';
import { recipesReducer } from './reducers';

const store = createStore(
  recipesReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
