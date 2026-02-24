import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { ControlPanel, TodoListComponent } from './components';
import { addTodo, onDelete, onToggle } from './utils/components';
import styles from './App.module.css';

export const App = () => {
	const { todos, setTodos, loading, error, setError } = useTodos();

	const [newTodoText, setNewTodoText] = useState('');
	const [searchText, setSearchText] = useState('');
	const [sortAlpha, setSortAlpha] = useState(false);

	// Добавление новой задачи
	const handleAddTodo = () => {
		addTodo(newTodoText, setNewTodoText, setTodos, setError);
	};

	// Удаление задачи
	const handleDeleteTodo = (id) => {
    onDelete(id, setTodos, setError);
  };

	// Обновление completed
	const handleToggleCompleted = (todo) => {
    onToggle(todo, setTodos, setError);
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
			<ControlPanel
				newTodoText={newTodoText}
				setNewTodoText={setNewTodoText}
				addTodo={handleAddTodo}
				searchText={searchText}
				setSearchText={setSearchText}
				setSortAlpha={setSortAlpha}
			/>

			{loading && <p>Loading...</p>}
			{error && <p className={styles.error}>{error}</p>}

			{!loading && !error && (
				<TodoListComponent
					displayedTodos={displayedTodos}
					toggleCompleted={handleToggleCompleted}
					deleteTodo={handleDeleteTodo}
				/>
			)}
		</div>
	);
};
