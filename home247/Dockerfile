# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #              Home247 CONTAINER            # # # #
# # # #  Serving a webpage through NGINX          # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

FROM debian:latest

# # # #         Update and installation           # # # #
RUN apt-get update
RUN apt-get install nginx -y

# # # #    Adding frontend files to container     # # # #
ADD ./www /var/www/html/

# # # #           Copies certificates             # # # #
COPY ./home247.crt /etc/nginx/certs/home247.crt
COPY ./home247.key /etc/nginx/certs/home247.key

# # # #        Copies NGINX configuration         # # # #
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# # # #              Exposes ports                # # # #
EXPOSE 80
EXPOSE 443

CMD ["nginx","-g","daemon off;"]