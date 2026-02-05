import { useParams } from 'react-router-dom';
import styles from './TaskPage.module.css';
import { useTaskPage } from './hooks/useTaskPage';
import { NotFound } from './NotFound';

export const TaskPage = () => {
  const { id } = useParams();

  const {
    task,
    loading,
    error,
    notFound,
    editText,
    setEditText,
    editCompleted,
    setEditCompleted,
    saving,
    saveTask,
    deleteTask,
  } = useTaskPage(id);

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Ошибка: {error}</p>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.taskCard}>
        <h3 className={styles.taskTitle}>Задача #{task.id}</h3>

        <label className={styles.labelCheckbox}>
          <input
            type="checkbox"
            checked={editCompleted}
            onChange={(e) => setEditCompleted(e.target.checked)}
            className={styles['real-checkbox']}
          />
          <span className={styles['custom-checkbox']}></span>
        </label>

        <label className={styles.label}>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            className={styles.textarea}
          />
        </label>

        <div className={styles.buttons}>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
            aria-label="Назад"
          >
            ←
          </button>

          <button
            onClick={saveTask}
            disabled={saving}
            className={styles.saveButton}
          >
            {saving ? 'Сохраняю...' : 'Сохранить'}
          </button>

          <button onClick={deleteTask} className={styles.deleteButton}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
