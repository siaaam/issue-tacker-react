import { useContext } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { IssueContext } from './context/IssueContext';
import Issue from './Issue';
import IssueBar from './IssueBar';

const generateArr = (num) => {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};

const Issues = ({ totalCount, newCount, progressCount, completedCount }) => {
  const { issues, pageNumber, pageCount, setPageNumber } =
    useContext(IssueContext);
  const pageCountArr = generateArr(pageCount);

  const handlePageClick = (evt) => {
    setPageNumber(+evt.target.dataset.id);
  };

  return (
    <>
      <h1 className="mt-4 mb-4">All Issues</h1>
      <IssueBar
        totalCount={totalCount}
        newCount={newCount}
        progressCount={progressCount}
        completedCount={completedCount}
      />
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assign To</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <Issue key={issue.id} issue={issue} />
          ))}
        </tbody>
      </Table>
      <Pagination style={{ justifyContent: 'center' }}>
        {pageCountArr.map((count, i) => {
          return (
            <Pagination.Item
              onClick={handlePageClick}
              data-id={count}
              key={i}
              active={count === pageNumber}
            >
              {count}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
};

export default Issues;
