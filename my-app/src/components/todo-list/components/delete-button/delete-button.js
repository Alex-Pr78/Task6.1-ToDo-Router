import styles from './delete-button.module.css';

export const DeleteButton = ({ deleteTodo, id }) => {
	return (
		<>
			<button
				onClick={() => deleteTodo(id)}
				className={styles['delete-case']}
				aria-label="Удалить"
			></button>
		</>
	);
};
