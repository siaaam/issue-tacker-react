import { createContext, useEffect, useReducer } from 'react';
import {
  ADD_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from '../actions';
import issueReducer from '../issueReducer';
import useToken from '../hooks/useToken';
import axios from 'axios';
import formatIssues from '../utils/formatIssues';

export const IssueContext = createContext();

const initialState = [
  {
    id: 'da46d4ea-c718-4c8a-b661-f8761848e2f2',
    title: 'sample issue',
    subTitle: 'task details',
    assignTo: 'no  one',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'high',
    status: 'new',
    completeInPercent: '70',
  },
];

export const IssueProvider = ({ children }) => {
  const [issues, dispatch] = useReducer(issueReducer, initialState);

  const { token, tokenLoaded } = useToken();

  const loadIssues = async () => {
    try {
      const res = await axios.get('http://localhost:1337/api/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const issues = formatIssues(res.data.data);
      console.log(issues);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (tokenLoaded && token) {
      // load issues from server
      loadIssues();
    }
  }, [tokenLoaded, token]);

  const addIssue = (issue) => {
    dispatch({ type: ADD_ISSUE, payload: issue });
  };

  const deleteIssue = (id) => {
    dispatch({ type: DELETE_ISSUE, payload: id });
  };

  const updateIssue = (issueToUpdate) => {
    dispatch({ type: UPDATE_ISSUE, payload: issueToUpdate });
  };

  const completeIssue = (id) => {
    dispatch({ type: COMPLETE_ISSUE, payload: id });
    // find the issue based on id  and modify as  necessary
  };

  const value = {
    issues,
    deleteIssue,
    updateIssue,
    addIssue,
    completeIssue,
  };
  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
};
