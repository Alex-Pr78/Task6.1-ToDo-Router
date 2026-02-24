import styles from './checkbox.module.css';

export const CheckboxComponent = ({ title, completed, toggleCompleted, id}) => {
	return (
		<>
			<label>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompleted({ id, completed })}
              className={styles['real-checkbox']}
            />
            <span className={styles['custom-checkbox']}></span>
            {title}
          </label>
		</>
	)
}
