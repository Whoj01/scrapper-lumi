FROM node:20.10.0 as builder

ADD package*.json /server

WORKDIR server

RUN npm ci

COPY . /server

RUN npm run build

CMD ["npm", "start"]