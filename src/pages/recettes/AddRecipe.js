/**
 * Composant AddRecipe
 * Permet à l'utilisateur d'ajouter une nouvelle recette via un formulaire.
 * Utilise le hook useCreateRecipe pour envoyer la nouvelle recette à l'API.
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateRecipe } from '../../hooks/Api/useRecipesApi';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import recipeSchema from '../../validators';

function AddRecipe() {
  const navigate = useNavigate();
  const createRecipeMutation = useCreateRecipe();

  const {
    register,
    control,
    form,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      title: '',
      image: '',
      ingredients: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const {mutate: addRecipe} = useCreateRecipe();

  const onSubmit = (data) => {
    const newRecipe = {
      title: data.title,
      image: data.image + '?text=' + data.title,
      ingredients: data.ingredients.filter((ing) => ing.trim() !== ''),
    };

    addRecipe(newRecipe).then(() => {
      reset();
      navigate('/');
    }
    );

    createRecipeMutation.mutate(newRecipe, {
      onSuccess: () => {
        reset();
        navigate('/');
      },
    });
    createRecipeMutation.isLoading && <p>Création de la recette...</p>;
    createRecipeMutation.isError && <p>Erreur lors de la création de la recette.</p>;
    createRecipeMutation.isSuccess && <p>Recette créée avec succès !</p>;
    createRecipeMutation.isPending && <p>En cours</p>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ajouter une nouvelle recette</h2>
      <form {... form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Titre:
            <input
              type="text"
              {...register('title')}
              style={{ marginLeft: '10px', marginBottom: '10px', width: '300px', border: errors.title ? '2px solid red' : undefined }}
            />
          </label>
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>
        <div>
          <label>
            URL de l&apos;image:
            <input
              type="url"
              {...register('image')}
              style={{ marginLeft: '10px', marginBottom: '10px', width: '300px', border: errors.image ? '2px solid red' : undefined }}
            />
          </label>
          {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
        </div>
        <div>
          <label>Ajouter des ingrédients:</label>
          {fields.map((field, index) => (
            <div key={field.id} style={{ marginBottom: '5px' }}>
              <input
                type="text"
                {...register(`ingredients.${index}`)}
                style={{ marginLeft: '10px', width: '200px', border: errors.ingredients && errors.ingredients[index] ? '2px solid red' : undefined }}
              />
              <button type="button" onClick={() => remove(index)} style={{ marginLeft: '10px' }}>
                Supprimer
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append('')} style={{ marginTop: '10px' }}>
            Ajouter un ingrédient
          </button>
          {errors.ingredients && typeof errors.ingredients.message === 'string' && (
            <p style={{ color: 'red' }}>{errors.ingredients.message}</p>
          )}
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Ajouter la recette</button>
      </form>
    </div>
  );
}

export default AddRecipe;
