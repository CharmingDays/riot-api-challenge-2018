FROM mhart/alpine-node
USER root

COPY ./common /home/root/app/common

COPY ./server/achievement-config /home/root/app/server/achievement-config
COPY ./server/achievement-db /home/root/app/server/achievement-db
COPY ./server/achievement-redis /home/root/app/server/achievement-redis

COPY ./server/processing-server /home/root/app/server/processing-server


RUN cd /home/root/app/common/achievement-sio && npm install && npm run build
RUN cd /home/root/app/common/achievement-models && npm install && npm run build
RUN cd /home/root/app/server/achievement-config && npm install && npm run build
RUN cd /home/root/app/server/achievement-db && npm install && npm run build
RUN cd /home/root/app/server/achievement-redis && npm install && npm run build

WORKDIR /home/root/app/server/processing-server/src
RUN npm install
RUN npm run build
RUN ls -al .
RUN ls -al ./dist/
ENTRYPOINT ["node", "dist/"]
