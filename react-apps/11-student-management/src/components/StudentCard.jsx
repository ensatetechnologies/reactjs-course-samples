import clsx from 'clsx';
import styles from './StudentCard.module.css';
import Button from './Button';

function StudentCard({ student, isSelected, onToggle, onEdit, onDelete }) {
  const cardClasses = clsx(
    styles.card,
    { [styles.selected]: isSelected }
  );

  const gradeClass = styles[`grade${student.grade}`];

  return (
    <div className={cardClasses}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {student.name.charAt(0)}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{student.name}</h3>
          <span className={styles.email}>{student.email}</span>
        </div>
        <span className={clsx(styles.badge, gradeClass)}>
          {student.grade}
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Age</span>
          <span className={styles.detailValue}>{student.age}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Status</span>
          <span className={styles.detailValue}>
            {isSelected ? '✓ Selected' : 'Active'}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant={isSelected ? 'ghost' : 'primary'}
          size="small"
          onClick={onToggle}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={onEdit}
        >
          ✏️ Edit
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={onDelete}
        >
          🗑️
        </Button>
      </div>
    </div>
  );
}

export default StudentCard;
