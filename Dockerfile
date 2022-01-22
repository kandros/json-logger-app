FROM node:17.4.0-alpine3.15

COPY package.json package.json  
RUN npm install

COPY . .  
CMD ["npm","start"] 