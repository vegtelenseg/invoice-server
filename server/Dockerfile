FROM node:14.0.0
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]