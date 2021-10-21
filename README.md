Stack:
  React
  Webpack
  Babel
  TypeScript
  Material-ui v5

.env file must contain:
API_URL=http://localhost:8000/v1 for local dev
or
API_URL=/v1 for production deploy
in client/.env

and in server/.env
MONGO_URL=secreturl //do not commit