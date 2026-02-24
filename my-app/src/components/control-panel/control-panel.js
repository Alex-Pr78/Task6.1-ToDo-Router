import styles from './control-panel.module.css';
import { AddTodoComponent, SearchTodoComponent } from './components';

export const ControlPanel = ({
	newTodoText,
	setNewTodoText,
	addTodo,
	searchText,
	setSearchText,
	setSortAlpha,
}) => {
	return (
		<div className={styles['control-panel']}>
			<h2>Список дел</h2>
			<AddTodoComponent
				newTodoText={newTodoText}
				setNewTodoText={setNewTodoText}
				addTodo={addTodo}
			/>
			<SearchTodoComponent
				searchText={searchText}
				setSearchText={setSearchText}
				setSortAlpha={setSortAlpha}
			/>
		</div>
	);
};
