# house-service

build docker
docker build . -t acrwebdev/house-service:0.0.1

docker push
docker push acrwebdev/house-service:0.0.1

docker pull
docker pull acrwebdev/house-service:0.0.1

docker pull acrwebdev/house-service:latest

run docker
docker run -p 5000:5000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=5000 --env HOUSE_BASIC_LOCATION=http://10.140.0.2:14000 --env USER_BASIC_LOCATION=http://10.140.0.2:13000 --env NOTIFICATION_BASIC_LOCATION=http://10.140.0.2:17000 --env RESERVE_HOUSE_BASIC_LOCATION=http://10.140.0.2:18000 --env JOB_BASIC_LOCATION=http://10.140.0.2:19000 --env NAS_DIR=/usr/src/app/nas --env SWAGGER_IP=34.80.78.75 -v /home/acr_dev_webhouse/nas:/usr/src/app/nas --restart=always --name=house-service -d acrwebdev/house-service:0.0.1
