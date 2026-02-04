import { useNavigate } from 'react-router-dom';
import { useTasks } from './hooks/useTasks';
import styles from './TodosList.module.css';

export const TodosList = () => {
	const navigate = useNavigate();
	const {
		loading,
		error,
		newTodoText,
		setNewTodoText,
		searchText,
		setSearchText,

		setSortAlpha,
		addTodo,
		displayedTodos,
	} = useTasks();

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
							<label onClick={() => navigate(`/task/${id}`)}>
								<span
									className={styles.taskTitle}
									title={title}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											navigate(`/task/${id}`);
										}
									}}
								>
									{title}
								</span>
							</label>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
