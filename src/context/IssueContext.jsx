import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  ADD_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  GET_ISSUES,
  UPDATE_ISSUE,
} from '../actions';
import issueReducer from '../issueReducer';
import useToken from '../hooks/useToken';
import axios from 'axios';
import formatIssues from '../utils/formatIssues';
import { toast } from 'react-toastify';
import formatIssue from '../utils/formatIssue';
// import { AuthContext } from './AuthContext';

export const IssueContext = createContext();

const initialState = [];

export const IssueProvider = ({ children }) => {
  const [issues, dispatch] = useReducer(issueReducer, initialState);

  const { token, tokenLoaded } = useToken();

  // const { user } = useContext(AuthContext);
  // console.log(user);

  const loadIssues = async () => {
    try {
      const res = await axios.get('http://localhost:1337/api/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const issues = formatIssues(res.data.data);
      dispatch({ type: GET_ISSUES, payload: issues });
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

  const addIssue = async (issue) => {
    const formattedIssue = {
      ...issue,
      assigned_to: issue.assignedTo,
      sub_title: issue.subTitle,
      start_date: issue.startDate,
      end_date: issue.endDate,
      completed_percentage: issue.completedPercentage,
    };
    // at first send data to the server
    try {
      const res = await axios.post(
        'http://localhost:1337/api/issues',
        { data: formattedIssue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedIssue = formatIssue(res.data.data);

      console.log(addedIssue);
      // const issues = formatIssues(res.data.data);
      dispatch({ type: ADD_ISSUE, payload: addedIssue });
      toast.success('Issue added successfully');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
    // then get the data back

    // navigate('/issues');
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
