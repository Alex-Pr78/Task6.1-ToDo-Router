import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, такой страницы не существует.</p>
      <button onClick={() => navigate('/')} className={styles.homeButton}>
        На главную
      </button>
    </div>
  );
};