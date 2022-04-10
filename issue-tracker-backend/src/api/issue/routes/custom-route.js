module.exports = {
  routes: [
    {
      method: "PUT",
      path: `/issues/completed/:id`,
      handler: "issue.completedIssue",
    },
  ],
};
