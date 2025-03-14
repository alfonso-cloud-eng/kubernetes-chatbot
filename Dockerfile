# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# ---------------------------
# Cache dependency installation for server
# ---------------------------
# Copy server package files first
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install

# ---------------------------
# Cache dependency installation for client
# ---------------------------
# Copy client package files first
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

# ---------------------------
# Copy the rest of the source code
# ---------------------------
WORKDIR /app
COPY . .

# ---------------------------
# Install concurrently globally to run both processes
# ---------------------------
RUN npm install -g concurrently

# Expose ports for the client (3000) and server (5000)
EXPOSE 3000
EXPOSE 5000

# Start both the server and client concurrently
CMD ["sh", "-c", "concurrently \"cd server && npm start\" \"cd client && npm start\""]
