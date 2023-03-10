const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')
const user = require('./user')

function addReserveHouseExe(client,host,houseId,state,type,clientName,clientPhone,callback) {
    const url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.addReserveHouse;
    const method = 'POST';
    const headers = {};
    const reserveHouse ={
        client,
        host,
        houseId,
        state,
        type,
        clientName,
        clientPhone
    }
    httpRequest.sendJsonRequest(url, headers, reserveHouse, method, (error, body) => {
        if (error) {
            console.log('===addReserveHouseExe==error=')
            console.log(error)
            console.log('===addReserveHouseExe==body=')
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


function addReserveHouse(client,host,houseId,state,type,clientName,clientPhone,callback) {
    if(utilsValue.isValid(client)){
        user.getUserById(client,false,(result,data)=>{
            if(result == true){
                clientName = data.name
                clientPhone = data.phone
                addReserveHouseExe(client,host,houseId,state,type,clientName,clientPhone,callback)
            }else{
                callback(false,data)
            }
            
        })
    }else{
        addReserveHouseExe(client,host,houseId,state,type,clientName,clientPhone,callback)
    }

    
}

function removeReserveHouse(ids,callback) {
    if (utilsValue.isValid(ids)){
        const url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.removeReserveHouse;
        const method = 'DELETE';
        const headers = {};
        const json = {
            ids:ids
        }
        httpRequest.sendJsonRequest(url, headers, json, method, (error, body) => {
            if (error) {
              console.log('===removeReserveHouse==error=')
              console.log(error)
              console.log('===removeReserveHouse==body=')
              console.log(body)
              callback(false,body);
            } else {
                callback(true,body);
            }
          });
    }else {
        callback(false, 'id invalid')
    }
}



function getReserveHouse(id,isClient,callback){
    let url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.getReserveHouse + '?id='+id
    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('====error===')
            console.log(error)
            callback(false,'http request house error')
        }else{
            try{
                const res = JSON.parse(body)
                if(isClient === true){
                    removeReserveHouseHostData(res.data.houseData)
                }
                callback(true,res.data);
            }catch(e){
                callback(false,"data format error: "+body);
            }
            
        }
    })
}

function removeReserveHousesHostData(data){
    if(utilsValue.isValid(data)){
        for(let i = 0 ;i<data.length; i++){
            removeReserveHouseHostData(data[i].houseData)
        }
    }
}

function removeReserveHouseHostData(data){
    if(utilsValue.isValid(data)){
        for(let i = 0 ;i<data.length; i++){
            delete data[i].hostName
            delete data[i].hostPhone
            delete data[i].hostGender
        }
    }
}

function getReserveHouses(start,count,host,client,states,type,timeSort,callback) {

    let url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.getReserveHouses+'?'
    if(utilsValue.isValid(start)){
        url = url + 'skip='+start
    }else{
        url = url + 'skip='+0
    }
    
    if(utilsValue.isValid(count)){
        url = url + '&&limit='+count
    }else{
        url = url + '&&limit='+300
    }
    
    if(utilsValue.isValid(host)){
        url = url + '&&host='+host
    }

    if(utilsValue.isValid(client)){
        url = url + '&&client='+client
    }

    if(utilsValue.isValid(states)){
        url = url + '&&states='+states
    }

    if(utilsValue.isValid(type) || type === 0){
        url = url + '&&type='+type
    }

    if(utilsValue.isValid(timeSort)){
        timeSort = timeSort*1;
        const sort = {
            updateTime:timeSort
        }
        url = url + '&&sort='+JSON.stringify(sort) 
    }else{
        const sort = {
            updateTime:1
        }
        url = url + '&&sort='+JSON.stringify(sort) 
    }

    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('===getReserveHouses==error=')
            console.log(error)
            console.log('===getReserveHouses==body=')
            console.log(body)
            callback(false,body);
        } else {
            try{
                const res = JSON.parse(body)
                if(utilsValue.isValid(client)){
                    removeReserveHousesHostData(res.data)
                }
                callback(true,res.data);
            }catch(e){
                callback(false,"data format error: "+body);
            }
        }
    });
}

function editReserveHouseExe(reserveHouse,callback){
    const url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.editReserveHouse;
    const method = 'PUT';
    const headers = {};

    httpRequest.sendJsonRequest(url, headers, reserveHouse, method, (error, body) => {
        if (error) {
            console.log('===editHouse==error=')
            console.log(error)
            console.log('===editHouse==body=')
            console.log(body)
            callback(false,body);
        } else {
            if(body.data.nModified > 0){
                callback(true,'edit success');
            }else{
                callback(false,'no match id');
            }
        }
    });
}

function editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,callback) {
    const reserveHouse = {}
    if (utilsValue.isValid(id)){
        reserveHouse.id = id
    }

    if (utilsValue.isValid(host)){
        reserveHouse.host = host
    }

    if (utilsValue.isValid(houseId)){
        reserveHouse.houseId = houseId
    }

    if (utilsValue.isValid(state)){
        reserveHouse.state = state
    }

    if (utilsValue.isValid(type)){
        reserveHouse.type = type
    }

    if (utilsValue.isValid(clientName)){
        reserveHouse.clientName = clientName
    }

    if (utilsValue.isValid(clientPhone)){
        reserveHouse.clientPhone = clientPhone
    }

    if (utilsValue.isValid(client)){
        reserveHouse.client = client
        user.getUserById(client,false,(result,data)=>{
            if(result == true){
                reserveHouse.clientName = data.name
                reserveHouse.clientPhone = data.phone
                editReserveHouseExe(reserveHouse,callback)
            }else{
                callback(false,data)
            }
            
        })
    }else{
        editReserveHouseExe(reserveHouse,callback)
    }
}


exports.addReserveHouse = addReserveHouse
exports.getReserveHouses = getReserveHouses
exports.getReserveHouse = getReserveHouse
exports.editReserveHouse = editReserveHouse
exports.removeReserveHouse = removeReserveHouse