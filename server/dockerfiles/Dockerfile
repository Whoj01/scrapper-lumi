FROM node:20.10.0 as builder

RUN useradd --create-home lumiServer
USER lumiServer

WORKDIR /server

ADD package.json /server

RUN npm install

COPY . /web

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]