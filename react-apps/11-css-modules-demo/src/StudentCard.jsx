import clsx from 'clsx';
import styles from './StudentCard.module.css';

function StudentCard({ student, isSelected, onToggle, onDelete }) {
  // clsx makes conditional classes clean!
  const cardClasses = clsx(
    styles.card,
    { [styles.selected]: isSelected }
  );

  // Dynamic grade class
  const gradeClass = styles[`grade${student.grade}`];

  return (
    <div className={cardClasses}>
      <div className={styles.header}>
        <h3 className={styles.name}>{student.name}</h3>
        <span className={clsx(styles.badge, gradeClass)}>
          {student.grade}
        </span>
      </div>
      
      <p className={styles.details}>Age: {student.age}</p>
      
      <div className={styles.actions}>
        <button
          className={clsx(
            styles.button,
            isSelected ? styles.buttonGhost : styles.buttonPrimary
          )}
          onClick={onToggle}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </button>
        <button
          className={clsx(styles.button, styles.buttonDanger)}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
