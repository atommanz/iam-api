FROM node:8
MAINTAINER Poomiphat Chamweha <poomiphat.ch@indexlivingmall.com>

# last directory must be "nwrfcsdk"
ENV SAPNWRFC_HOME /sap/nwrfcsdk
ENV LD_LIBRARY_PATH  /sap/nwrfcsdk/lib
# ENV NODE_ENV production
# ENV PORT 3000

WORKDIR $SAPNWRFC_HOME
# download files manually on host, docker build copies them into image
COPY ext-lib/nwrfcsdk .

# extract SAR archive, run ldconfig
# RUN chmod +x SAPCAR_914-80000938.EXE && \
#     cd .. && \
#     ./nwrfcsdk/SAPCAR_914-80000938.EXE -xvf ./nwrfcsdk/NWRFC_44-20004568.SAR && \
#     rm nwrfcsdk/NWRFC_44-20004568.SAR nwrfcsdk/SAPCAR_914-80000938.EXE && \
#     echo "$SAPNWRFC_HOME/lib" > /etc/ld.so.conf.d/saprfc.conf && \
#     ldconfig
RUN echo "$SAPNWRFC_HOME/lib" > /etc/ld.so.conf.d/saprfc.conf && \
    ldconfig -p

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

USER node
