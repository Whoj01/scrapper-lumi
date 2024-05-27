FROM node:20.10.0 as builder

WORKDIR /server

ADD package.json /server

RUN npm install

COPY . /server

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]