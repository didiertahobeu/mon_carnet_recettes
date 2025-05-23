// Tests pour la fonction formatTitle dans utils/formatter.js
import { formatTitle } from './formatter';

describe('formatTitle', () => {
  // Teste que la première lettre est en majuscule et le reste en minuscules
  test('met en majuscule la première lettre et en minuscules le reste', () => {
    expect(formatTitle('hello')).toBe('Hello');
    expect(formatTitle('hELLO')).toBe('Hello');
  });

  // Teste le cas d\'une chaîne vide
  test('retourne une chaîne vide si l\'entrée est vide', () => {
    expect(formatTitle('')).toBe('');
  });

  // Teste le cas d\'une chaîne en majuscules
  test('convertit une chaîne en majuscules en format titre', () => {
    expect(formatTitle('HELLO')).toBe('Hello');
  });

  // Teste le cas d\'une chaîne avec casse mixte
  test('convertit une chaîne avec casse mixte en format titre', () => {
    expect(formatTitle('hElLo WoRLd')).toBe('Hello world');
  });
});
