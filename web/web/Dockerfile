FROM node:14
WORKDIR /web
COPY . /web
RUN npm install && npm install -g serve env-cmd
EXPOSE 3000
#CMD bash -c "npm run build:prod && serve -l 3000 -s build"
