const formatIssue = (data) => {
  return {
    id: issue.id,
    ...data.attributes,
  };
};

export default formatIssue;
