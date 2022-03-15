import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import Navigation from './Navigation';
import AddIssue from './AddIssue';
import IssueBar from './IssueBar';
import Issues from './Issues';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [issues, setIssues] = useState([
    {
      id: 'da46d4ea-c718-4c8a-b661-f8761848e2f2',
      title: 'sample issue',
      subTitle: 'task details',
      assignTo: 'no  one',
      startDate: '',
      endDate: '',
      priority: 'high',
      status: 'new',
      completeInPercent: '70',
    },
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const addIssue = (issue) => {
    setIssues([...issues, issue]);

    setTotalCount((prevCount) => prevCount + 1);

    if (issue.status === 'new') {
      setNewCount((prevCount) => prevCount + 1);
    }

    if (issue.status === 'inProgress') {
      setProgressCount((prevCount) => prevCount + 1);
    }
    if (issue.status === 'completed') {
      setCompletedCount((prevCount) => prevCount + 1);
    }
  };
  return (
    <>
      <Row>
        <Navigation />
        <Col sm={{ span: 9, offset: 1 }}>
          <Container>
            <AddIssue addIssue={addIssue} />
            <IssueBar
              totalCount={totalCount}
              newCount={newCount}
              progressCount={progressCount}
              completedCount={completedCount}
            />
            <Issues issues={issues} />
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default App;
