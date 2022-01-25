Admin Control Panel for a rocket launch scheduling system using data from api.spacexdata.com.

Frontend is react with typescript and material-ui using a custom made webpack and babel config, complete with dev and prod ready npm scripts.

Backend is node with express using mongoose to connect to a atlas mongodb server. The frontend static files are also served from this express server.

Hosted on an aws ec2 private server instance using a nginx reverse proxy.


.env file must contain:
API_URL=http://localhost:8000/v1 for local dev
or
API_URL=/v1 for production deploy
in client/.env

and in server/.env
MONGO_URL=secreturl //do not commit
