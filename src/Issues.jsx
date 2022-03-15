import { Table, Badge, ProgressBar } from 'react-bootstrap';
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
          {issues.map((issue) => {
            const {
              id,
              title,
              priority,
              status,
              endDate,
              assignTo,
              completeInPercent,
            } = issue;

            const lowClass = priority === 'low' ? 'primary' : '';
            const highClass = priority === 'high' ? 'danger' : '';
            const mediumClass = priority === 'medium' ? 'info' : '';

            const lowPercentageClass = completeInPercent < 30 ? 'danger' : '';
            const mediumPercentageClass =
              completeInPercent > 30 && completeInPercent <= 70 ? 'info' : '';
            const highPercentageClass = completeInPercent > 70 ? 'success' : '';

            return (
              <tr key={issue.id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                  <Badge bg={`${lowClass}${mediumClass}${highClass}`} pill>
                    {priority}
                  </Badge>
                </td>
                <td>{status}</td>
                <td>{endDate}</td>
                <td>{assignTo}</td>
                <td>
                  <ProgressBar
                    variant={`${highPercentageClass}${lowPercentageClass}${mediumPercentageClass}`}
                    label={completeInPercent}
                    now={completeInPercent}
                    striped
                    animated
                  />
                </td>
                <td>
                  <div className="d-flex justify-content-between">
                    <FaEdit className="text-info" />
                    <FaCheckSquare className="text-success" />
                    <FaTrashAlt className="text-primary" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Issues;
