import { Form, Col } from 'react-bootstrap';

const CheckInput = ({ name, label, value, onChange, valueToCheck }) => {
  return (
    <Col sm="auto">
      <Form.Check
        type="radio"
        label={label}
        value={value}
        name={name}
        checked={valueToCheck === value}
        onChange={onChange}
      />
    </Col>
  );
};

export default CheckInput;
