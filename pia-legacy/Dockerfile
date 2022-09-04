# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #         Pia-legacy CONTAINER              # # # #
# # # #  Running the webpage of legacy server     # # # #
# # # #			Using a NGINX server              # # # #
# # # #		With vsftpd-backdoor vulnerability    # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #


FROM debian:latest
### ADAPTED FROM https://raw.githubusercontent.com/Anon-Exploiter/vulnerable-packages/master/backdoored-vsftpd-2.3.4/Dockerfile

# # # #                   UPDATE LOCALE                       # # # #

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install -y git


WORKDIR /root/
# # # #             INSTALL vulnerable backdoor               # # # #
RUN git clone https://github.com/Anon-Exploiter/vulnerable-packages && \
	cd vulnerable-packages && \
	cd backdoored-vsftpd-2.3.4 && \
	mv * /root/ && \
	cd /root && \
	rm -rfv vulnerable-packages

# # # #                  INSTALL NGINX                        # # # #
RUN apt-get install nginx -y
# # # #               INSTALL BASIC TOOLS                     # # # #
RUN apt-get install sudo
RUN apt-get purge -y git && \
	apt-get -y autoclean && \
	apt-get -y autoremove && \
	apt-get -y clean

# # # #             Creates directories                       # # # #
RUN mkdir /usr/share/empty/ && \
	mkdir /var/ftp/ && \
	useradd -d /var/ftp ftp
# # # #          Changing directories to root owner           # # # #
RUN chown root.root /var/ftp && \
	chmod og-w /var/ftp
# # # #      Moves vsftpd into correct directories            # # # #
RUN mv vsftpd /usr/local/sbin/vsftpd && \
	mv vsftpd.conf /etc/
# # # #    Adds commands ton run.sh file          # # # #
RUN echo 'echo Started FTP Server@ `hostname -i 2>/dev/null`:21' > /root/run.sh && \
    echo "sudo service nginx start" >> /root/run.sh && \
	echo "/usr/local/sbin/vsftpd" >> /root/run.sh

# # # #             Copies page fronted                       # # # #
COPY ./www /var/www/html/

# # # #              Copies certificate files                 # # # #
COPY ./PIA.crt /etc/nginx/certs/PIA.crt
COPY ./PIA.key /etc/nginx/certs/PIA.key

# # # #          Copies Nginx configuration file              # # # #
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# # # #                   Creates directories                 # # # #
RUN mkdir /root/data && \
	mkdir /root/data/members && \
	mkdir /root/data/employees && \
	mkdir /root/data/events

# # # #                  Copies dummy data                    # # # #
COPY data/employees.json /root/data/employees/employees.json

# # # #           Copies customized wipe command              # # # #
COPY wipe /usr/bin/wipe

# # # #          Moves docker file and run.sh file            # # # #
RUN mkdir /Docker && \ 
mv /root/Dockerfile /Docker/Dockerfile && \
mv /root/run.sh /Docker/run.sh

# # # #                    Exposed ports                      # # # #
EXPOSE 80
EXPOSE 443

CMD ["/bin/bash", "-c", "/bin/bash /Docker/run.sh"]