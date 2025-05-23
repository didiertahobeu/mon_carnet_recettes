import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { formatTitle } from '../utils/formatter';

import ToggleIngredients from './ToggleIngredients';
import { addToFavorite } from '../store/actions';

function RecipeCard({recipe,  children }) {
  const dispatch = useDispatch();

  const toggleFavorite = () => {
    dispatch(addToFavorite(recipe.id));
  };

  return (
    <div className="recipe-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
      <img src={recipe.image} alt={formatTitle(recipe.title)} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{formatTitle(recipe.title)}</h2>
      <ToggleIngredients ingredients={recipe.ingredients} />
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} className="recipe-card__footer">
        <button
          onClick={toggleFavorite}
          aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: recipe.isFavorite ? 'red' : 'gray',
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
