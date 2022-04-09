const formatIssues = (data) => {
  console.log(data);
  return data.map((issue) =>
    console.log({ ...issue.attributes, id: issue.id })
  );
  //
};

export default formatIssues;
