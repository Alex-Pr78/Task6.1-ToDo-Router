import styles from './search-todo.module.css';

export const SearchTodoComponent = ({searchText, setSearchText, setSortAlpha}) => {
	return (
		<div className={styles['search-todo']}>
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
	);
};
