import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatTitle } from '../utils/formatter';

function RecipeCard({title, image, ingredients, children }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
        <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}} className="recipe-card__footer">
            <button
              onClick={toggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};
