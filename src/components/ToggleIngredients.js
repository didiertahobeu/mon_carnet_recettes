import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ToggleIngredients({ ingredients }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        onClick={toggleVisibility}
        aria-expanded={isVisible}
        aria-controls="ingredients-list"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '8px',
        }}
      >
        {isVisible ? 'Masquer les ingrédients' : 'Afficher les ingrédients'}
      </button>
     
      {isVisible && (
        <>
        <h2> Ingrédients </h2>
        <ul id="ingredients-list" style={{ paddingLeft: '20px' }}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}

ToggleIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ToggleIngredients;
