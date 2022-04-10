import { useContext, useState } from 'react';
import { Badge, ProgressBar, Modal, Button } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaCheckSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { IssueContext } from './context/IssueContext';

const Issue = ({ issue }) => {
  const { id, title, priority, status, endDate, assignTo, completeInPercent } =
    issue;

  const { deleteIssue, completeIssue } = useContext(IssueContext);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    if (e.target.dataset.action === 'delete') {
      deleteIssue(id);
    }

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const lowClass = priority === 'low' ? 'primary' : '';
  const highClass = priority === 'high' ? 'danger' : '';
  const mediumClass = priority === 'medium' ? 'info' : '';

  const lowPercentageClass = completeInPercent < 30 ? 'danger' : '';
  const mediumPercentageClass =
    completeInPercent > 30 && completeInPercent <= 70 ? 'info' : '';
  const highPercentageClass = completeInPercent > 70 ? 'success' : '';
  const completedStatus =
    status === 'completed' ? (
      <span style={{ textDecoration: 'line-through', color: 'red' }}>
        completed
      </span>
    ) : (
      status
    );

  const modal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>Are You sure You Want to Delete The Issue?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" data-action="delete" onClick={handleClose}>
          Delete
        </Button>
        <Button variant="info" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {modal}
      <tr key={issue.id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Badge bg={`${lowClass}${mediumClass}${highClass}`} pill>
            {priority}
          </Badge>
        </td>
        <td>{completedStatus}</td>
        <td>{format(new Date(endDate), 'dd/MM/yyyy')}</td>
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
            <FaEdit
              onClick={() => navigate(`/edit/${id}`)}
              className="text-info"
            />
            <FaCheckSquare
              className="text-success"
              onClick={() => completeIssue(id)}
            />
            <FaTrashAlt className="text-primary" onClick={handleShow} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Issue;
