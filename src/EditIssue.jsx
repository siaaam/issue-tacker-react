import IssueForm from './IssueForm';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultIssue = {
  title: '',
  subTitle: '',
  assignTo: '',
  startDate: '',
  endDate: '',
  priority: 'high',
  status: 'new',
  completeInPercent: '20',
};

const EditIssue = ({ issues, updateIssue }) => {
  const [issue, setIssue] = useState(defaultIssue);
  const navigate = useNavigate();
  const { id } = useParams();

  const issueToEdit = () => {
    const foundIssue = issues.find((issue) => issue.id === id);
    if (!foundIssue) {
      toast.error('Issue is not found to be updated');
      return navigate('/issues');
    }
    setIssue(foundIssue);
  };

  useEffect(() => {
    issueToEdit();
  }, [id]);

  const handleUpdateIssue = (issue) => {
    updateIssue(issue);
  };

<<<<<<< HEAD
  return <IssueForm updateIssue={handleUpdateIssue} issue={issue} />;
=======
  const {
    title,
    subTitle,
    assignTo,
    startDate,
    endDate,
    priority,
    status,
    completeInPercent,
  } = issue;

  const {
    title: errorTitle,
    subTitle: errorSubtitle,
    assignTo: assignToErr,
    startDate: errorStartDate,
    endDate: errorEndDate,
  } = errors;

  return (
    <>
      <h1 className="mt-4 mb-4">Edit Issue</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label column>Title</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={title}
              placeholder="Enter Your Issue"
              isInvalid={errorTitle}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorTitle}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label column>Sub Title</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              id="subTitle"
              name="subTitle"
              onChange={handleChange}
              value={subTitle}
              placeholder="Enter Your Issue Details"
              isInvalid={errorSubtitle}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorSubtitle}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label column>Assign To</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="assignTo"
              name="assignTo"
              onChange={handleChange}
              value={assignTo}
              placeholder="Enter Whom Assign To"
              isInvalid={assignToErr}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {assignToErr}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="startDate" column>
              Start Date
            </Form.Label>
          </Col>

          <Col sm={3}>
            <Form.Control
              type="date"
              onChange={handleChange}
              name="startDate"
              value={startDate}
              placeholder="Enter Start Date"
              isInvalid={errorStartDate}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorStartDate}
            </Form.Control.Feedback>
          </Col>

          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label htmlFor="endDate" column>
                  End Date
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  onChange={handleChange}
                  name="endDate"
                  value={endDate}
                  placeholder="Enter End Date"
                  isInvalid={errorEndDate}
                ></Form.Control>
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errorEndDate}
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label>Priority</Form.Label>
          </Col>
          <Col sm="auto">
            <Form.Check
              type="radio"
              label="High"
              value="high"
              name="priority"
              checked={priority === 'high'}
              onChange={handleChange}
            />
          </Col>

          <Col sm="auto">
            <Form.Check
              type="radio"
              label="Medium"
              value="medium"
              name="priority"
              checked={priority === 'medium'}
              onChange={handleChange}
            />
          </Col>

          <Col sm="auto">
            <Form.Check
              type="radio"
              label="Low"
              value="low"
              name="priority"
              checked={priority === 'low'}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="status">Status</Form.Label>
          </Col>
          <Col sm="auto">
            <Form.Check
              type="radio"
              label="New"
              value="new"
              name="status"
              checked={status === 'new'}
              onChange={handleChange}
            />
          </Col>

          <Col sm="auto">
            <Form.Check
              type="radio"
              label="In Progress"
              value="inProgress"
              name="status"
              checked={status === 'inProgress'}
              onChange={handleChange}
            />
          </Col>

          <Col sm="auto">
            <Form.Check
              type="radio"
              label="Completed"
              value="completed"
              name="status"
              checked={status === 'completed'}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="completeInPercent" column>
              Complete In Percentage
            </Form.Label>
          </Col>

          <Col sm={4}>
            <Form.Range
              value={completeInPercent}
              onChange={handleChange}
              name="completeInPercent"
            />
          </Col>

          <Col sm={1}>{completeInPercent}%</Col>
        </Form.Group>
        <div className="mt-4 buttons">
          <Button variant="warning" className="me-4" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={() => navigate('/issues')}>
            Back
          </Button>
        </div>
      </Form>
    </>
  );
>>>>>>> 023c38a89f07a30f62f99b6d546b405fa6c9741d
};

export default EditIssue;
