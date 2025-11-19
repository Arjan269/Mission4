# ---- Base Node Image ----
FROM node:18

# ---- App Directory ----
WORKDIR /app

# ---- Copy Package Files ----
COPY package*.json ./

# ---- Install Dependencies ----
RUN npm install

# ---- Copy the Rest of the Backend Code ----
COPY . .

# ---- Expose App Port ----
EXPOSE 3000

# ---- Start Server ----
CMD ["node", "index.js"]
