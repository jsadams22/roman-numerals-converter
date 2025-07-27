# Frontend build stage
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Development stage
FROM node:22-alpine AS development
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Production build stage
FROM node:22-alpine AS production-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend .
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY --from=production-builder /app/backend/dist ./dist
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist
EXPOSE 3000
CMD ["node", "dist/main"]