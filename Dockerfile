FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . . 
EXPOSE 3000
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD [ "node", "src/server.js" ]