import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import AddIssue from './AddIssue';
import IssueBar from './IssueBar';
import Issues from './Issues';

function App() {
  return (
    <>
      <Navbar />
      <AddIssue />
      <IssueBar />
      <Issues />
    </>
  );
}

export default App;
