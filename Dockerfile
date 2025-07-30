FROM node:22-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: run the compiled app
FROM node:22-slim

WORKDIR /app

# Copy built artifacts and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set NODE_ENV for production
ENV NODE_ENV=production

# Expose application port
EXPOSE 8000

# Start the app
CMD ["node", "dist/main.js"]