# Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build application
RUN npm run build --prod

# Expose port 4200
EXPOSE 4200

# Start the application
CMD [ "npm", "start" ]
