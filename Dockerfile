#set node version
FROM node:18-alpine3.15

# Define workdir
WORKDIR /usr/src/api

#Copying the content in the pastes
COPY . .

#Instal Dependencies
RUN npm install --quiet --no-optional --no-found --loglevel=error

# Build for production
RUN npm run build

#Expose port 3000 from the API
EXPOSE 3000

#Run the API
CMD ["npm","run","start:prod"]