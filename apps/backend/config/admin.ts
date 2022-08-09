export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '456cbee932c86db51037f96d9cb972e6'),
  },
});
