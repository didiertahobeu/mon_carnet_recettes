import { createSlice } from '@reduxjs/toolkit';
import { recipes } from '../datas/recipesList';

const initialState = {
  recipes: recipes,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, action) {
      state.recipes.push(action.payload);
    },
    addToFavorite(state, action) {
      const recipe = state.recipes.find(r => r.id === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
    },
  },
});

export const { addRecipe, addToFavorite } = recipesSlice.actions;
export default recipesSlice.reducer;
