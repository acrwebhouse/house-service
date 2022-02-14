const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const httpRequest = require('../utils/httpRequest');

// function getPersonalInfo(id,callback) {
//     if (utilsValue.isValid(id)){
//         const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.getUser + '?id='+id+'&&isDelete=false';
//         const method = 'GET';
//         const headers = {};
//         httpRequest.sendGetRequest(url, headers, method, (error, body) => {
//             if (error) {
//                 console.log('===getPersonalInfo==error=')
//                 console.log(error)
//                 console.log('===getPersonalInfo==body=')
//                 console.log(body)
//                 callback(false,body);
//             } else {
//                 try{
//                     const res = JSON.parse(body)
//                     callback(true,res.data);
//                 }catch(e){
//                     callback(false,"data format error: "+body);
//                 }
//             }
//           });
//     }else {
//         callback(false, 'id invalid')
//     }
// }

// function removeUser(ids,callback) {
//     if (utilsValue.isValid(ids)){
//         const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.removeUser;
//         const method = 'DELETE';
//         const headers = {};
//         const json = {
//             ids:ids
//         }
//         httpRequest.sendJsonRequest(url, headers, json, method, (error, body) => {
//             if (error) {
//               console.log('===removeUser==error=')
//               console.log(error)
//               console.log('===removeUser==body=')
//               console.log(body)
//               callback(false,body);
//             } else {
//               if(body.data.nModified > 0){
//                 callback(true,'remove '+body.data.nModified+' account');
//               }else{
//                 callback(false,'no match id');
//               }
//             }
//           });
//     }else {
//         callback(false, 'id invalid')
//     }
// }

function addHouse(){

}

function getHouses(start,count,timeSort,priceSort,pingSort,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,isDelete,callback) {

    let url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.getHouses + '?isDelete='+isDelete
    if(utilsValue.isValid(start)){
        url = url + '&&skip='+start
    }
    if(utilsValue.isValid(count)){
        url = url + '&&limit='+count
    }
    if(utilsValue.isValid(minPrice)){
        url = url + '&&minPrice='+minPrice
    }
    if(utilsValue.isValid(maxPrice)){
        url = url + '&&maxPrice='+maxPrice
    }
    if(utilsValue.isValid(minPing)){
        url = url + '&&minPing='+minPing
    }
    if(utilsValue.isValid(maxPing)){
        url = url + '&&maxPing='+maxPing
    }
    if(utilsValue.isValid(minRoom)){
        url = url + '&&minRoom='+minRoom
    }
    if(utilsValue.isValid(maxRoom)){
        url = url + '&&maxRoom='+maxRoom
    }

    if(utilsValue.isValid(priceSort)){
        priceSort = priceSort*1;
        const sort = {
            price:priceSort
        }
        url = url + '&&sort='+JSON.stringify(sort) 
    }

    if(utilsValue.isValid(pingSort)){
        pingSort = pingSort*1;
        const sort = {
            ping:pingSort
        }
        url = url + '&&sort='+JSON.stringify(sort) 
    }

    if(utilsValue.isValid(timeSort)){
        timeSort = timeSort*1;
        const sort = {
            updateTime:timeSort
        }
        url = url + '&&sort='+JSON.stringify(sort) 
    }

    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('===getHouses==url=')
            console.log(url)
            console.log('===getHouses==error=')
            console.log(error)
            console.log('===getHouses==body=')
            console.log(body)
            callback(false,body);
        } else {
            try{
                const res = JSON.parse(body)
                callback(true,res.data);
            }catch(e){
                callback(false,"data format error: "+body);
            }
        }
    });
}

function removeHouse(ids,callback) {
    if (utilsValue.isValid(ids)){
        const url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.removeHouse;
        const method = 'DELETE';
        const headers = {};
        const json = {
            ids:ids
        }
        httpRequest.sendJsonRequest(url, headers, json, method, (error, body) => {
            if (error) {
              console.log('===removeHouse==error=')
              console.log(error)
              console.log('===removeHouse==body=')
              console.log(body)
              callback(false,body);
            } else {
              if(body.data.nModified > 0){
                callback(true,'remove '+body.data.nModified+' house');
              }else{
                callback(false,'no match id');
              }
            }
          });
    }else {
        callback(false, 'id invalid')
    }
}

function editHouse(id,name,city,area,owner,address,houseNumber,floor,room,price,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,callback) {
    const house = {}
    if (utilsValue.isValid(id)){
        house.id = id
    }
    if (utilsValue.isValid(name)){
        house.name = name
    }
    if (utilsValue.isValid(city)){
        house.city = city
    }
    if (utilsValue.isValid(area)){
        house.area = area
    }
    if (utilsValue.isValid(owner)){
        house.owner = owner
    }
    if (utilsValue.isValid(address)){
        house.address = address
    }
    if (utilsValue.isValid(houseNumber)){
        house.houseNumber = houseNumber
    }
    if (utilsValue.isValid(floor)){
        house.floor = floor
    }
    if (utilsValue.isValid(room)){
        house.room = room
    }
    if (utilsValue.isValid(price)){
        house.price = price
    }
    if (utilsValue.isValid(houseConfig)){
        house.config = houseConfig
    }
    if (utilsValue.isValid(ping)){
        house.ping = ping
    }
    
    if (utilsValue.isValid(parking)){
        house.parking = parking
    }

    if (utilsValue.isValid(traffic)){
        house.traffic = traffic
    }

    if (utilsValue.isValid(life)){
        house.life = life
    }

    if (utilsValue.isValid(educate)){
        house.educate = educate
    }

    if (utilsValue.isValid(saleType)){
        house.saleType = saleType
    }

    if (utilsValue.isValid(saleInfo)){
        house.saleInfo = saleInfo
    }

    if (utilsValue.isValid(photo)){
        house.photo = photo
    }

    if (utilsValue.isValid(annex)){
        house.annex = annex
    }

    if (utilsValue.isValid(remark)){
        house.remark = remark
    }

    const url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.editHouse;
    const method = 'PUT';
    const headers = {};

    httpRequest.sendJsonRequest(url, headers, house, method, (error, body) => {
        if (error) {
            console.log('===editUser==error=')
            console.log(error)
            console.log('===editUser==body=')
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

exports.addHouse = addHouse
exports.getHouses = getHouses
exports.removeHouse = removeHouse
exports.editHouse = editHouse