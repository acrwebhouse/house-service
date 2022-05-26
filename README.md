# house-service

build docker
docker build . -t acrwebdev/house-service:0.0.1

docker push
docker push acrwebdev/house-service:0.0.1

docker pull
docker pull acrwebdev/house-service:0.0.1

run docker
docker run -p 5000:5000 --env SERVER_IP=104.199.204.162 --env SERVER_PORT=5000 --env HOUSE_BASIC_LOCATION=http://10.140.0.7:14000 --env USER_BASIC_LOCATION=http://10.140.0.7:13000 --env NAS_DIR=/usr/src/app/nas --env SWAGGER_IP=104.199.204.162 -v /home/acr_realtorplatform/nas:/usr/src/app/nas --restart=always --name=house-service -d acrwebdev/house-service:0.0.1
