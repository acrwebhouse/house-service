# house-service
build docker
docker build . -t acrwebdev/house-service

docker push
docker push acrwebdev/house-service

run docker
docker run -p 5000:5000 --env SERVER_IP=35.201.152.0 --env SERVER_PORT=5000 --env HOUSE_BASIC_LOCATION=10.140.0.2:14000 --env NAS_DIR=/usr/src/app/nas --env SWAGGER_IP=35.201.152.0 --restart=always --name=house-service -d acrwebdev/house-service