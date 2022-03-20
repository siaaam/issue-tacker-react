import IssueForm from './IssueForm';

const AddIssue = ({ addIssue }) => {
  const handleIssue = (issue) => {
    addIssue(issue);
  };

  return <IssueForm addIssue={handleIssue} />;
};

export default AddIssue;
