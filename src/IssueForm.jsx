import { Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import TextInput from './formInputs/TextInput';
import DateInput from './formInputs/DateInput';
import CheckInput from './formInputs/CheckInput';

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
        <TextInput
          label="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
          placeholder="Enter Your Issue"
          error={errorTitle}
        />

        <TextInput
          label="Sub Title"
          type="text"
          name="subTitle"
          onChange={handleChange}
          value={subTitle}
          placeholder="Enter Your Issue Details"
          error={errorSubtitle}
          as="textarea"
        />

        <TextInput
          label="Assign To"
          type="text"
          name="assignTo"
          onChange={handleChange}
          value={assignTo}
          placeholder="Enter Name Whom You Have Assign To"
          error={assignToErr}
        />

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="startDate" column>
              Start Date
            </Form.Label>
          </Col>

          <Col sm={3}>
            <DateInput
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
              error={errorStartDate}
              selectsStart
            />
          </Col>

          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label htmlFor="endDate" column>
                  End Date
                </Form.Label>
              </Col>
              <Col sm={9}>
                <DateInput
                  selected={endDate}
                  onChange={(date) =>
                    setIssue({
                      ...issue,
                      endDate: date,
                    })
                  }
                  name="endDate"
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  value={endDate}
                  error={errorEndDate}
                  selectsEnd
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        {/* priority form input field */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label>Priority</Form.Label>
          </Col>

          {[
            {
              name: 'priority',
              label: 'High',
              value: 'high',
              valueToCheck: priority,
            },
            {
              name: 'priority',
              label: 'Medium',
              value: 'medium',
              valueToCheck: priority,
            },
            {
              name: 'priority',
              label: 'Low',
              value: 'low',
              valueToCheck: priority,
            },
          ].map((elm, idx) => (
            <CheckInput
              key={idx}
              name={elm.name}
              label={elm.label}
              value={elm.value}
              onChange={handleChange}
              valueToCheck={elm.valueToCheck}
            />
          ))}
        </Form.Group>

        {/* status form input field */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="status">Status</Form.Label>
          </Col>

          {[
            {
              name: 'status',
              label: 'New',
              value: 'new',
              valueToCheck: status,
            },
            {
              name: 'status',
              label: 'In Progress',
              value: 'inProgress',
              valueToCheck: status,
            },
            {
              name: 'status',
              label: 'Completed',
              value: 'completed',
              valueToCheck: status,
            },
          ].map((elm, idx) => (
            <CheckInput
              key={idx}
              name={elm.name}
              label={elm.label}
              value={elm.value}
              onChange={handleChange}
              valueToCheck={elm.valueToCheck}
            />
          ))}
        </Form.Group>

        {/* Range form input field */}
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
