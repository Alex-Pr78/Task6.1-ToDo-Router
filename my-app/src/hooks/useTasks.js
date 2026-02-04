import { useState, useEffect, useCallback, useMemo } from 'react';
import { useApi, API_URL } from './useApi';

export const useTasks = () => {
	const { loading, error, setError, request } = useApi();

	const [tasks, setTasks] = useState([]);
	const [newTodoText, setNewTodoText] = useState('');
	const [searchText, setSearchText] = useState('');
	const [sortAlpha, setSortAlpha] = useState(false);

	const fetchTasks = useCallback(async () => {
		try {
			const data = await request(API_URL);
			setTasks(data);
		} catch {
			// Ошибка уже в setError внутри useApi
		}
	}, [request]);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const addTodo = useCallback(async () => {
		const trimmedText = newTodoText.trim();
		if (!trimmedText) return;

		try {
			const newTodo = { title: trimmedText, completed: false };
			const createdTodo = await request(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTodo),
			});
			setTasks((prev) => [...prev, createdTodo]);
			setNewTodoText('');
		} catch {
			// Ошибка уже в setError
		}
	}, [newTodoText, request]);

	const filteredTodos = useMemo(() => {
		return tasks.filter((todo) =>
			todo.title.toLowerCase().includes(searchText.toLowerCase()),
		);
	}, [tasks, searchText]);

	const displayedTodos = useMemo(() => {
		if (sortAlpha) {
			return [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
		}
		return filteredTodos;
	}, [filteredTodos, sortAlpha]);

	return {
		tasks,
		loading,
		error,
		newTodoText,
		setNewTodoText,
		searchText,
		setSearchText,
		sortAlpha,
		setSortAlpha,
		addTodo,
		displayedTodos,
		setError,
		fetchTasks,
	};
};
