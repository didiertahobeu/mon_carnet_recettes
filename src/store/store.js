import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
