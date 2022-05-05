const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')

function addHouse(name,city,area,owner,address,houseNumber,floor,room,price,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,callback) {
    const house = {}
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
        const saveDB = []
        for(let i = 0 ; i<photo.length ; i++){
            saveDB.push(path.basename(photo[i]))
        }
        house.photo = saveDB
    }

    if (utilsValue.isValid(annex)){
        const saveDB = []
        for(let i = 0 ; i<annex.length ; i++){
            saveDB.push(path.basename(annex[i]))
        }
        house.annex = saveDB
    }

    if (utilsValue.isValid(remark)){
        house.remark = remark
    }

    const url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.addHouse;
    const method = 'POST';
    const headers = {};
    httpRequest.sendJsonRequest(url, headers, house, method, (error, body) => {
        if (error) {
            console.log('===addHouse==error=')
            console.log(error)
            console.log('===addHouse==body=')
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

function getHouses(start,count,timeSort,priceSort,pingSort,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,minFloor,maxFloor,owner,buildingType,typeOfRental,city,area,parking,pet,manager,garbage,smoke,cook,textQuery,isDelete,callback) {

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

    if(utilsValue.isValid(textQuery)){
        url = url + '&&textQuery='+encodeURIComponent(textQuery)
    }

    if(utilsValue.isValid(owner)){
        url = url + '&&owner='+owner
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

    if(utilsValue.isValid(minFloor)){
        url = url + '&&minFloor='+minFloor 
    }

    if(utilsValue.isValid(maxFloor)){
        url = url + '&&maxFloor='+maxFloor 
    }

    if(utilsValue.isValid(buildingType)){
        url = url + '&&buildingType='+buildingType 
    }

    if(utilsValue.isValid(typeOfRental)){
        url = url + '&&typeOfRental='+typeOfRental 
    }

    if(utilsValue.isValid(city)){
        url = url + '&&city='+encodeURIComponent(city)
    }

    if(utilsValue.isValid(area)){
        url = url + '&&area='+encodeURIComponent(area)
    }

    if(utilsValue.isValid(parking)){
        url = url + '&&parking='+parking 
    }

    if(utilsValue.isValid(pet)){
        url = url + '&&pet='+pet 
    }

    if(utilsValue.isValid(manager)){
        url = url + '&&manager='+manager 
    }

    if(utilsValue.isValid(garbage)){
        url = url + '&&garbage='+garbage 
    }

    if(utilsValue.isValid(smoke)){
        url = url + '&&smoke='+smoke 
    }

    if(utilsValue.isValid(cook)){
        url = url + '&&cook='+cook 
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
        const saveDB = []
        for(let i = 0 ; i<photo.length ; i++){
            saveDB.push(path.basename(photo[i]))
        }
        house.photo = saveDB
    }

    if (utilsValue.isValid(annex)){
        const saveDB = []
        for(let i = 0 ; i<annex.length ; i++){
            saveDB.push(path.basename(annex[i]))
        }
        house.annex = saveDB
    }

    if (utilsValue.isValid(remark)){
        house.remark = remark
    }

    const url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.editHouse;
    const method = 'PUT';
    const headers = {};

    httpRequest.sendJsonRequest(url, headers, house, method, (error, body) => {
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

function mkdirFileFolder(folderPath,callback){
    if(!utilsValue.isValid(folderPath)){
        callback(false)
    }else{
        const photo = 'photo'
        const annex = 'annex'
        const photoFolder = path.join(folderPath,photo)
        const annexFolder = path.join(folderPath,annex)
        utilsFile.mkdir(folderPath,(result)=>{
            if(result){
                utilsFile.mkdir(photoFolder,(result)=>{
                    if(result){
                        utilsFile.mkdir(annexFolder,callback)
                    }else{
                        callback(false)
                    }
                })
            }else{
                callback(false)
            }
        })
    }
}

function moveFile(files,folderName,destFolder,callback){
    if(files.length <= 0){
        callback(true)
    }else{
        const uploadDir = path.join(__dirname, '..', '..', 'uploadTmp');
        const filesMove = []
        for(let i = 0;i<files.length;i++){
            const fileName = path.basename(files[i])
            filesMove.push({
                orgPath : path.join(uploadDir,files[i]),
                distPath : path.join(destFolder, folderName, fileName)
            })
        }
        utilsFile.moveFiles(filesMove,(err,result)=>{
            callback(result)
        })
    }
}

// photo:['1.jpg','2.jpg'],
// annex:['1.jpg'],
//orgPath,filePathArray[i].distPath
function moveFiles(photo,annex,destFolder,callback){
    const photoFolder = 'photo'
    const annexFolder = 'annex'
    moveFile(photo,photoFolder,destFolder,(result)=>{
        if(result){
            moveFile(annex,annexFolder,destFolder,callback)
        }else{
            callback(false)
        }
    })
    
}

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

function getHouse(id,isDelete,callback){
    let url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.getHouse + '?id='+id+'&isDelete='+isDelete
    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            callback(false,'http request house error')
        }else{
            if(body){
                body = JSON.parse(body)
                if(body.status  == true && body.data && body.data.owner){
                    
                    const owner = body.data.owner
                    getUserById(owner,isDelete,(result,msg)=>{
                        if(result){
                            body.data.ownerDetail = msg
                            callback(true,body.data)
                        }else{
                            callback(true,'user format error')
                        }
                        
                    })
                }else{
                    callback(false,'house format error')
                }
            }else{
                callback(false,'house format error')
            }
            
        }
    })
}

exports.addHouse = addHouse
exports.getHouses = getHouses
exports.getHouse = getHouse
exports.removeHouse = removeHouse
exports.editHouse = editHouse
exports.mkdirFileFolder = mkdirFileFolder
exports.moveFiles = moveFiles