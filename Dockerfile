### STAGE 1: Build and Package Front-End ###
FROM node:9.11.1 as build
COPY frontend /usr/src/app/frontend
WORKDIR /usr/src/app/frontend
RUN mkdir /usr/src/app/server
#COPY . /usr/src/app
#WORKDIR /usr/src/app/frontend
RUN npm install --silent
RUN npm run build

### STAGE 2: Package Python App ###
FROM python:3.6
WORKDIR /usr/src/app
COPY ./server ./
COPY --from=build /usr/src/app/server/build ./build
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn