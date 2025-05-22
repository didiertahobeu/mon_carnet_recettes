import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../datas/recipesList';



function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      {recipes.map((recipe) => (
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
  );
}

export default Home;
