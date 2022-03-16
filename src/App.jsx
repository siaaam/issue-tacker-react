import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import AddIssue from './AddIssue';
import Issues from './Issues';
import Home from './Home';
import NotFound from './NotFound';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

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

  const completeIssue = (id) => {
    // find the issue based on id  and modify as  necessary

    const issuesAfterCompletion = issues.map((issue) => {
      if (issue.id === id) {
        return {
          ...issue,
          status: 'completed',
          completeInPercent: '100',
        };
      } else {
        return issue;
      }
    });

    setIssues(issuesAfterCompletion);
  };

  const deleteIssue = (id) => {
    // filter issue by id
    const issuesAfterDlt = issues.filter((issue) => issue.id !== id);
    setIssues(issuesAfterDlt);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />

      <Row>
        <BrowserRouter>
          <Navigation />
          <Col sm={{ span: 9, offset: 1 }}>
            <Container>
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/add" element={<AddIssue addIssue={addIssue} />} />
                <Route
                  path="/issues"
                  element={
                    <Issues
                      issues={issues}
                      totalCount={totalCount}
                      newCount={newCount}
                      progressCount={progressCount}
                      completedCount={completedCount}
                      completeIssue={completeIssue}
                      deleteIssue={deleteIssue}
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  );
}

export default App;
