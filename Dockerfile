FROM node:carbon
MAINTAINER Potsawat Chaliewkumnuan <potsawat.ch@indexlivingmall.com>

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# enforce compilation of node-rfc with the current compiler and glibc
# available in the node base image.
# Deny the access to github.com to block download of the prebuilt node binding.
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "start"]
