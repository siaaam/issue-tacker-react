import { Form, Col, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const schema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const location = useLocation();
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
    const { email, password } = data;

    try {
      const res = await axios.post(
        //   send  api req to server
        'http://localhost:1337/api/auth/local/',
        { identifier: email, password }
      );

      saveAuthInfo(res.data);
      toast.success('Login Successful');
      // on successful response navigate to issues route
      navigate(location?.state?.from || './issues');
    } catch (err) {
      toast.error(err.response.data.error.message);
    }
  };

  return (
    <>
      <h1 className="mt-4 mb-4 text-center">Login</h1>
      <Row>
        <Col sm={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mt-3">
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
