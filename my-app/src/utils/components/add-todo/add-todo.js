import { API_URL } from '../../api-url';

export const addTodo = (newTodoText, setNewTodoText, setTodos, setError) => {
	const trimmedText = newTodoText.trim();
	if (!trimmedText) return;

	const newTodo = {
		title: trimmedText,
		completed: false,
	};

	fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTodo),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка при добавлении');
			}
			return response.json();
		})
		.then((createdTodo) => {
			setNewTodoText('');
			setTodos((prevTodos) => [...prevTodos, createdTodo]);
		})
		.catch((error) => setError(error.message));
};
