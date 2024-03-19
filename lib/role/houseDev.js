const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')
const user = require('./user')

function addHouseDev(name,companyId,status,serviceCharge,city,area,owner,address,saleType,source,hostName,hostPhone,hostGender,remark,callback) {
    const url = config['house-dev-basic-server'].location+'/'+config['house-dev-basic-server'].restApi.addHouseDev;
    const method = 'POST';
    const headers = {};
    const houseDev ={
        name,
        companyId,
        status,
        serviceCharge,
        city,
        area,
        owner,
        address,
        saleType,
        source,
        hostName,
        hostPhone,
        hostGender,
        remark,
    }
    httpRequest.sendJsonRequest(url, headers, houseDev, method, (error, body) => {
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

function getHouseDev(id,isDelete,callback){
    let url = config['house-dev-basic-server'].location+'/'+config['house-dev-basic-server'].restApi.getHouseDev + '?id='+id+'&&isDelete='+isDelete
    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('====error===')
            console.log(error)
            callback(false,'http request house error')
        }else{
            try{
                body = JSON.parse(body)
                callback(true,body.data);
            }catch(e){
                callback(false,"data format error: "+body);
            }
            
        }
    })
}

// function addReserveHouse(client,host,houseId,state,type,clientName,clientPhone,callback) {
//     if(utilsValue.isValid(client)){
//         user.getUserById(client,false,(result,data)=>{
//             if(result == true){
//                 clientName = data.name
//                 clientPhone = data.phone
//                 addReserveHouseExe(client,host,houseId,state,type,clientName,clientPhone,callback)
//             }else{
//                 callback(false,data)
//             }
            
//         })
//     }else{
//         addReserveHouseExe(client,host,houseId,state,type,clientName,clientPhone,callback)
//     }

    
// }

// function removeReserveHouse(ids,callback) {
//     if (utilsValue.isValid(ids)){
//         const url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.removeReserveHouse;
//         const method = 'DELETE';
//         const headers = {};
//         const json = {
//             ids:ids
//         }
//         httpRequest.sendJsonRequest(url, headers, json, method, (error, body) => {
//             if (error) {
//               console.log('===removeReserveHouse==error=')
//               console.log(error)
//               console.log('===removeReserveHouse==body=')
//               console.log(body)
//               callback(false,body);
//             } else {
//                 callback(true,body);
//             }
//           });
//     }else {
//         callback(false, 'id invalid')
//     }
// }





// function removeReserveHousesHostData(data){
//     if(utilsValue.isValid(data)){
//         for(let i = 0 ;i<data.length; i++){
//             removeReserveHouseHostData(data[i].houseData)
//         }
//     }
// }

// function removeReserveHouseHostData(data){
//     if(utilsValue.isValid(data)){
//         for(let i = 0 ;i<data.length; i++){
//             delete data[i].hostName
//             delete data[i].hostPhone
//             delete data[i].hostGender
//         }
//     }
// }

// function getReserveHouses(start,count,host,client,states,type,timeSort,callback) {

//     let url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.getReserveHouses+'?'
//     if(utilsValue.isValid(start)){
//         url = url + 'skip='+start
//     }else{
//         url = url + 'skip='+0
//     }
    
//     if(utilsValue.isValid(count)){
//         url = url + '&&limit='+count
//     }else{
//         url = url + '&&limit='+300
//     }
    
//     if(utilsValue.isValid(host)){
//         url = url + '&&host='+host
//     }

//     if(utilsValue.isValid(client)){
//         url = url + '&&client='+client
//     }

//     if(utilsValue.isValid(states)){
//         url = url + '&&states='+states
//     }

//     if(utilsValue.isValid(type) || type === 0){
//         url = url + '&&type='+type
//     }

//     if(utilsValue.isValid(timeSort)){
//         timeSort = timeSort*1;
//         const sort = {
//             updateTime:timeSort
//         }
//         url = url + '&&sort='+JSON.stringify(sort) 
//     }else{
//         const sort = {
//             updateTime:1
//         }
//         url = url + '&&sort='+JSON.stringify(sort) 
//     }

//     const method = 'GET';
//     const headers = {};
//     httpRequest.sendGetRequest(url, headers, method, (error, body) => {
//         if (error) {
//             console.log('===getReserveHouses==error=')
//             console.log(error)
//             console.log('===getReserveHouses==body=')
//             console.log(body)
//             callback(false,body);
//         } else {
//             try{
//                 const res = JSON.parse(body)
//                 if(utilsValue.isValid(client)){
//                     removeReserveHousesHostData(res.data)
//                 }
//                 callback(true,res.data);
//             }catch(e){
//                 callback(false,"data format error: "+body);
//             }
//         }
//     });
// }

// function editReserveHouseExe(reserveHouse,callback){
//     const url = config['reserve-house-basic-server'].location+'/'+config['reserve-house-basic-server'].restApi.editReserveHouse;
//     const method = 'PUT';
//     const headers = {};

//     httpRequest.sendJsonRequest(url, headers, reserveHouse, method, (error, body) => {
//         if (error) {
//             console.log('===editHouse==error=')
//             console.log(error)
//             console.log('===editHouse==body=')
//             console.log(body)
//             callback(false,body);
//         } else {
//             if(body.data.nModified > 0){
//                 callback(true,'edit success');
//             }else{
//                 callback(false,'no match id');
//             }
//         }
//     });
// }

// function editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,callback) {
//     const reserveHouse = {}
//     if (utilsValue.isValid(id)){
//         reserveHouse.id = id
//     }

//     if (utilsValue.isValid(host)){
//         reserveHouse.host = host
//     }

//     if (utilsValue.isValid(houseId)){
//         reserveHouse.houseId = houseId
//     }

//     if (utilsValue.isValid(state)){
//         reserveHouse.state = state
//     }

//     if (utilsValue.isValid(type)){
//         reserveHouse.type = type
//     }

//     if (utilsValue.isValid(clientName)){
//         reserveHouse.clientName = clientName
//     }

//     if (utilsValue.isValid(clientPhone)){
//         reserveHouse.clientPhone = clientPhone
//     }

//     if (utilsValue.isValid(client)){
//         reserveHouse.client = client
//         user.getUserById(client,false,(result,data)=>{
//             if(result == true){
//                 reserveHouse.clientName = data.name
//                 reserveHouse.clientPhone = data.phone
//                 editReserveHouseExe(reserveHouse,callback)
//             }else{
//                 callback(false,data)
//             }
            
//         })
//     }else{
//         editReserveHouseExe(reserveHouse,callback)
//     }
// }

// function transferReserveHouse(houseId,host,newHost,callback){
//     const start = 0;
//     const count = 9999999;
//     const states = '0,1'
//     const transferReserveHouseList = []
//     getReserveHouses(start,count,host,'',states,'',1,(result,reserveHouses)=>{
//         if(result == true){
//             for(let i = 0 ;i<reserveHouses.length;i++){
//                 if(reserveHouses[i].houseId === houseId){
//                     transferReserveHouseList.push(reserveHouses[i])
//                     editReserveHouse(reserveHouses[i]._id,reserveHouses[i].client,newHost,reserveHouses[i].houseId,reserveHouses[i].state,reserveHouses[i].type,reserveHouses[i].clientName,reserveHouses[i].clientPhone,()=>{})
//                 }
//             }
//             callback(true,'edit reserve house ing')
//         }else{
//             callback(result,reserveHouses)
//         }
//     })
// }

// exports.addReserveHouse = addReserveHouse
// exports.getReserveHouses = getReserveHouses
// exports.getReserveHouse = getReserveHouse
// exports.editReserveHouse = editReserveHouse
// exports.removeReserveHouse = removeReserveHouse
// exports.transferReserveHouse = transferReserveHouse

exports.getHouseDev = getHouseDev