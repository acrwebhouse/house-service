const config = require('../setting/config').config;
const httpRequest = require('../utils/httpRequest');
const utilsValue = require('../utils/value');

function addTransaction(houseId,userId,companyId,actualPrice,serviceCharge,startRentDate,endRentDate,callback) {
    const transaction = {}
    if (utilsValue.isValid(houseId)){
        transaction.houseId = houseId
    }
    if (utilsValue.isValid(userId)){
        transaction.userId = userId
    }
    if (utilsValue.isValid(companyId)){
        transaction.companyId = companyId
    }
    if (utilsValue.isValid(actualPrice)){
        transaction.actualPrice = actualPrice
    }
    if (utilsValue.isValid(serviceCharge)){
        transaction.serviceCharge = serviceCharge
    }
    if (utilsValue.isValid(startRentDate)){
        transaction.startRentDate = startRentDate
    }
    if (utilsValue.isValid(endRentDate)){
        transaction.endRentDate = endRentDate
    }
    const url = config['transaction-basic-server'].location+'/'+config['transaction-basic-server'].restApi.addTransaction;
    const method = 'POST';
    const headers = {};
    httpRequest.sendJsonRequest(url, headers, transaction, method, (error, body) => {
        if (error) {
            console.log('===addTransaction==error=')
            console.log(error)
            console.log('===addTransaction==body=')
            console.log(body)
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


exports.addTransaction = addTransaction
