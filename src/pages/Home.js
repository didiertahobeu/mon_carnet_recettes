import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

function Home({ recipes }) {
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      setFilterText(inputRef.current.value);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Filtrer les recettes par titre"
          ref={inputRef}
          required
          style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
        />
        <button type="submit" style={{ marginBottom: '20px' }}>Filtrer</button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            ingredients={recipe.ingredients}
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
