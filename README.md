#### Admin Control Panel for a rocket launch scheduling system using data from api.spacexdata.com.

Frontend is react with typescript and material-ui using a custom made webpack and babel config, complete with dev and prod ready npm scripts.

Backend is node with express using mongoose to connect to a atlas mongodb server. The frontend static files are also served from this express server.

Hosted on an aws ec2 private server instance using a nginx reverse proxy.

Client .env file must contain:
API_URL

Server .env file must contain:

MONGO_PWD

MONGO_USER

MONGO_DB_URL, ex:`mongodb+serv//...`

PORT

API_VERSION
