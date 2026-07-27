# syntax=docker/dockerfile:1

# Backend image for the CyberEscape API (Node + Express + Mongoose)
FROM node:22-alpine

# Small init so signals (SIGINT/SIGTERM) are handled cleanly on Fly
RUN apk add --no-cache tini

WORKDIR /app

# Install production dependencies only (nodemon is a devDependency)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# App source
COPY . .

ENV NODE_ENV=production
# Must match internal_port in fly.toml; the app reads process.env.PORT
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/index.js"]
