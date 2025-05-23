export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';

export const addRecipe = (recipe) => ({
  type: ADD_RECIPE,
  payload: recipe,
});

export const addToFavorite = (recipeId) => ({
  type: ADD_TO_FAVORITE,
  payload: recipeId,
});
