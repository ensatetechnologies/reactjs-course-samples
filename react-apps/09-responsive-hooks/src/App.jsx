import { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  useBreakpoint,
  useWindowSize,
  usePrefersReducedMotion,
  usePrefersDarkMode 
} from './useMediaQuery';
import './App.css';

function App() {
  // Use hooks
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const breakpoint = useBreakpoint();
  const { width, height } = useWindowSize();
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersDarkMode = usePrefersDarkMode();
  
  // Custom media queries
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const hasHover = useMediaQuery('(hover: hover)');

  return (
    <div className="container">
      {/* Hero Section */}
      <header className="hero">
        <div className="badge">Chapter 9 - React</div>
        <h1 className="title">Responsive Design Hooks</h1>
        <p className="subtitle">React hooks for responsive design patterns</p>
      </header>

      {/* Current Viewport Info */}
      <section className="section viewport-section">
        <h2 className="section-title">📱 Current Viewport</h2>
        
        <div className="viewport-info">
          <div className="viewport-main">
            <span className="viewport-icon">
              {isMobile ? '📱' : isTablet ? '📱' : '💻'}
            </span>
            <span className="viewport-name">{breakpoint}</span>
            <span className="viewport-dimensions">{width} × {height}</span>
          </div>
        </div>

        <div className="breakpoint-bar">
          <div className={`breakpoint mobile ${breakpoint === 'mobile' ? 'active' : ''}`}>
            Mobile<br/>&lt; 768px
          </div>
          <div className={`breakpoint tablet ${breakpoint === 'tablet' ? 'active' : ''}`}>
            Tablet<br/>768-1023px
          </div>
          <div className={`breakpoint desktop ${breakpoint === 'desktop' ? 'active' : ''}`}>
            Desktop<br/>1024-1439px
          </div>
          <div className={`breakpoint large ${breakpoint === 'large' ? 'active' : ''}`}>
            Large<br/>1440px+
          </div>
        </div>
      </section>

      {/* Responsive Component Demo */}
      <section className="section">
        <h2 className="section-title">🎨 Responsive Layout</h2>
        <p className="section-desc">
          This grid changes based on screen size - using JavaScript hooks!
        </p>

        <div className="responsive-grid">
          <div className="grid-card">
            <div className="card-icon">🚀</div>
            <h3>Card 1</h3>
            <p>{isMobile ? 'Mobile view' : 'Desktop view'}</p>
          </div>
          <div className="grid-card">
            <div className="card-icon">⚡</div>
            <h3>Card 2</h3>
            <p>{isMobile ? 'Stacked' : 'Side by side'}</p>
          </div>
          {!isMobile && (
            <>
              <div className="grid-card">
                <div className="card-icon">🎯</div>
                <h3>Card 3</h3>
                <p>Hidden on mobile</p>
              </div>
              <div className="grid-card">
                <div className="card-icon">💡</div>
                <h3>Card 4</h3>
                <p>Hidden on mobile</p>
              </div>
            </>
          )}
        </div>

        <div className="code-block">
          <div className="code-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span>ResponsiveGrid.jsx</span>
          </div>
          <pre className="code-content">{`import { useIsMobile } from './useMediaQuery';

function ResponsiveGrid() {
  const isMobile = useIsMobile();

  return (
    <div className="grid">
      <Card title="Card 1" />
      <Card title="Card 2" />
      {/* Conditionally render on larger screens */}
      {!isMobile && (
        <>
          <Card title="Card 3" />
          <Card title="Card 4" />
        </>
      )}
    </div>
  );
}`}</pre>
        </div>
      </section>

      {/* Hook Status Section */}
      <section className="section">
        <h2 className="section-title">🪝 Hook Status</h2>
        <p className="section-desc">Real-time status of all responsive hooks</p>

        <div className="status-grid">
          <StatusCard 
            label="useIsMobile()" 
            value={isMobile} 
            description="< 768px"
          />
          <StatusCard 
            label="useIsTablet()" 
            value={isTablet} 
            description="768-1023px"
          />
          <StatusCard 
            label="useIsDesktop()" 
            value={isDesktop} 
            description="≥ 1024px"
          />
          <StatusCard 
            label="useBreakpoint()" 
            value={breakpoint} 
            isText
            description="Current breakpoint"
          />
          <StatusCard 
            label="isLandscape" 
            value={isLandscape} 
            description="Orientation"
          />
          <StatusCard 
            label="hasHover" 
            value={hasHover} 
            description="Hover capable"
          />
          <StatusCard 
            label="prefersReducedMotion" 
            value={prefersReducedMotion} 
            description="User preference"
          />
          <StatusCard 
            label="prefersDarkMode" 
            value={prefersDarkMode} 
            description="System theme"
          />
        </div>
      </section>

      {/* useMediaQuery Hook Code */}
      <section className="section">
        <h2 className="section-title">📦 useMediaQuery Hook</h2>
        <p className="section-desc">The custom hook implementation</p>

        <div className="code-block">
          <div className="code-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span>useMediaQuery.js</span>
          </div>
          <pre className="code-content">{`import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const handler = (event) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

// Convenience hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}`}</pre>
        </div>

        <div className="info-box">
          <strong>💡 Pro Tip:</strong> These hooks are great for:
          <ul>
            <li>Conditionally rendering components</li>
            <li>Loading different images based on screen size</li>
            <li>Changing navigation from hamburger to horizontal</li>
            <li>Adjusting chart/graph configurations</li>
          </ul>
        </div>
      </section>

      {/* Conditional Navigation Demo */}
      <section className="section">
        <h2 className="section-title">🧭 Responsive Navigation</h2>
        <p className="section-desc">Different nav for mobile vs desktop</p>

        <div className="nav-demo">
          {isMobile ? (
            <MobileNav />
          ) : (
            <DesktopNav />
          )}
        </div>

        <div className="code-block">
          <div className="code-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span>Navigation.jsx</span>
          </div>
          <pre className="code-content">{`function Navigation() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileNav /> : <DesktopNav />;
}

// Or using breakpoint hook
function Navigation() {
  const breakpoint = useBreakpoint();
  
  switch (breakpoint) {
    case 'mobile':
      return <MobileNav />;
    case 'tablet':
      return <TabletNav />;
    default:
      return <DesktopNav />;
  }
}`}</pre>
        </div>
      </section>
    </div>
  );
}

// Status Card Component
function StatusCard({ label, value, isText, description }) {
  return (
    <div className="status-card">
      <code className="status-label">{label}</code>
      <div className={`status-value ${isText ? 'text' : value ? 'true' : 'false'}`}>
        {isText ? value : value ? 'true' : 'false'}
      </div>
      <span className="status-desc">{description}</span>
    </div>
  );
}

// Mobile Navigation
function MobileNav() {
  return (
    <nav className="mobile-nav">
      <div className="nav-brand">📱 Mobile</div>
      <button className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

// Desktop Navigation
function DesktopNav() {
  return (
    <nav className="desktop-nav">
      <div className="nav-brand">💻 Desktop</div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
      <button className="nav-cta">Sign In</button>
    </nav>
  );
}

export default App;
