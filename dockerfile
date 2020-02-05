FROM node:11.10.0
RUN npm install pm2 -g

WORKDIR /app
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install

COPY app app
COPY lib lib
COPY middlewares middlewares
COPY models models
COPY modules modules
COPY orm orm
COPY routes routes
COPY pem pem

COPY index.js server.js socket.js ./

COPY initialization initialization
ENTRYPOINT ["sh", "initialization/docker-entrypoint.sh"]
CMD ["node", "index.js"]
