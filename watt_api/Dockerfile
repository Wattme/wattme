FROM node:15-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app

EXPOSE 3000
CMD ["npm", "run", "prod"]

