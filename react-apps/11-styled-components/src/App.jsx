import { useState } from 'react';
import styled from 'styled-components';

// Styled Components - CSS-in-JS!
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Hero = styled.header`
  text-align: center;
  padding: 48px 32px;
  background: linear-gradient(135deg, ${props => props.theme.colors.surface}, ${props => props.theme.colors.surface2});
  border-radius: 20px;
  margin-bottom: ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 50%, rgba(219,112,147,0.1) 0%, transparent 50%);
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: #db7093;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  position: relative;
`;

const HeroTitle = styled.h1`
  font-size: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.text}, #db7093);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  position: relative;
`;

const HeroSubtitle = styled.p`
  color: ${props => props.theme.colors.muted};
  font-size: 18px;
  position: relative;
`;

const Section = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SectionDesc = styled.p`
  color: ${props => props.theme.colors.muted};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

// Dynamic Card with props!
const Card = styled.div`
  background: ${props => props.$isSelected 
    ? 'rgba(34,211,238,0.1)' 
    : props.theme.colors.surface2};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.radius.md};
  border: 2px solid ${props => props.$isSelected 
    ? props.theme.colors.primary 
    : props.theme.colors.border};
  transition: all 0.2s ease;
  transform: ${props => props.$isSelected ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StudentName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

// Dynamic grade badge color!
const gradeColors = {
  A: '#22c55e',
  B: '#3b82f6',
  C: '#f59e0b',
  D: '#f97316',
  F: '#ef4444',
};

const GradeBadge = styled.span`
  background: ${props => gradeColors[props.$grade] || '#666'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const Details = styled.p`
  color: ${props => props.theme.colors.muted};
  font-size: 14px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

// Button with variants using props
const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.sm};
  border: ${props => props.$variant === 'ghost' 
    ? `1px solid ${props.theme.colors.border}` 
    : 'none'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${props => {
    if (props.$variant === 'danger') return props.theme.colors.danger;
    if (props.$variant === 'ghost') return 'transparent';
    return props.theme.colors.primary;
  }};
  
  color: ${props => {
    if (props.$variant === 'ghost') return props.theme.colors.text;
    if (props.$variant === 'danger') return 'white';
    return props.theme.colors.bg;
  }};

  &:hover {
    transform: translateY(-2px);
    ${props => props.$variant === 'ghost' && `
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    `}
  }
`;

const Controls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface2};
  border-radius: ${props => props.theme.radius.md};
`;

const CountBadge = styled.div`
  margin-left: auto;
  padding: 8px 16px;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const CodeBlock = styled.div`
  background: #0d1321;
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.md};
`;

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${props => props.theme.colors.surface2};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: 13px;
  color: ${props => props.theme.colors.muted};
  font-family: 'JetBrains Mono', monospace;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const CodeContent = styled.pre`
  padding: 16px;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  color: ${props => props.theme.colors.text};
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, rgba(219,112,147,0.1), transparent);
  border: 1px solid rgba(219,112,147,0.3);
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProsConsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ProsCard = styled.div`
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.lg};

  h4 {
    color: ${props => props.theme.colors.accent};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul {
    color: ${props => props.theme.colors.muted};
    padding-left: 20px;
    font-size: 14px;
  }

  li {
    margin: 6px 0;
  }
`;

const ConsCard = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.lg};

  h4 {
    color: ${props => props.theme.colors.danger};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul {
    color: ${props => props.theme.colors.muted};
    padding-left: 20px;
    font-size: 14px;
  }

  li {
    margin: 6px 0;
  }
`;

// Initial students data
const initialStudents = [
  { id: 1, name: 'Alice Johnson', age: 15, grade: 'A' },
  { id: 2, name: 'Bob Smith', age: 16, grade: 'B' },
  { id: 3, name: 'Carol White', age: 15, grade: 'A' },
  { id: 4, name: 'David Brown', age: 17, grade: 'C' },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [nextId, setNextId] = useState(5);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const addStudent = () => {
    const names = ['Emma', 'James', 'Olivia', 'William', 'Sophia'];
    const grades = ['A', 'B', 'C', 'A', 'B'];
    const newStudent = {
      id: nextId,
      name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
      age: 14 + Math.floor(Math.random() * 5),
      grade: grades[Math.floor(Math.random() * grades.length)],
    };
    setStudents((prev) => [...prev, newStudent]);
    setNextId((prev) => prev + 1);
  };

  return (
    <Container>
      {/* Hero */}
      <Hero>
        <Badge>Chapter 11</Badge>
        <HeroTitle>Styled Components</HeroTitle>
        <HeroSubtitle>CSS-in-JS - Write CSS in JavaScript</HeroSubtitle>
      </Hero>

      {/* Info Section */}
      <Section>
        <SectionTitle>💅 How Styled Components Work</SectionTitle>
        <SectionDesc>
          Write actual CSS inside JavaScript using tagged template literals
        </SectionDesc>

        <HighlightBox>
          <h4 style={{ color: '#db7093', marginBottom: '8px' }}>🎯 The Magic of Styled Components</h4>
          <p style={{ color: '#94a3b8' }}>
            You create React components with styles attached. Props can be used for dynamic styling!
            Styles are scoped automatically and injected as unique class names.
          </p>
        </HighlightBox>

        <CodeBlock>
          <CodeHeader>
            <Dot $color="#ef4444" />
            <Dot $color="#fbbf24" />
            <Dot $color="#22c55e" />
            <span>Styled Components Example</span>
          </CodeHeader>
          <CodeContent>
{`import styled from 'styled-components';

// Dynamic Card based on props!
const Card = styled.div\`
  background: \${props => props.$isSelected 
    ? 'rgba(34,211,238,0.1)' 
    : '#1a2234'};
  border: 2px solid \${props => props.$isSelected 
    ? '#22d3ee' 
    : '#2d3a52'};
  transform: \${props => props.$isSelected 
    ? 'scale(1.02)' 
    : 'scale(1)'};
  transition: all 0.2s ease;

  &:hover {
    border-color: #22d3ee;
  }
\`;

// Usage - props drive styling!
<Card $isSelected={isSelected}>
  <h3>{student.name}</h3>
</Card>`}
          </CodeContent>
        </CodeBlock>
      </Section>

      {/* Student Cards Demo */}
      <Section>
        <SectionTitle>🎓 Live Demo - Student Cards</SectionTitle>
        <SectionDesc>
          Cards styled entirely with Styled Components - notice the dynamic selection!
        </SectionDesc>

        <StudentGrid>
          {students.map((student) => (
            <Card key={student.id} $isSelected={selectedIds.has(student.id)}>
              <CardHeader>
                <StudentName>{student.name}</StudentName>
                <GradeBadge $grade={student.grade}>{student.grade}</GradeBadge>
              </CardHeader>
              <Details>Age: {student.age}</Details>
              <Actions>
                <Button
                  $variant={selectedIds.has(student.id) ? 'ghost' : 'primary'}
                  onClick={() => toggleSelect(student.id)}
                >
                  {selectedIds.has(student.id) ? 'Deselect' : 'Select'}
                </Button>
                <Button
                  $variant="danger"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </Button>
              </Actions>
            </Card>
          ))}
        </StudentGrid>

        <Controls>
          <Button onClick={addStudent}>➕ Add Student</Button>
          <Button $variant="ghost" onClick={() => setSelectedIds(new Set())}>
            Clear Selection
          </Button>
          <CountBadge>Selected: {selectedIds.size}</CountBadge>
        </Controls>
      </Section>

      {/* Pros & Cons */}
      <Section>
        <SectionTitle>✅ Pros & Cons</SectionTitle>
        <SectionDesc>
          Best for dynamic theming and complex styling logic
        </SectionDesc>

        <ProsConsGrid>
          <ProsCard>
            <h4>✅ Advantages</h4>
            <ul>
              <li>True dynamic styles with props</li>
              <li>Automatic scoping</li>
              <li>Theming support built-in</li>
              <li>No separate CSS files</li>
              <li>Full CSS features (pseudo-classes, etc.)</li>
            </ul>
          </ProsCard>
          <ConsCard>
            <h4>❌ Disadvantages</h4>
            <ul>
              <li>Runtime cost (generates CSS)</li>
              <li>Larger bundle size</li>
              <li>Learning curve</li>
              <li>Less IDE CSS support</li>
              <li>Mixing concerns (CSS in JS)</li>
            </ul>
          </ConsCard>
        </ProsConsGrid>
      </Section>
    </Container>
  );
}

export default App;
