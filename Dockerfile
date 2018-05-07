
### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-alpine as builder

## Used for the new Angular CLI Workspaces
ARG NG_PROJECT_NAME

COPY package.json .

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

## Move to /ng-app (eq: cd /ng-app)
WORKDIR /ng-app


# Copy everything from host to /ng-app in the container
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build $NG_PROJECT_NAME -- --prod


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine
ARG NG_PROJECT_NAME
## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/$NG_PROJECT_NAME /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
