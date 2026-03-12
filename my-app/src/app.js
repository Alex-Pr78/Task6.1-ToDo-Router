import { Routes, Route } from 'react-router-dom';
import { MainPage, NotFound, TodoPage } from './pages';
import styles from './app.module.css';

export const App = () => (
	<div className={styles.app}>
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/task" element={<TodoPage />} />
			<Route path="/task/:id" element={<TodoPage />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</div>
);
