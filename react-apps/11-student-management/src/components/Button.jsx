import clsx from 'clsx';
import styles from './Button.module.css';

function Button({ 
  children, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button'
}) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size]
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
