# Stage 1: Build the React Client
FROM node:16-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build the Node Server
FROM node:16-alpine
WORKDIR /app

# Install server dependencies
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Copy the production build from the client
COPY --from=client-builder /app/client/build ../client/build

# Set NODE_ENV to production and PORT to 80
ENV NODE_ENV=production
ENV PORT=80

# Expose port 80 (serving both static client and API)
EXPOSE 80

CMD ["node", "index.js"]
