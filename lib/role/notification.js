const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')

function sendNotificationByUserId(title,content,userId,callback){
    const url = config['notification-basic-server'].location+'/'+config['notification-basic-server'].restApi.sendNotificationByUserId;
    const method = 'POST';
    const headers = {};
    const notification ={
        title,
        content,
        userId,
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

function reserveHouseNotification(clientName,clientPhone,userId,callback) {
    const title = clientName+' 先生／小姐 預約看房'
    const content = '電話： '+clientPhone
    sendNotificationByUserId(title,content,userId,callback)
}


exports.reserveHouseNotification = reserveHouseNotification