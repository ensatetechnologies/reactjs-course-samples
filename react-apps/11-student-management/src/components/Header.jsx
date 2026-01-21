import styles from './Header.module.css';

function Header({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.badge}>Chapter 11</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </header>
  );
}

export default Header;
