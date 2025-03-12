# Use a lightweight Node.js image
FROM node:16-alpine

# Set working directory to /app
WORKDIR /app

# Copy the entire project into the container
COPY . .

# ---------------------------
# Install server dependencies
# ---------------------------
WORKDIR /app/server
# Use npm install instead of npm ci to avoid lock file mismatch issues.
RUN npm install

# ---------------------------
# Install client dependencies
# ---------------------------
WORKDIR /app/client
RUN npm install

# ---------------------------
# Install concurrently globally to run both processes
# ---------------------------
WORKDIR /app
RUN npm install -g concurrently

# Expose ports for the client (3000) and server (5000)
EXPOSE 3000
EXPOSE 5000

# Start both the server and client concurrently
CMD ["sh", "-c", "concurrently \"cd server && npm start\" \"cd client && npm start\""]
