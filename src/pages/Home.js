import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const [recipes] = useLocalStorage('recipes');
  const [filterText, setFilterText] = useLocalStorage('filterText', '');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    setFilteredRecipes(filterText ? recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(filterText.toLowerCase())
    ) : recipes);
  }, [filterText, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Filtrer les recettes par titre"
        value={filterText}
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