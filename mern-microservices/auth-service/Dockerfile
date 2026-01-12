# Stage 1: Build
FROM node:20-alpine AS js.app
WORKDIR /app
COPY ./package*.json ./
RUN npm install

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=js.app /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["node", "src/app.js"]