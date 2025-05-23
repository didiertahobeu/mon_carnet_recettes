import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import recipesService from '../../services/recipesService';

/**
 * Hook pour récupérer toutes les recettes.
 * Utilise useQuery de react-query pour effectuer une requête GET.
 * @returns {Object} Objet contenant les données, le statut et les erreurs éventuelles.
 */
export function useGetRecipes() {
  return useQuery(['recipes'], recipesService.getRecipes);
}

/**
 * Hook pour récupérer une recette par son ID.
 * Utilise useQuery avec une clé dépendante de l'ID.
 * La requête est activée uniquement si l'ID est défini.
 * @param {string|number} id - L'identifiant de la recette.
 * @returns {Object} Objet contenant les données, le statut et les erreurs éventuelles.
 */
export function useGetRecipeById(id) {
  return useQuery(['recipe', id], () => recipesService.getRecipeById(id), {
    enabled: !!id,
  });
}

/**
 * Hook pour créer une nouvelle recette.
 * Utilise useMutation pour effectuer une requête POST.
 * Invalide la cache des recettes après succès pour rafraîchir les données.
 * @returns {Object} Objet mutation avec les méthodes mutate et status.
 */
export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(recipesService.createRecipe, {

    onSuccess: () => {
      queryClient.invalidateQueries(['recipes']);
    },
    
  });
}

/**
 * Hook pour mettre à jour une recette existante par son ID.
 * Utilise useMutation pour effectuer une requête PUT.
 * Invalide la cache des recettes après succès pour rafraîchir les données.
 * @returns {Object} Objet mutation avec les méthodes mutate et status.
 */
export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(({ id, recipeData }) => recipesService.updateRecipe(id, recipeData), {
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes']);
    },
  });
}

/**
 * Hook pour supprimer une recette par son ID.
 * Utilise useMutation pour effectuer une requête DELETE.
 * Invalide la cache des recettes après succès pour rafraîchir les données.
 * @returns {Object} Objet mutation avec les méthodes mutate et status.
 */
export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation(recipesService.deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes']);
    },
  });
}
