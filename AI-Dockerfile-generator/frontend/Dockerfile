FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build output goes into /app/dist (shared volume)
RUN npm run build

# The container just builds; it will exit after building
CMD ["echo", "Frontend build done"]