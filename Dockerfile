FROM node:argon

#Create work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy dependencies
COPY package.json /usr/src/app
RUN npm install

#Copy app content
COPY ./ /usr/src/app/

RUN pwd

RUN ls -la /usr/src/app/

# Expose private 3000
EXPOSE 3000

# And start the app through the package.json run start command.
CMD ["node", "app.js"]