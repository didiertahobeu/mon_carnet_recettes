/**
 * Composant Home
 * Affiche la liste des recettes avec un filtre par titre.
 * Utilise le hook useGetRecipes pour récupérer les données depuis l'API.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetRecipes } from '../../hooks/Api/useRecipesApi';
import RecipeCard from '../../components/RecipeCard';

function Home() {
  // Récupération des recettes via le hook personnalisé
  const { data: recipes = [], isLoading, isError } = useGetRecipes();

  // État local pour le texte du filtre et la liste filtrée
  const [filterText, setFilterText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Mise à jour de la liste filtrée à chaque changement du filtre ou des recettes
  useEffect(() => {
    setFilteredRecipes(filterText ? recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(filterText.toLowerCase())
    ) : recipes);
  }, [filterText, recipes]);

  // Affichage pendant le chargement
  if (isLoading) {
    return <div>Chargement des recettes...</div>;
  }

  // Affichage en cas d'erreur
  if (isError) {
    return <div>Erreur lors du chargement des recettes.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Champ de filtre par titre */}
      <input
        type="text"
        placeholder="Filtrer les recettes par titre"
        onChange={e => setFilterText(e.target.value)}
        required
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />
      {/* Affichage des cartes de recettes */}
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            isFavorite={recipe.isFavorite}
            title={recipe.title}
            image={recipe.image}
            ingredients={recipe.ingredients}
            recipe={recipe}
          >
            <Link to={`/recipe/${recipe.id}`}>
              <button>Voir la recette</button>
            </Link>
          </RecipeCard>
        ))}
      </div>
    </div>
  );
}

export default Home;
