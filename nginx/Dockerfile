FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
RUN apt-get -y update && apt-get install -y dos2unix
COPY entrypoint.sh ./entrypoint.sh
RUN dos2unix ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]