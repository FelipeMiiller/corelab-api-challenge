FROM postgres:16.4-alpine3.20




RUN chown -R 1000:1000 /var/lib/postgresql

USER 1000