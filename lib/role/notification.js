const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')
const house = require('./house')
const user = require('./user')

function sendNotificationByUserId(title,content,userId,reserveHouseId,callback){
    const url = config['notification-basic-server'].location+'/'+config['notification-basic-server'].restApi.sendNotificationByUserId;
    const method = 'POST';
    const headers = {};
    const notification ={
        title,
        content,
        userId,
        type : 1,
        prop : {
            reserveHouseId
        }
    }
    console.log('==sendNotificationByUserId==notification==')
    console.log(notification)
    httpRequest.sendJsonRequest(url, headers, notification, method, (error, body) => {
        if (error) {
            callback(false,body);
        } else {
            if (utilsValue.isValid(body.data.result)){
                if(body.data.result.ok == 1){
                    callback(true,body.data.ops[0]);
                }else{
                    callback(true,'insert fail');
                }
            }else{
                callback(false,body.data);
            }
        }
    });
}

function reserveHouseNotification(clientName,client,houseId,userId,reserveHouseId,callback) {
    const title = 'ACR — 預約看房通知'
    if(utilsValue.isValid(clientName)){
        house.getHouse(houseId,false,(result,data)=>{
            if(result === true){
                const city = data.city;
                const name = data.name;
                const content = city + ' — ' + name + ' — ' + clientName;
                sendNotificationByUserId(title,content,userId,reserveHouseId,callback)
            }else{
                callback(false,'get house error');
            }
        })
    }else{
        house.getHouse(houseId,false,(result,data)=>{
            if(result === true){
                const city = data.city;
                const name = data.name;
                user.getUserById(client,false,(result,data)=>{
                    if(result === true){
                        const content = city + ' — ' + name + ' — ' + data.name;
                        sendNotificationByUserId(title,content,userId,reserveHouseId,callback)
                    }else{
                        callback(false,'get user error');
                    }
                })
                
            }else{
                callback(false,'get house error');
            }
        })

    }
}


exports.reserveHouseNotification = reserveHouseNotification