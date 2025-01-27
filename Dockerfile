# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app listens on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
