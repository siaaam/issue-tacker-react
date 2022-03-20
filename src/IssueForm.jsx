import { Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// const defaultIssue = {
//   title: '',
//   subTitle: '',
//   assignTo: '',
//   startDate: '',
//   endDate: '',
//   priority: 'high',
//   status: 'new',
//   completeInPercent: '20',
// };

const IssueForm = ({ addIssue, updateIssue, issue: issueToEdit }) => {
  const [issue, setIssue] = useState({
    title: '',
    subTitle: '',
    assignTo: '',
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    priority: 'high',
    status: 'new',
    completeInPercent: '20',
  });

  useEffect(() => {
    if (issueToEdit) {
      const {
        id,
        title,
        subTitle,
        assignTo,
        startDate,
        endDate,
        priority,
        status,
        completeInPercent,
      } = issueToEdit;

      setIssue({
        id,
        title,
        subTitle,
        assignTo,
        startDate,
        endDate,
        priority,
        status,
        completeInPercent,
      });
    }
  }, [issueToEdit]);

  const [errors, setErrors] = useState({
    title: '',
    subTitle: '',
    assignTo: '',
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();
  // dealing with HANDLE CHANGE event handler

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });

    setErrors((prevErr) => ({ ...prevErr, [e.target.name]: '' }));
  };

  // dealing with SUBMIT event handler

  const handleSubmit = (e) => {
    const { title, subTitle, assignTo, startDate, endDate, priority } = issue;

    e.preventDefault();
    // checking error
    if (title === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'title is required',
      }));
    }

    if (subTitle === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subTitle: 'Sub title is required',
      }));
    }

    if (assignTo === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        assignTo: 'Assign to is required',
      }));
    }

    if (startDate === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDate: 'Start date is required',
      }));
    }

    if (endDate === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDate: 'End date is required',
      }));
    }

    // return true if every element is true, otherwise false
    const isValid = Object.values(issue).every((elm) => elm);

    if (issue.id && isValid) {
      updateIssue({
        ...issue,
      });
      toast.success('Issue updated successfully');
      navigate('/issues');
      return;
    }

    if (isValid) {
      // form submission
      addIssue({
        ...issue,
        id: uuid(),
      });
      toast.success('Issue added successfully');
      navigate('/issues');
    }
  };

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
      <h1 className="mt-4 mb-4">{issueToEdit ? 'Edit Issue' : 'Add Issue'}</h1>
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
            <DatePicker
              type="date"
              selected={startDate}
              onChange={(date) =>
                setIssue({
                  ...issue,
                  startDate: date,
                })
              }
              name="startDate"
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              value={startDate}
              isInvalid={errorStartDate}
              selectsStart
            />
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
                <DatePicker
                  type="date"
                  selected={endDate}
                  onChange={(date) =>
                    setIssue({
                      ...issue,
                      endDate: date,
                    })
                  }
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  name="endDate"
                  value={endDate}
                  placeholder="Enter End Date"
                  isInvalid={errorEndDate}
                  selectsEnd
                />
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
        <Button variant="primary" type="submit">
          {issueToEdit ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
};

export default IssueForm;