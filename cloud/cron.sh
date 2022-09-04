restart=`ls /root/db/restart`
for sandbox in $restart
do
  cd /root/cloud/$sandbox
  /usr/local/bin/docker-compose down --remove-orphans
  /usr/local/bin/docker-compose up -d
  rm /root/db/restart/$sandbox
  touch /root/db/available/$sandbox
done

stop=`ls /root/db/stop`
for sandbox in $stop
do
  cd /root/cloud/$sandbox
  /usr/local/bin/docker-compose down --remove-orphans
  rm /root/db/stop/$sandbox
  touch /root/db/stopped/$sandbox
done
