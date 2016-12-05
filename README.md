# ampere_health_app

#Pre-requisite:
1. Mongo DB Installed
2. Node set up

#How to Run:
1. npm install
2. node app.js

#How to run Docker image
  a. docker run --name my-local-mongo -v mongo-data:/data/db -p 27017:27017 -d mongo
  b. docker images
  c. docker build -t ampere/node-web-app .
  d. docker run <image_id>
  e. docker inspect <container_id>
  f. Get IP from here:
  g. docker inspect <container_id>|grep "IPAddress"
  h. Verify if this host is up

