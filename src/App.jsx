import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import AddIssue from './AddIssue';
import IssueBar from './IssueBar';
import Issues from './Issues';

function App() {
  return (
    <>
      <Row>
        <Navigation />
        <Col sm={{ span: 10, offset: 2 }}>
          <Container>
            <AddIssue />
            <IssueBar />
            <Issues />
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default App;
