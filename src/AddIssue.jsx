import { useContext } from 'react';
import { IssueContext } from './context/IssueContext';
import IssueForm from './IssueForm';

const AddIssue = () => {
  const { addIssue } = useContext(IssueContext);
  const handleIssue = (issue) => {
    addIssue(issue);
  };

  return <IssueForm addIssue={handleIssue} />;
};

export default AddIssue;
