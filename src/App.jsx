import { useContext, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Navigation from './Navigation';
import AddIssue from './AddIssue';
import Issues from './Issues';
import Home from './Home';
import NotFound from './NotFound';
import EditIssue from './EditIssue';
import Register from './auth/Register';
import Login from './auth/Login';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext';

const AuthRequired = ({ children }) => {
  const { user, userLoaded } = useContext(AuthContext);

  if (userLoaded) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location.pathname }} />;
    } else {
      return children;
    }
  } else {
    return (
      <div
        style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}
      >
        <Spinner animation="grow" size="lg" />
      </div>
    );
  }
};

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { user, userLoaded } = useContext(AuthContext);

  if (userLoaded) {
    if (!user) {
      return children;
    } else {
      return <Navigate to={location?.state?.from || '/issues'} />;
    }
  } else {
    return (
      <div
        style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}
      >
        <Spinner animation="grow" size="lg" />
      </div>
    );
  }
};

function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />

      <Row>
        <BrowserRouter>
          <Navigation />
          <Col sm={{ span: 9, offset: 1 }}>
            <Container>
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route
                  path="/add"
                  element={
                    <AuthRequired>
                      <AddIssue />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <AuthRequired>
                      <EditIssue />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/issues"
                  element={
                    <AuthRequired>
                      <Issues
                        totalCount={totalCount}
                        newCount={newCount}
                        progressCount={progressCount}
                        completedCount={completedCount}
                      />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  );
}

export default App;
