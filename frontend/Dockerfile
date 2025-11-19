# 1. Build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# tell Vite to use the backend container URL
ENV VITE_API_URL=http://backend:3000/api/tina/chat
RUN npm run build

# 2. Setup the server to serve the app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
