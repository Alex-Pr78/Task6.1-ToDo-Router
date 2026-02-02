import { useEffect, useState } from 'react';
import styles from './TodosList.module.css';

const API_URL = 'http://localhost:3005/todos';

export const TodosList = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [newTodoText, setNewTodoText] = useState('');
	const [searchText, setSearchText] = useState('');
	const [sortAlpha, setSortAlpha] = useState(false);

	// Загрузка списка задач с сервера
	useEffect (() => {
		setLoading(true);
		fetch(API_URL)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка загрузки данных');
				}
				return response.json();
			})
			.then((data) => {
				setTodos(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	// Добавление новой задачи
	const addTodo = () => {
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

	// Удаление задачи
	const deleteTodo = (id) => {
		fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (!response.ok) throw new Error('Ошибка при удалении');
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
			})
			.catch((error) => setError(error.message));
	};

	// Обновление completed
	const toggleCompleted = (todo) => {
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

	// Фильтрация по поиску
	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchText.toLowerCase()),
	);

	// Сортировка по алфавиту
	const displayedTodos = sortAlpha
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.container}>
			<h2>Список дел</h2>
			{loading && <p>Loading...</p>}
			{error && <p className={styles.error}>{error}</p>}

			<div className={styles['input-wrapper']}>
				<input
					type="text"
					className={styles.todoInput}
					placeholder="Добавить задачу..."
					value={newTodoText}
					onChange={(event) => setNewTodoText(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') addTodo();
					}}
				/>
				<button type="button" onClick={addTodo} className={styles.button}>
					Add
				</button>
			</div>

			<div className={styles['input-wrapper']}>
				<input
					type="text"
					placeholder="Поиск..."
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className={styles.todoInput}
				/>
				<button type="button" onClick={() => setSortAlpha((prev) => !prev)}>
					Ok
				</button>
			</div>

			{!loading && !error && (
				<ul className={styles.list}>
					{displayedTodos.length === 0 && <li className={styles.empty}>Нет дел.</li>}
					{displayedTodos.map(({ id, title, completed }) => (
						<li
							key={id}
							className={styles.listItem}
							style={{ background: completed ? '#607d8b' : '#1f83f2' }}
						>
							<label>
								<input
									type="checkbox"
									checked={completed}
									onChange={() => toggleCompleted({ id, completed })}
									className={styles['real-checkbox']}
								/>
								<span className={styles['custom-checkbox']}></span>
								{title}
							</label>

							<button
								onClick={() => deleteTodo(id)}
								className={styles['delete-case']}
								aria-label="Удалить"
							></button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
