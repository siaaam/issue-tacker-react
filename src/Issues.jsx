import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { IssueContext } from './context/IssueContext';
import Issue from './Issue';
import IssueBar from './IssueBar';

const Issues = ({ totalCount, newCount, progressCount, completedCount }) => {
  const { issues } = useContext(IssueContext);

  return (
    <>
      <h1 className="mt-4 mb-4">All Issues</h1>

      <IssueBar
        totalCount={totalCount}
        newCount={newCount}
        progressCount={progressCount}
        completedCount={completedCount}
      />

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assign To</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <Issue key={issue.id} issue={issue} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Issues;
