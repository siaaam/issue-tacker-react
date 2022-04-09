import {
  ADD_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  GET_ISSUES,
  UPDATE_ISSUE,
} from './actions';

const issueReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ISSUES:
      return [...state, ...payload];
    case ADD_ISSUE:
      return [...state, payload];
    case DELETE_ISSUE:
      const issuesAfterDlt = state.filter((issue) => issue.id !== payload);
      return [...issuesAfterDlt];

    case UPDATE_ISSUE:
      const issuesAfterUpdate = state.map((issue) => {
        if (issue.id === payload.id) {
          return {
            ...payload,
            id: issue.id,
            status:
              payload.completeInPercent < 100 ? 'inProgress' : 'completed',
          };
        } else {
          return issue;
        }
      });
      return [...issuesAfterUpdate];

    case COMPLETE_ISSUE:
      const issuesAfterCompletion = state.map((issue) => {
        if (issue.id === payload) {
          return {
            ...issue,
            status: 'completed',
            completeInPercent: '100',
          };
        } else {
          return issue;
        }
      });

      return [...issuesAfterCompletion];

    default:
      return state;
  }
};

export default issueReducer;
