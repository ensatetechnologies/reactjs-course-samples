/**
 * 📚 Typed Props Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates:
 * - Typing component props with interfaces
 * - Required vs optional props
 * - Children prop with ReactNode
 * - Callback function props
 * - Union types for variants
 */

import { useState } from 'react'
import './App.css'
import { Button, Card, ProductCard, Alert, Badge, StatsCard, Container, UserListItem } from './components'
import { Product, User } from './types'

function App(): JSX.Element {
  const [cart, setCart] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAlert, setShowAlert] = useState<boolean>(true)

  // Sample data
  const products: Product[] = [
    { id: 1, name: "MacBook Pro", price: 2499, category: "Laptops", inStock: true, rating: 4.8 },
    { id: 2, name: "AirPods Pro", price: 249, category: "Audio", inStock: true, rating: 4.6 },
    { id: 3, name: "iPad Air", price: 599, category: "Tablets", inStock: false, rating: 4.7 },
  ]

  const users: User[] = [
    { id: 1, name: "Alice Johnson", avatar: "👩‍💻", role: "admin", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", avatar: "👨‍🔧", role: "user", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", avatar: "👤", role: "guest" },
  ]

  // Handlers
  const handleAddToCart = (product: Product): void => {
    setCart([...cart, product])
  }

  const handleFavorite = (id: number): void => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const handleSelectUser = (user: User): void => {
    setSelectedUser(user)
  }

  return (
    <div className="app">
      <header className="header">
        <Badge text="TypeScript" color="blue" />
        <h1>🎯 Typing Component Props</h1>
        <p>Type-safe props with interfaces and union types</p>
      </header>

      {/* Alert Demo */}
      {showAlert && (
        <Alert
          type="info"
          title="Welcome to Typed Props!"
          message="This demo shows how to type component props using TypeScript interfaces."
          onDismiss={() => setShowAlert(false)}
        />
      )}

      {/* Stats Cards */}
      <section className="section">
        <h2 className="section-title">📊 StatsCard Component</h2>
        <div className="code-block">
          <code>
            interface StatsCardProps &#123; label: string; value: number | string; icon: string; trend?: "up" | "down"; &#125;
          </code>
        </div>
        <div className="stats-grid">
          <StatsCard label="Cart Items" value={cart.length} icon="🛒" trend="up" percentage={12} />
          <StatsCard label="Favorites" value={favorites.length} icon="❤️" trend="neutral" />
          <StatsCard label="Products" value={products.length} icon="📦" />
          <StatsCard label="Users" value={users.length} icon="👥" trend="up" percentage={5} />
        </div>
      </section>

      {/* Button Demo */}
      <section className="section">
        <h2 className="section-title">🔘 Button Component</h2>
        <div className="code-block">
          <code>
            interface ButtonProps &#123; label: string; onClick: () =&gt; void; variant?: "primary" | "secondary" | "danger"; &#125;
          </code>
        </div>
        <Container padding="medium">
          <div className="button-demo">
            <Button label="Primary" onClick={() => alert('Primary clicked!')} variant="primary" />
            <Button label="Secondary" onClick={() => alert('Secondary clicked!')} variant="secondary" />
            <Button label="Danger" onClick={() => alert('Danger clicked!')} variant="danger" />
            <Button label="🔔 With Icon" onClick={() => alert('Icon clicked!')} icon="🔔" />
            <Button label="Small" onClick={() => {}} size="small" />
            <Button label="Large" onClick={() => {}} size="large" />
            <Button label="Disabled" onClick={() => {}} disabled />
          </div>
        </Container>
      </section>

      {/* Card with Children Demo */}
      <section className="section">
        <h2 className="section-title">📦 Card Component (with children)</h2>
        <div className="code-block">
          <code>
            interface CardProps &#123; title: string; children: ReactNode; footer?: ReactNode; &#125;
          </code>
        </div>
        <div className="cards-grid">
          <Card title="Default Card">
            <p>This card uses <code>children: ReactNode</code> to accept any renderable content.</p>
          </Card>
          <Card title="Highlighted" variant="highlighted" footer={<Button label="Action" onClick={() => {}} size="small" />}>
            <p>Cards can have optional <code>footer</code> prop.</p>
          </Card>
          <Card title="Warning Card" variant="warning">
            <p>Using <code>variant?: "warning"</code> for different styles.</p>
          </Card>
        </div>
      </section>

      {/* Product Cards Demo */}
      <section className="section">
        <h2 className="section-title">🛍️ ProductCard (Callback Props)</h2>
        <div className="code-block">
          <code>
            interface ProductCardProps &#123; product: Product; onAddToCart: (product: Product) =&gt; void; onFavorite?: (id: number) =&gt; void; &#125;
          </code>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onFavorite={handleFavorite}
              showRating={true}
            />
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary">
            <strong>🛒 Cart:</strong> {cart.map(p => p.name).join(', ')}
          </div>
        )}
      </section>

      {/* User List Demo */}
      <section className="section">
        <h2 className="section-title">👥 UserListItem (Selection Props)</h2>
        <div className="code-block">
          <code>
            interface UserListItemProps &#123; user: User; onSelect: (user: User) =&gt; void; isSelected?: boolean; &#125;
          </code>
        </div>
        <div className="user-list">
          {users.map(user => (
            <UserListItem
              key={user.id}
              user={user}
              onSelect={handleSelectUser}
              isSelected={selectedUser?.id === user.id}
              showEmail={true}
            />
          ))}
        </div>
        {selectedUser && (
          <div className="selected-user">
            <strong>Selected:</strong> {selectedUser.avatar} {selectedUser.name} ({selectedUser.role})
          </div>
        )}
      </section>

      {/* Badge Demo */}
      <section className="section">
        <h2 className="section-title">🏷️ Badge Component</h2>
        <div className="code-block">
          <code>
            interface BadgeProps &#123; text: string; color?: "blue" | "green" | "red" | "yellow" | "purple"; &#125;
          </code>
        </div>
        <div className="badges-demo">
          <Badge text="Blue" color="blue" />
          <Badge text="Green" color="green" />
          <Badge text="Red" color="red" />
          <Badge text="Yellow" color="yellow" />
          <Badge text="Purple" color="purple" />
          <Badge text="Default" />
        </div>
      </section>

      {/* Summary */}
      <footer className="summary">
        <h3>✅ Props Typing Patterns</h3>
        <div className="patterns-grid">
          <div className="pattern">
            <code>label: string</code>
            <span>Required prop</span>
          </div>
          <div className="pattern">
            <code>disabled?: boolean</code>
            <span>Optional prop</span>
          </div>
          <div className="pattern">
            <code>children: ReactNode</code>
            <span>Children content</span>
          </div>
          <div className="pattern">
            <code>onClick: () =&gt; void</code>
            <span>Callback function</span>
          </div>
          <div className="pattern">
            <code>variant?: "a" | "b"</code>
            <span>Union type option</span>
          </div>
          <div className="pattern">
            <code>onSelect: (item: T) =&gt; void</code>
            <span>Callback with param</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
