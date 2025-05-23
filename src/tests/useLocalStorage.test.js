// Tests pour le hook useLocalStorage
import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = [{ id: 1, name: 'Initial' }];

  beforeEach(() => {
    // Nettoyer les mocks avant chaque test
    localStorage.clear();
    jest.restoreAllMocks();
  });

  // Teste l'initialisation à partir de localStorage si la clé existe
  test('initialise la valeur à partir de localStorage si la clé existe', () => {
    const storedData = JSON.stringify([{ id: 2, name: 'Stored' }]);
    localStorage.setItem(key, storedData);

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toEqual([{ id: 2, name: 'Stored' }]);
  });

  // Teste l'initialisation à partir de initialValue si la clé n'existe pas
  test('initialise la valeur à partir de initialValue si la clé n\'existe pas', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toEqual(initialValue);
  });

  // Teste que setValue met à jour l'état et localStorage
  test('setValue met à jour l\'état et localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]([{ id: 3, name: 'Updated' }]);
    });

    expect(result.current[0]).toEqual([{ id: 3, name: 'Updated' }]);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify([{ id: 3, name: 'Updated' }]));
  });

  // Teste la gestion des erreurs lors de la lecture de localStorage
  test('gère les erreurs lors de la lecture de localStorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Erreur de lecture');
    });

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toEqual(initialValue);
  });

  // Teste la gestion des erreurs lors de l\'écriture dans localStorage
  test('gère les erreurs lors de l\'écriture dans localStorage', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Erreur d\'écriture');
    });

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]([{ id: 4, name: 'Test' }]);
    });

    // L'état doit être mis à jour même si localStorage échoue
    expect(result.current[0]).toEqual([{ id: 4, name: 'Test' }]);
  });
});
