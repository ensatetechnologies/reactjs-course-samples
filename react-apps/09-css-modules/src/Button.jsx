import styles from './Button.module.css';

/**
 * Button component demonstrating CSS Modules
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'danger'} props.variant
 * @param {'small' | 'medium' | 'large'} props.size
 * @param {boolean} props.disabled
 * @param {boolean} props.loading
 * @param {React.ReactNode} props.children
 */
function Button({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  loading = false,
  children, 
  ...props 
}) {
  // Build class name from multiple CSS Module classes
  const classNames = [
    styles[variant],
    size !== 'medium' && styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled || loading} {...props}>
      {children}
    </button>
  );
}

export default Button;
