import IssueForm from './IssueForm';

import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IssueContext } from './context/IssueContext';
import axiosAPI from './utils/axiosAPI';
import useToken from './hooks/useToken';
import formatIssue from './utils/formatIssue';
import { parseISO } from 'date-fns/esm';

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

const EditIssue = () => {
  const [issue, setIssue] = useState(defaultIssue);
  const { issues, updateIssue } = useContext(IssueContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, tokenLoaded } = useToken();

  const issueToEdit = async () => {
    const data = await axiosAPI({
      method: 'get',
      url: `/issues/${+id}?populate=assign_to`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const issue = formatIssue(data.data);

    // const foundIssue = issues.find((issue) => issue.id === id);
    // if (!foundIssue) {
    //   toast.error('Issue is not found to be updated');
    //   return navigate('/issues');
    // }
    setIssue({
      ...issue,
      startDate: parseISO(issue.startDate),
      endDate: parseISO(issue.endDate),
      assignTo: issue.assign_to.data.id,
    });
  };

  useEffect(() => {
    if (token && tokenLoaded) {
      issueToEdit();
    }
  }, [id, tokenLoaded, token]);

  const handleUpdateIssue = (issue) => {
    updateIssue(issue);
  };

  return <IssueForm updateIssue={handleUpdateIssue} issue={issue} />;
};

export default EditIssue;
