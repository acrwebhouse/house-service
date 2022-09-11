const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')

function getUserById(id,isDelete,callback){
    let url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.getUserById + '?id='+id+'&isDelete='+isDelete
    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            callback(false,'http request user error')
        }else{
            if(body){
                body = JSON.parse(body)
                if(body.status  == true && body.data && body.data){
                    callback(true,body.data)
                }else{
                    callback(false,'user format error')
                }
            }else{
                callback(false,'user format error')
            }
        }
    })
}


exports.getUserById = getUserById