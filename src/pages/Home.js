import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

function Home() {
  
  // On utilise le hook useSelector pour accéder à l'état des recettes dans le store Redux
  const recipes = useSelector(state => state.recipes.recipes);

  const [filterText, setFilterText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    setFilteredRecipes(filterText ? recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(filterText.toLowerCase())
    ) : recipes);
  }, [filterText, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Uncomment to enable filtering input */}
      <input
        type="text"
        placeholder="Filtrer les recettes par titre"
        onChange={e => setFilterText(e.target.value)}
        required
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />
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
