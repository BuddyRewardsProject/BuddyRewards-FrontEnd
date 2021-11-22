# base image
FROM node:16.13.0-alpine

# set working directory
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /app
RUN yarn
RUN yarn add react-scripts -g

# start app
CMD ["yarn", "start"]