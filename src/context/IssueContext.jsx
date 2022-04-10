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
      assign_to: issue.assignTo,
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
        url: '/issues',
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

  const deleteIssue = async (id) => {
    try {
      await axiosAPI({
        method: 'delete',
        url: `/issues/${id}`,

        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      dispatch({ type: DELETE_ISSUE, payload: id });
      // toast.success('Issue deleted successfully');
    } catch (err) {
      toast.error(err.response.data?.error?.message);
    }
  };

  const updateIssue = async (issueToUpdate) => {
    const formattedIssue = {
      ...issueToUpdate,
      assign_to: issueToUpdate.assignTo,
      author: user.id,
      sub_title: issueToUpdate.subTitle,
      start_date: issueToUpdate.startDate,
      end_date: issueToUpdate.endDate,
      completed_percentage: issueToUpdate.completeInPercent,
    };

    // at first send data to the server
    try {
      const { data } = await axiosAPI({
        method: 'put',
        url: `/issues/${issueToUpdate.id}`,
        data: {
          data: formattedIssue,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const updatedIssue = formatIssue(data);

      dispatch({ type: UPDATE_ISSUE, payload: updatedIssue });
      toast.success('Issue updated successfully');

      // const issues = formatIssues(res.data.data);
      // dispatch({ type: ADD_ISSUE, payload: addedIssue });
    } catch (err) {
      toast.error(err.response.data?.error?.message);
    }
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
