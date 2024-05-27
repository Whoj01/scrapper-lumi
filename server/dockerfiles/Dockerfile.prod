FROM node:20.10.0 as builder

WORKDIR /server

ADD package.json /server

RUN npm install

COPY . /server

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]