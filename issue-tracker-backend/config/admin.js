module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '722d7ce57e9c647796a0889b37a90bd1'),
  },
});
