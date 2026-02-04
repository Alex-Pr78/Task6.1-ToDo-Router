import { useState, useCallback } from 'react';

export const API_URL = 'http://localhost:3005/todos';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);

		if (res.status === 404) {
        throw new Error('Ресурс не найден (404)');
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Ошибка сети');
      }

      if (res.status === 204) return null; // Нет содержимого
      return await res.json();

		
    } catch (err) {
      setError(err.message);
      throw err; // Проброс ошибки, если нужно обработать дальше
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, setError, request };
};
