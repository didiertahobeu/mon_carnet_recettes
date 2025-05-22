import PropTypes from 'prop-types';
import { formatTitle } from '../utils/formatter';

function RecipeCard({ title, image, ingredients }) {
  return (
    <div className="recipe-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
      <img src={image} alt={formatTitle(title)} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{formatTitle(title)}</h2>
      <h3>Ingredients {ingredients.length}:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeCard;
RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
