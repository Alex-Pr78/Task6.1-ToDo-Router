import styles from './todo-list.module.css';
import { CheckboxComponent, DeleteButton } from './components';

export const TodoListComponent = ({ displayedTodos, toggleCompleted, deleteTodo }) => {
	return (
		<ul className={styles.list}>
			{displayedTodos.length === 0 && <li className={styles.empty}>Нет дел.</li>}
			{displayedTodos.map(({ id, title, completed }) => (
				<li
					key={id}
					className={styles.listItem}
					style={{ background: completed ? '#607d8b' : '#1f83f2' }}
				>
					<CheckboxComponent
						toggleCompleted={toggleCompleted}
						title={title}
						completed={completed}
						id={id}
					/>

					<DeleteButton deleteTodo={deleteTodo} id={id} />
				</li>
			))}
		</ul>
	);
};
