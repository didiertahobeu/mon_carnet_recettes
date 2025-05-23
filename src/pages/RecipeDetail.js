import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { recipes } from '../datas/recipesList';
import { formatTitle } from '../utils/formatter';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe] = useState(recipes.find((recette)=> recette.id === parseInt(id)));


  return (
    <div style={{ padding: '20px' }}>
        <h2>Détails de la recette</h2>
        <p>Cette page affichera les détails de la recette sélectionnée.</p>
        <img src={recipe.image} alt={formatTitle(recipe?.title)}  />
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
