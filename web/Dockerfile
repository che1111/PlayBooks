# Stage 1: Build the Node.js application
FROM node:19-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the project
RUN npm run build

# Stage 2: Use OpenResty (Nginx with Lua)
# FROM openresty/openresty:alpine

FROM openresty/openresty:focal

# install dependencies
RUN ["luarocks", "install", "lua-resty-session", "4.0.3"]
RUN ["luarocks", "install", "lua-resty-http"]
RUN ["luarocks", "install", "lua-resty-jwt"]

# install test dependencies
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "git"]
RUN ["luarocks", "install", "busted"]
RUN ["luarocks", "install", "LuaSocket"]
RUN ["luarocks", "install", "serpent"]
RUN ["luarocks", "install", "dkjson"]
RUN ["luarocks", "install", "luacov"]

# Set working directory for OpenResty
WORKDIR /usr/local/openresty/nginx/html

# Remove default Nginx index page
RUN rm -rf /usr/local/openresty/nginx/html/*

# Copy the built application from the first stage
COPY --from=builder /app/dist /usr/local/openresty/nginx/html

# Copy custom Nginx configuration
COPY ./nginx.docker.conf /usr/local/openresty/nginx/conf/nginx.conf

# Copy the Lua script to handle token logic
COPY get_token.lua /usr/local/openresty/nginx/lua/get_token.lua

# Copy and make the entrypoint script executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Use the script as the entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
