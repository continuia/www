# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the built files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application with SPA support (fallback to index.html)
CMD ["serve", "-s", "dist", "-l", "3000"]