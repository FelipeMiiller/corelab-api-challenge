FROM postgres:16.4-alpine3.20
RUN apk --no-cache add shadow
RUN usermod -u 1000 postgres
