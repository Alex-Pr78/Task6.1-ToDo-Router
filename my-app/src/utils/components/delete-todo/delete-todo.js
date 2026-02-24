import { API_URL } from '../../api-url';

export const onDelete = (id, setTodos, setError) => {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) throw new Error('Ошибка при удалении');
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    })
    .catch((error) => setError(error.message));
};
