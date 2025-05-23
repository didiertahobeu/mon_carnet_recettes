// Tests pour le composant RecipeCard
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeCard from './RecipeCard';
import ToggleIngredients from './ToggleIngredients';
import { useDispatch } from 'react-redux';
import { addToFavorite } from '../store/recipesSlice';

// Mock du hook useDispatch de Redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock de l'action addToFavorite
jest.mock('../store/recipesSlice', () => ({
  addToFavorite: jest.fn((id) => ({ type: 'ADD_TO_FAVORITE', payload: id })),
}));

describe('RecipeCard', () => {
  const mockDispatch = jest.fn();

  const recipe = {
    id: 1,
    title: 'test recipe',
    image: 'test-image.jpg',
    ingredients: ['ingredient1', 'ingredient2'],
    isFavorite: false,
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
    addToFavorite.mockClear();
  });

  // Test de rendu du composant avec les props
  test('rend correctement le composant avec les bonnes props', () => {
    render(
      <RecipeCard recipe={recipe}>
        <div>Enfant</div>
      </RecipeCard>
    );

    // Vérifie que l'image est affichée avec la bonne source et alt
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', recipe.image);
    expect(img).toHaveAttribute('alt', 'Test recipe');

    // Vérifie que le titre est affiché formaté
    expect(screen.getByText('Test recipe')).toBeInTheDocument();

    // Vérifie que ToggleIngredients est rendu avec les bons ingrédients
    expect(screen.getByText('ingredient1')).toBeInTheDocument();
    expect(screen.getByText('ingredient2')).toBeInTheDocument();

    // Vérifie que les enfants sont rendus
    expect(screen.getByText('Enfant')).toBeInTheDocument();
  });

  // Test de l'interaction du bouton favori
  test('clique sur le bouton favori déclenche dispatch avec addToFavorite', () => {
    render(<RecipeCard recipe={recipe} />);

    const button = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(button);

    expect(addToFavorite).toHaveBeenCalledWith(recipe.id);
    expect(mockDispatch).toHaveBeenCalled();
  });

  // Test du label aria et couleur du bouton selon isFavorite
  test('le bouton favori a le bon aria-label et couleur selon isFavorite', () => {
    const { rerender } = render(<RecipeCard recipe={{ ...recipe, isFavorite: false }} />);
    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Add to favorites');
    expect(button).toHaveStyle('color: gray');

    rerender(<RecipeCard recipe={{ ...recipe, isFavorite: true }} />);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
    expect(button).toHaveStyle('color: red');
  });
});
