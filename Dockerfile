# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Docusaurus site
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Docusaurus server
CMD ["pnpm", "run", "serve"]
