# house-service

build docker
docker build . -t acrwebdev/house-service

docker push
docker push acrwebdev/house-service

docker pull acrwebdev/house-service:latest

run docker
docker run -p 5000:5000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=5000 --env HOUSE_BASIC_LOCATION=http://10.140.0.2:14000 --env USER_BASIC_LOCATION=http://10.140.0.2:13000 --env SMTP_BASIC_LOCATION=http://10.140.0.2:16000 --env NOTIFICATION_BASIC_LOCATION=http://10.140.0.2:17000 --env RESERVE_HOUSE_BASIC_LOCATION=http://10.140.0.2:18000 --env JOB_BASIC_LOCATION=http://10.140.0.2:19000 --env EMPLOYEES_BASIC_LOCATION=http://10.140.0.2:21000 --env TRANSACTION_BASIC_LOCATION=http://10.140.0.2:22000 --env NAS_DIR=/usr/src/app/nas --env SWAGGER_IP=35.234.42.100 --env TZ=Asia/Taipei -v /home/acr_dev_webhouse/nas:/usr/src/app/nas --restart=always --name=house-service -d acrwebdev/house-service
