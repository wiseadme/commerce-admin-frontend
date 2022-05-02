FROM node

WORKDIR app/

ENV PORT=3000

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
