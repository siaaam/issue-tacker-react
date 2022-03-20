import IssueForm from './IssueForm';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultIssue = {
  title: '',
  subTitle: '',
  assignTo: '',
  startDate: '',
  endDate: '',
  priority: 'high',
  status: 'new',
  completeInPercent: '20',
};

const EditIssue = ({ issues, updateIssue }) => {
  const [issue, setIssue] = useState(defaultIssue);
  const navigate = useNavigate();
  const { id } = useParams();

  const issueToEdit = () => {
    const foundIssue = issues.find((issue) => issue.id === id);
    if (!foundIssue) {
      toast.error('Issue is not found to be updated');
      return navigate('/issues');
    }
    setIssue(foundIssue);
  };

  useEffect(() => {
    issueToEdit();
  }, [id]);

  const handleUpdateIssue = (issue) => {
    updateIssue(issue);
  };

  return <IssueForm updateIssue={handleUpdateIssue} issue={issue} />;
};

export default EditIssue;
