/**
 * Composant RecipeDetail
 * Affiche les détails d'une recette spécifique.
 * Utilise le hook useGetRecipeById pour récupérer les données depuis l'API.
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRecipeById } from '../../hooks/Api/useRecipesApi';
import { formatTitle } from '../../utils/formatter';

function RecipeDetail() {
  // Récupération de l'ID de la recette depuis les paramètres d'URL
  const { id } = useParams();

  // Récupération des données de la recette via le hook personnalisé
  const { data: recipe, isLoading: isLoadingRecip, isError } = useGetRecipeById(id);

  

  // Affichage pendant le chargement
  if (isLoadingRecip) {
    return <div>Chargement de la recette...</div>;
  }

  // Affichage en cas d'erreur ou recette non trouvée
  if (isError || !recipe) {
    return <div>Erreur lors du chargement de la recette.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Détails de la recette</h2>
      <img src={recipe.image} alt={formatTitle(recipe?.title)} />
      <p>Recette ID: {recipe.id}</p>
      <p>Recette NOM: {formatTitle(recipe?.title)}</p>

      <h3>Ingrédients ({recipe.ingredients.length}):</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetail;
