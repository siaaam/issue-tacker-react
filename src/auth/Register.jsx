import { Form, Col, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const schema = yup.object({
  username: yup.string().required('username is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const { saveAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { username, email, password } = data;

    try {
      const res = await axios.post(
        //   send  api req to server
        'http://localhost:1337/api/auth/local/register',
        { username, email, password }
      );

      saveAuthInfo(res.data);
      toast.success('Registration Successful');
      // on successful response navigate to issues route
      navigate('/issues');
    } catch (err) {
      toast.error(err.response.data.error.message);
    }
  };

  return (
    <>
      <h1 className="mt-4 mb-4 text-center">Register</h1>
      <Row>
        <Col sm={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}>
                <Form.Label htmlFor="username" column>
                  Username
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  className="shadow-none"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Your Username"
                  {...register('username')}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="d-block"
                  isInvalid={errors.username}
                >
                  {errors.username?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}>
                <Form.Label htmlFor="email" column>
                  Email
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  className="shadow-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  {...register('email')}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="d-block"
                  isInvalid={errors.email}
                >
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}>
                <Form.Label htmlFor="password" column>
                  password
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  className="shadow-none"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your password"
                  {...register('password')}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="d-block"
                  isInvalid={errors.password}
                >
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}>
                <Form.Label htmlFor="confirmPassword" column>
                  Confirm Password
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  className="shadow-none"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                  {...register('confirmPassword')}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="d-block"
                  isInvalid={errors.confirmPassword}
                >
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <div className="mt-3">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
