import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

function Home({ recipes }) {
  const [filterText, setFilterText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  /* const handleFilter = (value)=>{
    setFilteredRecipes(value ? recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    ): recipes);
  } */

  useEffect(()=>{
    /* if (filterText) {
      setFilteredRecipes(recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(filterText.toLowerCase())
      ));
    }
      else{
      setFilteredRecipes(recipes);
      } */

      setFilteredRecipes(filterText ? recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(filterText.toLowerCase())
      ): recipes);
  }, [filterText, recipes])


  return (
    <div style={{ padding: '20px' }}>
      
        {/* <input
          type="text"
          placeholder="Filtrer les recettes par titre"
          onChange={e=>{handleFilter(e.target.value)}}
          required
          style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
        /> */}

        {/* <input
          type="text"
          placeholder="Filtrer les recettes par titre"
          onChange={e=>{setFilterText(e.target.value)}}
          required
          style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
        /> */}
    
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
