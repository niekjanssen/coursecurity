FROM debian:latest

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #        DESKTOP ENVIRONMENT SETUP          # # # #
# # # # Install X11/XDG/XFCE4 + some basic tools  # # # #
# # # # Set the locale for the desktop environment# # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Adapted from: https://github.com/mviereck/dockerfile-x11docker-xfce #
# (MIT License)                                         # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
RUN apt-get update && \
    env DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        dbus-x11 \
        menu-xdg \ 
        procps \ 
        psmisc \ 
        xdg-user-dirs \ 
        xdg-utils

# # # #              UPDATE LOCALE                # # # #
ENV LANG en_US.UTF-8
RUN echo $LANG UTF-8 > /etc/locale.gen && \
    env DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        locales \
    && update-locale --reset LANG=$LANG

# # # #          INSTALL BASIC TOOLS              # # # #
RUN env DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \      
        curl \ 
        dnsutils \ 
        gnupg \ 
        iproute2 \ 
        iputils-* \ 
        libxv1 \
        libnss3-tools \
        nano \ 
        netcat \ 
        net-tools \ 
        nmap \ 
        openssl \ 
        sudo \ 
        unzip \ 
        wget \ 
        whois

# # # #              INSTALL XFCE4                # # # #
RUN env DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        desktop-base \
        xfce4 \
        xfce4-terminal \
        xterm

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #           PREPARE AUTO START              # # # #
# # # # Create start up script (desktop.sh)       # # # #
# # # # Include 10s delay to give HTML5-Desktop   # # # #
# # # # time to start up                          # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
RUN chmod 755 /usr/bin/startxfce4 \
    && echo "sleep 10 &&" >> /desktop.sh \
    && echo "/usr/bin/startxfce4" >> /desktop.sh \
    && chmod 755 /desktop.sh
# # # #          END OF AUTO START SETUP          # # # #

# # # #     END OF DESKTOP ENVIRONMENT SETUP      # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #         PARTICIPANT USER SET-UP           # # # #
# # # # Add user (+folder) "hacker" to the system # # # #
# # # # Give super-user (sudo) rights to the user # # # #
# # # # Update the password to equal "hacker"     # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
RUN adduser --home /home/hacker hacker
RUN echo "hacker ALL=(ALL:ALL) ALL" >> /etc/sudoers
RUN usermod -p `openssl passwd hacker` hacker
# # # #      END OF PARTICIPANT USER SET-UP       # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #       GOOGLE CHROME INSTALLATION          # # # #
# # # # Install Chrome Driver & Google Chrome     # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Adapted from: https://github.com/blueimp/chromedriver #
# (MIT License)                                         #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
RUN curl --insecure -sL "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" > /tmp/chrome.deb \
    && apt install --no-install-recommends --no-install-suggests -y \
    /tmp/chrome.deb \
    && CHROMIUM_FLAGS='--no-first-run --no-default-browser-check --no-sandbox --enable-low-end-device-mode --disable-dev-shm-usage --disable-crashpad --disable-translate --start-maximized' \
    && sed -i '${s/$/'" $CHROMIUM_FLAGS"'/}' /opt/google/chrome/google-chrome 
    # && BASE_URL=https://chromedriver.storage.googleapis.com \
    # && VERSION=$(curl -sL "$BASE_URL/LATEST_RELEASE") \
    # && curl -sL "$BASE_URL/$VERSION/chromedriver_linux64.zip" -o /tmp/driver.zip \
    # && unzip /tmp/driver.zip \
    # && chmod 755 chromedriver \
    # && mv chromedriver /usr/local/bin/
# # # #   END OF GOOGLE CHROME INSTALLATION       # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #             INSTALL ROOT CA               # # # #
# # # # Install and trust the Project's Root CA   # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Inspired by: https://unix.stackexchange.com/a/90607   # # # # # # # # # # # # # # # # # # # # # # # #
# and: https://chromium.googlesource.com/chromium/src/+/refs/heads/lkgr/docs/linux/cert_management.md #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
RUN mkdir /usr/local/share/ca-certificates/cybersec/
ADD coursecurity.crt /usr/local/share/ca-certificates/coursecurityssl/RootCA.crt
RUN update-ca-certificates

RUN mkdir -p /home/hacker/.pki/nssdb && \
  printf "ThesisWorthA12\nThesisWorthA12\n" | certutil -d sql:/home/hacker/.pki/nssdb -N && \
  chmod -R 777 /home/hacker/.pki/nssdb && \
  chown -R hacker:hacker /home/hacker/.pki/nssdb && \
  certutil -d sql:/home/hacker/.pki/nssdb -A -t "C,," -n "Coursecurity SSL>" -i /usr/local/share/ca-certificates/coursecurityssl/RootCA.crt
# # # #        END OF INSTALL ROOT CA             # # # #


# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # #         METASPLOIT INSTALLATION           # # # #
# # # # Download and install Metasploit Framework # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Following: https://docs.rapid7.com/metasploit         #
# (BSD-3-clause)                                        #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
RUN curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall \
    && chmod 755 msfinstall \
    && ./msfinstall
RUN echo "echo no no quit | msfconsole" >> /db.sh && chmod 777 /db.sh
RUN ["su","-c","/db.sh","hacker"]
RUN rm /db.sh
# # # #     END OF METASPLOIT INSTALLATION        # # # #



# # # #             DESKTOP STYLING               # # # #
COPY ./desk-config/panel /home/hacker/.config/xfce4/panel
COPY ./desk-config/xfce4/xfconf/xfce-perchannel-xml/xfce4-panel.xml /home/hacker/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-panel.xml
COPY ./desk-config/purplebg.svg /usr/share/images/desktop-base/default

# # # #          FAKE DOWNLOAD COMMAND            # # # #
RUN mkdir /var/empholder
COPY ./data/employees.html /var/empholder/emp.html
RUN echo "cat /var/empholder/emp.html > /home/hacker/Desktop/employees.html" >> /usr/bin/download
RUN chmod 777 /usr/bin/download


# # # #           FIX FILE OWNERSHIP              # # # #
RUN chown -R hacker /home/hacker/

CMD ["su","-c","/desktop.sh","hacker"]