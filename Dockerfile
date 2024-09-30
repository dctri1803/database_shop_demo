# Build stage
FROM node:lts-alpine AS builder
 
USER node
WORKDIR /home/node
 
COPY package*.json .
RUN npm ci
 
COPY --chown=node:node . .
RUN npm run build && npm prune --omit=dev
 
 
# Final run stage
FROM node:lts-alpine
 
ENV NODE_ENV production
USER node
WORKDIR /home/node
 
COPY --from=builder --chown=node:node /home/node/package*.json .
COPY --from=builder --chown=node:node /home/node/node_modules ./node_modules
COPY --from=builder --chown=node:node /home/node/dist ./dist
 
# Define build-time arguments (used during image build)
ARG PORT
ARG DB_HOST
ARG DB_NAME
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_USER
ARG SESSION_SECRET

# Set environment variables for the container
ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV SESSION_SECRET=${SESSION_SECRET}

EXPOSE ${PORT:-3000}
 
# CMD ["node", "dist/src/main.js"]
# Copy start script
COPY --from=builder --chown=node:node /home/node/start.sh ./start.sh

# Set executable permissions for start script
RUN chmod +x ./start.sh

# Start the Node.js application and then NGINX
CMD ["./start.sh"]