import styles from './add-todo.module.css';

export const AddTodoComponent = ({ newTodoText, setNewTodoText, addTodo }) => {
	return (
		<div className={styles['add-todo']}>
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
	);
};
