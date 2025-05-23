import { recipes } from '../datas/recipesList';
import { ADD_RECIPE, ADD_TO_FAVORITE } from './actions';

const initialState = {
  recipes: recipes,
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case ADD_TO_FAVORITE:
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload
            ? { ...recipe, isFavorite: !recipe.isFavorite }
            : recipe
        ),
      };
    default:
      return state;
  }
};
