import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import { addRecipe } from '../store/recipesSlice';

function RecipesPersistence() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const [storedRecipes, setStoredRecipes] = useLocalStorage('recipes', []);

  // Removed initialization dispatch to avoid duplicates since store loads from localStorage
  useEffect(() => {
    // No initialization dispatch here
  }, []);

  // Update localStorage when recipes state changes
  useEffect(() => {
    setStoredRecipes(recipes);
  }, [recipes, setStoredRecipes]);

  return null; // This component does not render anything
}

export default RecipesPersistence;
