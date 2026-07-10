# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies (including sqlite3)
RUN npm install sqlite3 && npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port required by Render (default 10000)
EXPOSE 10000

# Command to run your Node.js application
CMD ["node", "index.js"]
