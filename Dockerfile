# Stage 1: Build the React Client
FROM node:16-alpine AS client-builder
WORKDIR /app/client
# Copy only the package files first for caching
COPY client/package*.json ./
RUN npm install
# Copy the rest of the client source and build it
COPY client/ ./
RUN npm run build

# Stage 2: Build the Node Server 
FROM node:16-alpine
WORKDIR /app

# Install server dependencies
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install

# Copy the server source code
COPY server/ ./

# Copy the production build from the client
COPY --from=client-builder /app/client/build ./client/build

# Expose ports: assume Node serves API on port 5000 and static files on port 80.
EXPOSE 80
EXPOSE 5000

# Set NODE_ENV to production so that dotenv is not loaded.
ENV NODE_ENV=production

# Start the server (make sure your index.js is configured to serve static files)
CMD ["node", "index.js"]
