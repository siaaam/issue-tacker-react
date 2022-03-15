import { Table, Badge } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaCheckSquare } from 'react-icons/fa';

const Issues = ({ issues }) => {
  return (
    <>
      <h1 className="mt-4 mb-4">All Issues</h1>
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
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.title}</td>
              <td>{issue.priority}</td>
              <td>
                <Badge bg="primary" pill>
                  {issue.status}
                </Badge>
              </td>
              <td>{issue.endDate}</td>
              <td>{issue.assignTo}</td>
              <td>{issue.completeInPercent}%</td>
              <td>
                <div className="d-flex justify-content-between">
                  <FaEdit className="text-info" />
                  <FaCheckSquare className="text-success" />
                  <FaTrashAlt className="text-primary" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Issues;
