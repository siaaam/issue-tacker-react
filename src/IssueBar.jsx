import { Row, Col } from 'react-bootstrap';
const IssueBar = ({ totalCount, newCount, progressCount, completedCount }) => {
  return (
    <Row className="mt-4 mb-4">
      <Col>
        <span>Total:</span> {totalCount}
      </Col>
      <Col>
        <span className="text-primary">New:</span> {newCount}
      </Col>
      <Col>
        <span className="text-info">In Progress:</span> {progressCount}
      </Col>
      <Col>
        <span className="text-success">Completed:</span> {completedCount}
      </Col>
    </Row>
  );
};

export default IssueBar;
