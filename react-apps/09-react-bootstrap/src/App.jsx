import { useState } from 'react';
import { 
  Container, Row, Col, 
  Button, ButtonGroup,
  Card,
  Form,
  Table,
  Badge,
  Alert,
  Modal,
  Navbar, Nav,
  ListGroup,
  ProgressBar,
  Spinner,
  Toast, ToastContainer
} from 'react-bootstrap';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <>
      {/* Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#buttons">Buttons</Nav.Link>
              <Nav.Link href="#forms">Forms</Nav.Link>
              <Nav.Link href="#components">Components</Nav.Link>
            </Nav>
            <Button variant="outline-light" size="sm">Sign In</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* Hero Section */}
        <div className="hero text-center p-5 mb-4">
          <Badge bg="secondary" className="mb-3" style={{ position: 'relative' }}>Chapter 9 - React</Badge>
          <h1 className="display-4 fw-bold mb-3" style={{ 
            background: 'linear-gradient(135deg, #f1f5f9, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative'
          }}>
            React-Bootstrap Demo
          </h1>
          <p className="lead" style={{ color: '#94a3b8', position: 'relative' }}>
            Bootstrap 5 components built for React
          </p>
        </div>

        {/* Buttons Section */}
        <Card className="mb-4" id="buttons">
          <Card.Header>
            <h2 className="h5 mb-0">🎨 Buttons</h2>
          </Card.Header>
          <Card.Body>
            <h6 className="text-muted mb-3">Button Variants</h6>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
              <Button variant="light">Light</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="cyan">Custom Cyan</Button>
            </div>

            <h6 className="text-muted mb-3">Outline Variants</h6>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <Button variant="outline-primary">Primary</Button>
              <Button variant="outline-secondary">Secondary</Button>
              <Button variant="outline-success">Success</Button>
              <Button variant="outline-danger">Danger</Button>
              <Button variant="outline-cyan">Custom Cyan</Button>
            </div>

            <h6 className="text-muted mb-3">Button Sizes</h6>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary">Default</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>

            <h6 className="text-muted mb-3">Button Group</h6>
            <ButtonGroup>
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
          </Card.Body>
        </Card>

        {/* Forms Section */}
        <Card className="mb-4" id="forms">
          <Card.Header>
            <h2 className="h5 mb-0">📝 Forms</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Select Option</Form.Label>
                    <Form.Select>
                      <option>Select an option</option>
                      <option value="1">Option One</option>
                      <option value="2">Option Two</option>
                      <option value="3">Option Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox" 
                      label="Remember me" 
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
              
              <Col md={6}>
                <div className="code-block">
                  <div className="code-header">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                    <span>Form.jsx</span>
                  </div>
                  <pre className="code-content">{`import { Form, Button } from 'react-bootstrap';

<Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Email</Form.Label>
    <Form.Control 
      type="email" 
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>`}</pre>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Components Section */}
        <Card className="mb-4" id="components">
          <Card.Header>
            <h2 className="h5 mb-0">🧩 Components</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              {/* Alerts */}
              <Col md={6} className="mb-4">
                <h6 className="text-muted mb-3">Alerts</h6>
                <Alert variant="success">
                  <Alert.Heading>Success!</Alert.Heading>
                  <p className="mb-0">Your action was completed successfully.</p>
                </Alert>
                <Alert variant="danger">
                  <strong>Error!</strong> Something went wrong.
                </Alert>
                <Alert variant="warning" dismissible>
                  <strong>Warning!</strong> Please check your input.
                </Alert>
              </Col>

              {/* Badges */}
              <Col md={6} className="mb-4">
                <h6 className="text-muted mb-3">Badges</h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Badge bg="primary">Primary</Badge>
                  <Badge bg="secondary">Secondary</Badge>
                  <Badge bg="success">Success</Badge>
                  <Badge bg="danger">Danger</Badge>
                  <Badge bg="warning" text="dark">Warning</Badge>
                  <Badge bg="info">Info</Badge>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <Badge pill bg="primary">Pill Badge</Badge>
                  <Button variant="primary">
                    Notifications <Badge bg="light" text="dark">4</Badge>
                  </Button>
                </div>
              </Col>

              {/* Progress Bars */}
              <Col md={6} className="mb-4">
                <h6 className="text-muted mb-3">Progress Bars</h6>
                <ProgressBar now={25} label="25%" className="mb-2" />
                <ProgressBar variant="success" now={50} className="mb-2" />
                <ProgressBar striped variant="info" now={75} className="mb-2" />
                <ProgressBar animated variant="warning" now={100} />
              </Col>

              {/* Spinners */}
              <Col md={6} className="mb-4">
                <h6 className="text-muted mb-3">Spinners</h6>
                <div className="d-flex gap-3 align-items-center">
                  <Spinner animation="border" variant="primary" />
                  <Spinner animation="border" variant="secondary" />
                  <Spinner animation="grow" variant="success" />
                  <Spinner animation="grow" variant="danger" />
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      className="me-2"
                    />
                    Loading...
                  </Button>
                </div>
              </Col>

              {/* List Group */}
              <Col md={6} className="mb-4">
                <h6 className="text-muted mb-3">List Group</h6>
                <ListGroup>
                  <ListGroup.Item action active>Active Item</ListGroup.Item>
                  <ListGroup.Item action>Regular Item</ListGroup.Item>
                  <ListGroup.Item action>
                    <div className="d-flex justify-content-between align-items-center">
                      Item with Badge
                      <Badge bg="primary" pill>14</Badge>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item action disabled>Disabled Item</ListGroup.Item>
                </ListGroup>
              </Col>

              {/* Table */}
              <Col md={6} className="mb-4">
                <h6 className="text-muted mb-3">Table</h6>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td><Badge bg="success">Active</Badge></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jane Smith</td>
                      <td><Badge bg="warning" text="dark">Pending</Badge></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Bob Wilson</td>
                      <td><Badge bg="danger">Inactive</Badge></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Modal Button */}
            <div className="text-center mt-4">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Open Modal Dialog
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Code Example */}
        <Card className="mb-4">
          <Card.Header>
            <h2 className="h5 mb-0">📦 Installation & Setup</h2>
          </Card.Header>
          <Card.Body>
            <div className="code-block">
              <div className="code-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span>terminal</span>
              </div>
              <pre className="code-content">{`# Install react-bootstrap and bootstrap
npm install react-bootstrap bootstrap

# In your main.jsx or App.jsx:
import 'bootstrap/dist/css/bootstrap.min.css';

# Import individual components (tree-shakable!)
import { Button, Card, Modal } from 'react-bootstrap';`}</pre>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>React-Bootstrap Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is a fully functional modal built with React-Bootstrap components!</p>
          <p className="text-muted mb-0">
            Modals are built with HTML, CSS, and JavaScript. They're positioned over 
            everything else in the document and remove scroll from the body.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Form submitted successfully! ✅</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;
