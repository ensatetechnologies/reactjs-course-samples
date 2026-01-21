import styles from './Card.module.css';

/**
 * Card component demonstrating CSS Modules
 */
function Card({ 
  icon, 
  iconVariant = 'primary',
  title, 
  subtitle,
  children, 
  footer,
  variant = 'default',
  ...props 
}) {
  const iconStyles = {
    primary: styles.iconPrimary,
    secondary: styles.iconSecondary,
    accent: styles.iconAccent,
  };

  const cardClass = variant === 'featured' ? styles.featured 
                  : variant === 'compact' ? styles.compact 
                  : styles.card;

  return (
    <div className={cardClass} {...props}>
      {(icon || title || subtitle) && (
        <div className={styles.cardHeader}>
          {icon && (
            <div className={iconStyles[iconVariant]}>
              {icon}
            </div>
          )}
          <div>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
          </div>
        </div>
      )}
      
      {children && (
        <div className={styles.cardBody}>
          {children}
        </div>
      )}

      {footer && (
        <div className={styles.cardFooter}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
