import { useState } from 'react';
import { recipes } from '../datas/recipesList';

function useLocalStorage(key, initialValue = recipes) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Erreur lors de la lecture de la clé localStorage “' + key + '”: ', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('Erreur lors de l\'écriture de la clé localStorage “' + key + '”: ', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
