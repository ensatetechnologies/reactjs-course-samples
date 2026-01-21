import { useState } from 'react';
import styles from './App.module.css';
import Button from './Button';
import Card from './Card';

function App() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.badge}>Chapter 9 - React</div>
        <h1 className={styles.title}>CSS Modules Demo</h1>
        <p className={styles.subtitle}>Scoped styles without naming conflicts</p>
      </header>

      {/* Button Demo Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🎨 Button Component</h2>
        <p className={styles.sectionDesc}>
          Different button variants using CSS Modules with the <code>composes</code> feature
        </p>

        <div className={styles.demoGrid}>
          <Card 
            icon="🎨" 
            iconVariant="primary"
            title="Variants" 
            subtitle="Different button styles"
          >
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Card>

          <Card 
            icon="📏" 
            iconVariant="secondary"
            title="Sizes" 
            subtitle="Small, medium, large"
          >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary">Medium</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
          </Card>

          <Card 
            icon="⚡" 
            iconVariant="accent"
            title="States" 
            subtitle="Disabled and loading"
          >
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Button variant="primary" disabled>Disabled</Button>
              <Button 
                variant="secondary" 
                loading={loading} 
                onClick={handleLoadingClick}
              >
                {loading ? 'Loading...' : 'Click Me'}
              </Button>
            </div>
          </Card>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dotRed}></span>
            <span className={styles.dotYellow}></span>
            <span className={styles.dotGreen}></span>
            <span>Button.module.css</span>
          </div>
          <pre className={styles.codeContent}>{`/* CSS Modules with composes */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.primary {
  composes: button;  /* Inherits base button styles */
  background: var(--primary);
  color: var(--bg);
}

.secondary {
  composes: button;
  background: var(--secondary);
  color: var(--bg);
}`}</pre>
        </div>
      </section>

      {/* Card Demo Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📦 Card Component</h2>
        <p className={styles.sectionDesc}>
          Flexible card layouts with CSS Module variants
        </p>

        <div className={styles.demoGrid}>
          <Card 
            icon="🚀" 
            iconVariant="primary"
            title="Default Card" 
            subtitle="Standard styling"
            footer={<Button variant="outline" size="small">Learn More</Button>}
          >
            This is a default card with hover effects powered by CSS Modules.
            Each card has scoped styles.
          </Card>

          <Card 
            icon="⭐" 
            iconVariant="secondary"
            title="Featured Card" 
            subtitle="Highlighted content"
            variant="featured"
            footer={<Button variant="primary" size="small">Get Started</Button>}
          >
            Featured cards have a gradient background and primary border color.
          </Card>

          <Card 
            icon="💡" 
            iconVariant="accent"
            title="Compact Card" 
            subtitle="Less padding"
            variant="compact"
          >
            Compact variant for tighter layouts and smaller content areas.
          </Card>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dotRed}></span>
            <span className={styles.dotYellow}></span>
            <span className={styles.dotGreen}></span>
            <span>Button.jsx</span>
          </div>
          <pre className={styles.codeContent}>{`import styles from './Button.module.css';

function Button({ variant = 'primary', size = 'medium', children }) {
  // Combine multiple CSS Module classes
  const classNames = [
    styles[variant],
    size !== 'medium' && styles[size],
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames}>
      {children}
    </button>
  );
}`}</pre>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✅ CSS Modules Benefits</h2>
        <p className={styles.sectionDesc}>
          Why use CSS Modules in React projects
        </p>

        <div className={styles.demoGrid}>
          <Card icon="🔒" iconVariant="primary" title="Scoped by Default">
            Class names are automatically unique. No more naming conflicts 
            or BEM naming conventions needed.
          </Card>

          <Card icon="📦" iconVariant="secondary" title="Composable">
            Use <code>composes</code> to share styles between classes, 
            similar to Sass @extend.
          </Card>

          <Card icon="🛠️" iconVariant="accent" title="Zero Runtime">
            Styles are extracted at build time. No runtime overhead 
            like CSS-in-JS solutions.
          </Card>
        </div>

        <div className={styles.infoBox}>
          <strong>💡 Pro Tip:</strong> CSS Modules work out of the box with Vite! 
          Just name your file <code>*.module.css</code> and import it as an object.
        </div>
      </section>
    </div>
  );
}

export default App;
