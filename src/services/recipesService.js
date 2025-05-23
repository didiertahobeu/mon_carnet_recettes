import axios from 'axios';

const API_BASE_URL = 'https://test.recipescard.fr/api/v1/recettes';

const recipesService = {
  getRecipes: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRecipeById: async (id) => {
    try {
      const response = await axios.get(API_BASE_URL + '/' + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createRecipe: async (recipeData) => {
    try {
      const response = await axios.post(API_BASE_URL, recipeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateRecipe: async (id, recipeData) => {
    try {
      const response = await axios.put(API_BASE_URL + '/' + id, recipeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRecipe: async (id) => {
    try {
      const response = await axios.delete(API_BASE_URL + '/' + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default recipesService;
