import { API_URL } from '../../api-url';

export const onToggle = (todo, setTodos, setError) => {
  fetch(`${API_URL}/${todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Ошибка при обновлении');
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t,
        ),
      );
    })
    .catch((err) => setError(err.message));
};
