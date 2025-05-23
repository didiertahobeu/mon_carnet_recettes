import * as yup from 'yup';

const recipeSchema = yup.object().shape({
  title: yup.string().required('Le titre est obligatoire').min(3, 'Le titre doit contenir au moins 3 caractères'),
  image: yup.string().required('L\'URL de l\'image est obligatoire').url('L\'URL de l\'image doit être valide'),
  ingredients: yup.array()
    .of(yup.string().required('Ingrédient invalide'))
    .min(1, 'Veuillez ajouter au moins un ingrédient'),
});

export default recipeSchema;
