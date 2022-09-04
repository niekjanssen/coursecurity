# bob/the-builder builds all containers from scratch and tags them correctly for use by Docker-Compose
docker build -t hosted-desktop ../hosted-desktop
docker build -t html5-desktop -f ../html5-desktop/Dockerfile ../
docker build -t home247 ../home247
docker build -t pia-legacy ../pia-legacy
docker build -t sharedot ../sharedot