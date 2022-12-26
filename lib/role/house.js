const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const utilsFile = require('../utils/file');
const httpRequest = require('../utils/httpRequest');
const path = require('path')
const user = require('./user')
const smtp = require('./smtp')
const employees = require('./employees')
const transaction = require('./transaction')
const errorMessage = require('../utils/error').message;

function addHouse(name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,callback) {
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
    if (utilsValue.isValid(totalFloor)){
        house.totalFloor = totalFloor
    }
    if (utilsValue.isValid(floor)){
        house.floor = floor
    }
    if (utilsValue.isValid(floor2)){
        house.floor2 = floor2
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

    if (utilsValue.isValid(hostName)){
        house.hostName = hostName
    }

    if (utilsValue.isValid(hostPhone)){
        house.hostPhone = hostPhone
    }

    if (utilsValue.isValid(hostGender)){
        house.hostGender = hostGender
    }else if(hostGender == false){
        house.hostGender = hostGender
    }

    if (utilsValue.isValid(belongType)){
        house.belongType = belongType
    }else{
        house.belongType = 1
    }

    if (utilsValue.isValid(belongId)){
        house.belongId = belongId
    }else{
        house.belongId = owner
    }

    if (utilsValue.isValid(isRoofAnnex)){
        house.isRoofAnnex = isRoofAnnex
    }else if(isRoofAnnex == false){
        house.isRoofAnnex = isRoofAnnex
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
            if(body.status === false){
                if(utilsValue.isValid(body.data)){
                    if(body.data.indexOf(errorMessage.houseAddressIsExist)>=0){
                        const houseId = body.data.split(':')[1];
                        getHouse(houseId,false,(result,data)=>{
                            if(result === true){
                                const ownerDetail = data.ownerDetail
                                const errorResponse = {
                                    errorMessage : errorMessage.houseAddressIsExist,
                                    errorInfo :{
                                        name :'',
                                        gender : true,
                                        phone :''
                                    }
                                }
                                if(utilsValue.isValid(ownerDetail)){
                                    errorResponse.errorInfo ={
                                        name:ownerDetail.name,
                                        gender:ownerDetail.gender,
                                        phone:ownerDetail.phone,
                                    }
                                }
                                callback(false,errorResponse);
                            }else{
                                callback(false,errorMessage.unKnowError);
                            }
                        })
                    }else{
                        callback(false,body.data);
                    }
                }else{
                    callback(false,body);
                }
            }
            else if (utilsValue.isValid(body.data.result)){
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

function getHouses(start,count,timeSort,priceSort,pingSort,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,minFloor,maxFloor,owner,buildingType,typeOfRental,city,area,parking,pet,manager,garbage,smoke,cook,textQuery,belongType,belongId,isDelete,callback) {

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

    if(utilsValue.isValid(belongType)){
        url = url + '&&belongType='+belongType 
    }

    if(utilsValue.isValid(belongId)){
        url = url + '&&belongId='+belongId 
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

function editHouse(id,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,callback) {
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
    if (utilsValue.isValid(totalFloor)){
        house.totalFloor = totalFloor
    }
    if (utilsValue.isValid(floor)){
        house.floor = floor
    }
    if (utilsValue.isValid(floor2)){
        house.floor2 = floor2
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

    if (utilsValue.isValid(hostName)){
        house.hostName = hostName
    }

    if (utilsValue.isValid(hostPhone)){
        house.hostPhone = hostPhone
    }

    if (utilsValue.isValid(hostGender)){
        house.hostGender = hostGender
    }else if(hostGender == false){
        house.hostGender = hostGender
    }

    if (utilsValue.isValid(belongType)){
        house.belongType = belongType
    }else{
        house.belongType = 1
    }

    if (utilsValue.isValid(belongId)){
        house.belongId = belongId
    }else{
        house.belongId = owner
    }

    if (utilsValue.isValid(isRoofAnnex)){
        house.isRoofAnnex = isRoofAnnex
    }else if(isRoofAnnex == false){
        house.isRoofAnnex = isRoofAnnex
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

function endEditHouseNotifyMail(owner,orgHouse,editHouse,callback){
    const companyId = orgHouse.belongId
    employees.getEmployeesByUserId(owner,(result,data)=>{
        if(result === true){
            let send = false
            let managerData = []
            let userData = []
            for(let i = 0 ;i<data.length; i++){
                if(data[i].companyId === companyId){
                    if(data[i].managerData.length > 0){
                        send = true
                        managerData = data[i].managerData[0]
                        userData = data[i].userData[0]
                    }
                    i = data.length
                }
            }
            if(send === true){
                smtp.sendEditHouseNotifyMail(managerData.mail,managerData.name,userData.name,orgHouse,editHouse,callback)
            }else{
                callback(true,'no manager can send')
            }
        }else{
            callback(false,'no employee data')
        }
    })
}

function editHouseAndSendEditHouseNotifyMail(id,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,callback){
    getHouse(id,false,(result,data)=>{
        if(result === true){
            const orgHouse = data
            editHouse(id,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,(result,data)=>{
                if(result === true){
                    const editHouse = {
                        _id : id ,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,config :houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex
                    }
                    if(orgHouse.belongType === 2){
                        endEditHouseNotifyMail(owner,orgHouse,editHouse,()=>{})
                    }
                    callback(true,data)
                }else{
                    callback(false,data)
                }
            })
        }else{
            callback(false,data)
        }
    })
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

function getHouse(id,isDelete,callback){
    let url = config['house-basic-server'].location+'/'+config['house-basic-server'].restApi.getHouse + '?id='+id+'&isDelete='+isDelete
    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('====error===')
            console.log(error)
            callback(false,'http request house error')
        }else{
            if(body){
                body = JSON.parse(body)
                if(body.status  == true && body.data && body.data.owner){
                    
                    const owner = body.data.owner
                    user.getUserById(owner,isDelete,(result,msg)=>{
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


function sendWatermarkAddJob(input,output,callback) {
    const nasCount = config.nasDir.length+1;
    input = input.substr(nasCount)
    output = output.substr(nasCount)
    const job = {
        type : 0,
        info : {
            input,
            output
        }
    }
    const url = config['job-basic-server'].location+'/'+config['job-basic-server'].restApi.addJob;
    const method = 'POST';
    const headers = {};
    httpRequest.sendJsonRequest(url, headers, job, method, (error, body) => {
        if (error) {
            console.log('===sendWatermarkAddJob==error=')
            console.log(error)
            console.log('===sendWatermarkAddJob==body=')
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


function watermarkJob(photo,folderPath,callback){
    const photoPath = path.join(folderPath,'photo')
    const originPath = path.join(photoPath,'origin');
    utilsFile.mkdir(originPath,(result)=>{
        if(result == true){
            const filesCopy = []
            for(let i = 0;i<photo.length;i++){
                const fileName = path.basename(photo[i])
                filesCopy.push({
                    orgPath : path.join(photoPath,fileName),
                    distPath : path.join(originPath, fileName)
                })
            }
            utilsFile.copyFiles(filesCopy,(err,result)=>{
                if(result == true){
                    sendWatermarkAddJob(originPath,photoPath,callback)
                }else{
                    callback(false,'copyFiles fail')
                }
            })
        }
    })   
}

function dealHouse(id,userId,companyId,actualPrice,serviceCharge,startRentDate,endRentDate,callback){
    const removeHouses = [id];
    transaction.addTransaction(id,userId,companyId,actualPrice,serviceCharge,startRentDate,endRentDate,(result,data)=>{
        if(result == true){
            removeHouse(removeHouses,callback)
        }else{
            callback(false, data)
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
exports.watermarkJob = watermarkJob
exports.dealHouse = dealHouse
exports.editHouseAndSendEditHouseNotifyMail = editHouseAndSendEditHouseNotifyMail