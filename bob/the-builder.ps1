npm run build --silent --prefix ../frontend/
docker build -t hosted-desktop ./hosted-desktop
docker build -t html5-desktop ./html5-desktop
docker build -t pia-legacy ./pia-legacy
docker build -t sharedot ./sharedot

