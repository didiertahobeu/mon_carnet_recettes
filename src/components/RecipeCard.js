import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatTitle } from '../utils/formatter';
import useLocalStorage from '../hooks/useLocalStorage';
import ToggleIngredients from './ToggleIngredients';

function RecipeCard({ recipe, children }) {
  const [recipes, setRecipes] = useLocalStorage('recipes');
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);

  const toggleFavorite = () => {
    const updatedFavorite = !isFavorite;
    setIsFavorite(updatedFavorite);

    // Update the recipes in localStorage
    const updatedRecipes = recipes.map(r =>
      r.id === recipe.id ? { ...r, isFavorite: updatedFavorite } : r
    );
    setRecipes(updatedRecipes);
  };

  return (
    <div className="recipe-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
      <img src={recipe.image} alt={formatTitle(recipe.title)} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{formatTitle(recipe.title)}</h2>
      <ToggleIngredients ingredients={recipe.ingredients} />
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} className="recipe-card__footer">
        <button
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: isFavorite ? 'red' : 'gray',
            padding: 0,
            marginRight: '8px',
          }}
        >
          ♥
        </button>
        {children}
      </div>
    </div>
  );
}

export default RecipeCard;
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool,
  }).isRequired,
  children: PropTypes.node,
};
