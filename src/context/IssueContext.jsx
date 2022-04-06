import { createContext, useReducer } from 'react';
import {
  ADD_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from '../actions';
import issueReducer from '../issueReducer';
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

  const addIssue = (issue) => {
    dispatch({ type: ADD_ISSUE, payload: issue });

    // setIssues((prevIssues) => [...prevIssues, issue]);

    // setTotalCount((prevCount) => prevCount + 1);

    // if (issue.status === 'new') {
    //   setNewCount((prevCount) => prevCount + 1);
    // }

    // if (issue.status === 'inProgress') {
    //   setProgressCount((prevCount) => prevCount + 1);
    // }
    // if (issue.status === 'completed') {
    //   setCompletedCount((prevCount) => prevCount + 1);
    // }
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
