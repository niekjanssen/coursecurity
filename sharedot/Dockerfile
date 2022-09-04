# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #         Sharedot container                # # # #
# # # # Serving php page through apache server    # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

FROM php:8.0-apache

# # # #           Copies fronted files            # # # #
WORKDIR /var/www/html
COPY www/* ./
COPY files /home/files/

# # # #               Exposed ports               # # # #
EXPOSE 80
EXPOSE 443

# # # #         Copies Apache conf file           # # # #
COPY apache.conf /etc/apache2/sites-available/apache.conf

# # # #         Copies certificate files          # # # #
ADD sharedot.crt /etc/apache2/ssl/crt/sharedot.crt
ADD sharedot.key /etc/apache2/ssl/key/sharedot.key

# # # #   Adds SSL certificates to apache conf    # # # #
RUN chmod 777 /etc/apache2/ssl/crt/sharedot.crt /etc/apache2/ssl/key/sharedot.key
ADD apache.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
RUN a2enmod ssl

# # # #    Runs apache server hosting PHP page    # # # #
RUN echo "ServerName sharedot.com" >> /etc/apache2/apache2.conf &&\
    a2enmod rewrite &&\
    a2dissite 000-default &&\
    a2ensite apache &&\
    service apache2 restart 
