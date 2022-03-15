import { Navbar, Nav, Container } from 'react-bootstrap';
const Navigation = () => {
  return (
    <>
      <Navbar bg="light" expand="sm" className="mb-3">
        <Container>
          <Navbar.Brand className="issue-brand" href="#home">
            Issue Tracker
          </Navbar.Brand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Issues</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
