FROM node:10
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm install 
RUN chmod +x ./dockerCmd.sh
RUN mkdir /usr/src/app/nas
EXPOSE 5000
CMD [ "./dockerCmd.sh"]