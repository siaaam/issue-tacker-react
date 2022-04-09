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
import { AuthContext } from './AuthContext';
import axiosAPI from '../utils/axiosAPI';

export const IssueContext = createContext();

const initialState = [];

export const IssueProvider = ({ children }) => {
  const [issues, dispatch] = useReducer(issueReducer, initialState);

  const { token, tokenLoaded } = useToken();

  const { user } = useContext(AuthContext);

  const loadIssues = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/issues',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      // const res = await axios.get('http://localhost:1337/api/issues', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const issues = formatIssues(data.data);
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
      assign_to: 1,
      author: user.id,
      sub_title: issue.subTitle,
      start_date: issue.startDate,
      end_date: issue.endDate,
      completed_percentage: issue.completeInPercent,
    };

    // at first send data to the server
    try {
      const data = await axiosAPI({
        method: 'post',
        url: '/issues?populate=*',
        data: {
          data: formattedIssue,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const addedIssue = formatIssue(data.data);

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
