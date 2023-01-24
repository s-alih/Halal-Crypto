FROM node:16

# Create app directory
RUN mkdir  /mint-hcc-app

WORKDIR /mint-hcc-app

COPY package.json /mint-hcc-app

RUN npm install

COPY . /mint-hcc-app

RUN npm run build

EXPOSE 3000

CMD [ "npm","run", "start" ]

