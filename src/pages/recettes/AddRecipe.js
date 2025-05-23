/**
 * Composant AddRecipe
 * Permet à l'utilisateur d'ajouter une nouvelle recette via un formulaire.
 * Utilise le hook useCreateRecipe pour envoyer la nouvelle recette à l'API.
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateRecipe } from '../../hooks/Api/useRecipesApi';

function AddRecipe() {
  // Références pour accéder aux champs du formulaire
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const ingredientInputRef = useRef(null);

  // État local pour gérer la liste des ingrédients et les erreurs de validation
  const [ingredients, setIngredients] = useState([]);
  const [errors, setErrors] = useState({ title: false, image: false, ingredients: false });
  const navigate = useNavigate();

  // Hook de mutation pour créer une recette via l'API
  const createRecipeMutation = useCreateRecipe();

  // Ajoute un ingrédient à la liste si non vide et non dupliqué
  const handleAddIngredient = () => {
    const trimmed = ingredientInputRef.current.value.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      ingredientInputRef.current.value = '';
      ingredientInputRef.current.focus();
      setErrors(prev => ({ ...prev, ingredients: false }));
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const image = imageRef.current.value.trim();

    // Validation des champs
    const newErrors = {
      title: !title,
      image: !image,
      ingredients: ingredients.length === 0,
    };

    setErrors(newErrors);

    // Si erreurs, ne pas soumettre
    if (newErrors.title || newErrors.image || newErrors.ingredients) {
      return;
    }

    // Préparation de la nouvelle recette
    const newRecipe = {
      title,
      image: image + '?text=' + title,
      ingredients,
    };

    // Envoi de la mutation pour créer la recette
    createRecipeMutation.mutate(newRecipe, {
      onSuccess: () => {
        // Redirection vers la page d'accueil après succès
        navigate('/');
      },
    });
  };

  // Style conditionnel pour les champs avec erreurs
  const inputStyle = (hasError) => ({
    marginLeft: '10px',
    marginBottom: '10px',
    width: '300px',
    border: hasError ? '2px solid red' : undefined,
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ajouter une nouvelle recette</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Titre:
            <input
              type="text"
              ref={titleRef}
              style={inputStyle(errors.title)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            URL de l&apos;image:
            <input
              type="url"
              ref={imageRef}
              style={inputStyle(errors.image)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Ajouter un ingrédient:
            <input
              type="text"
              ref={ingredientInputRef}
              style={{ marginLeft: '10px', width: '200px' }}
            />
            <button type="button" onClick={handleAddIngredient} style={{ marginLeft: '10px' }}>
              Ajouter
            </button>
          </label>
          {errors.ingredients && <p style={{ color: 'red' }}>Veuillez ajouter au moins un ingrédient.</p>}
        </div>
        <div>
          <h3>Ingrédients ajoutés:</h3>
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Ajouter la recette</button>
      </form>
    </div>
  );
}

export default AddRecipe;
