import PropTypes from 'prop-types';
import { formatTitle } from '../utils/formatter';

function RecipeCard({title, image, ingredients, children }) {
  return (
    <div className="recipe-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
      <img src={image} alt={formatTitle(title)} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{formatTitle(title)}</h2>
      <h3>Ingredients ({ingredients.length}):</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <div style={{display: 'flex', justifyContent: 'end'}} className="recipe-card__footer">
            {children}
        </div>

    </div>
  );
}

export default RecipeCard;
RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};
