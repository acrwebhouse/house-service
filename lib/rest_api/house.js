exports.on = function(app) {
    const preRestApi = '/house';
    const house = require('../role/house');
    const middleware = require('./middleware').middleware;
    const utilsValue = require('../utils/value');
    const utilsFile = require('../utils/file');
    const path = require('path')
    const config = require('../setting/config').config;
    const nasDir = config.nasDir;
    const restApiResponse = require('../utils/restApiResponse');

    app.post(preRestApi + '/addHouse',[middleware.tokenAuth], function(req, res) {
        /* 
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
          #swagger.parameters['obj'] = {
            in: 'body',
            description: 'add a house',
            schema: {
                name:'文山區好房子',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                houseNumber:{
                    lane:96,
                    alley:2,
                    number1:5,
                    number2:1
                },
                totalFloor:20,
                floor:3,
                floor2:1,
                room:"1001",
                price:6666,
                hostName:"host name",
                hostPhone:"0909636123",
                hostGender:true,
                config:{
                    room:2,
                    livingRoom:1,
                    balcony:1,
                    bathroom:1,
                    buildingType:1
                },
                ping:30,
                parking:true,
                traffic:[{
                    name:'萬芳醫院站',
                    distance:20,
                    type:1
                }],
                life:[{
                    name:'景美夜市',
                    distance:200,
                    type:1
                }],
                educate:[{
                    name:'景美幼稚園',
                    distance:200,
                    type:1
                }],
                saleType:1,
                saleInfo:{
                    pet: true,
                    manager: true,
                    garbage: true,
                    managerPrice:200,
                    garbagePrice:200,
                    smoke:true,
                    cook:true,
                    typeOfRental:1,
                    devices : [true,false,false,false,false,true,false,false,false,true,false,false,false,false]
                },
                photo:['1.jpg','2.jpg'],
                annex:['1.jpg'],
                remark:'test',
                belongType:1,
                belongId:'61ed2777f5178ce385654350',
                isRoofAnnex: false
            }
        }
        */

        const response = {
            'status':true,
            'data':''
        }

        const name = req.body.name
        const city = req.body.city
        const area = req.body.area
        const owner = req.body.owner
        const address = req.body.address
        const houseNumber = req.body.houseNumber
        const totalFloor = req.body.totalFloor
        const floor = req.body.floor
        const floor2 = req.body.floor2
        const room = req.body.room
        const price = req.body.price
        const houseConfig = req.body.config
        const ping = req.body.ping
        const parking = req.body.parking
        const traffic = req.body.traffic
        const life = req.body.life
        const educate = req.body.educate
        const saleType = req.body.saleType
        const saleInfo = req.body.saleInfo
        const photo = req.body.photo
        const annex = req.body.annex
        const remark = req.body.remark
        const hostName = req.body.hostName
        const hostPhone = req.body.hostPhone
        const hostGender = req.body.hostGender
        const belongType = req.body.belongType
        const belongId = req.body.belongId
        const isRoofAnnex = req.body.isRoofAnnex
        let companyId = ''
        if(belongType === 2){
            companyId = belongId
        }
        house.addHouse(name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,(result,data)=>{
            response.status = result;
            response.data = data
            if(result && utilsValue.isValid(data._id)){
                const id = data._id
                const folderPath = path.join(nasDir,id)
                house.mkdirFileFolder(folderPath,(result)=>{
                    if(result){
                        house.moveFiles(photo,annex,folderPath,(result)=>{
                            if(result){
                                res.send(response);
                                house.watermarkJob(photo,folderPath,companyId,()=>{})
                            }else{
                                response.status = false;
                                response.data = 'move annex or photo fail'
                                res.send(response);
                            }
                        })
                        
                    }else{
                        response.status = false;
                        response.data = 'create '+folderPath+' fail'
                        res.send(response);
                    }
                })
            }else{
                if(utilsValue.isValid(data.errorMessage)){
                    const errorResponse = restApiResponse.createByData(data.errorMessage)
                    errorResponse.data = data
                    res.send(errorResponse);
                }else{
                    res.send(response);
                }
            }
            
        })
        
    });

    app.post(preRestApi + '/uploadHousePhoto',[middleware.tokenAuth], function(req, res) {
        /* 
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['photo'] = {
                in: 'formData',
                type: 'array',
                required: true,
                description: 'house photo',
                collectionFormat: 'multi',
                items: { type: 'file' }
            }     
        */
        const response = {
            'status':true,
            'data':[]
        }
        const dir = utilsValue.getUUID()
        const uploadDir = path.join(__dirname, '..', '..', 'uploadTmp',dir);
        utilsFile.mkdir(uploadDir,(result)=>{
            if(result == true){
                utilsFile.getUploadFiles(req, uploadDir,'photo',(result,files)=>{
                    const filePath = [];
                    const outputPath = []
                    for(let i = 0 ;i<files.length;i++){
                        const orgPath = files[i].path
                        const distPath = path.join(files[i].destination,files[i].originalname)
                        const localPath = path.join(dir,files[i].originalname)
                        const item = {
                            orgPath,
                            distPath
                        }
                        filePath.push(item)
                        outputPath.push(localPath)
                    }
                    if(filePath.length==0){
                        res.send(response)
                    }else{
                        utilsFile.moveFiles(filePath,(err,result)=>{
                            if(result == true){
                                response.data = outputPath
                                res.send(response)
                            }else{
                                response.status = false
                                response.data = 'move file fail'
                                res.send(response)
                            }
                        })
                    }
                })
            }else{
                response.status = false
                response.data = 'mkdir fail'
                res.send(response)
            }
        })
    })

    app.post(preRestApi + '/uploadHouseAnnex',[middleware.tokenAuth], function(req, res) {
        /* 
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['annex'] = {
                in: 'formData',
                type: 'array',
                required: true,
                description: 'house annex',
                collectionFormat: 'multi',
                items: { type: 'file' }
            }     
        */
        const response = {
            'status':true,
            'data':[]
        }
        const dir = utilsValue.getUUID()
        const uploadDir = path.join(__dirname, '..', '..', 'uploadTmp',dir);
        utilsFile.mkdir(uploadDir,(result)=>{
            if(result == true){
                utilsFile.getUploadFiles(req, uploadDir,'annex',(result,files)=>{
                    const filePath = [];
                    const outputPath = []
                    for(let i = 0 ;i<files.length;i++){
                        const orgPath = files[i].path
                        const distPath = path.join(files[i].destination,files[i].originalname)
                        const localPath = path.join(dir,files[i].originalname)
                        const item = {
                            orgPath,
                            distPath
                        }
                        filePath.push(item)
                        outputPath.push(localPath)
                    }
                    if(filePath.length==0){
                        res.send(response)
                    }else{
                        utilsFile.moveFiles(filePath,(err,result)=>{
                            if(result == true){
                                response.data = outputPath
                                res.send(response)
                            }else{
                                response.status = false
                                response.data = 'move file fail'
                                res.send(response)
                            }
                        })
                    }
                })
            }else{
                response.status = false
                response.data = 'mkdir fail'
                res.send(response)
            }
        })
    })

    app.get(preRestApi + '/getHouses', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }],
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        */

        const start = req.query.start
        const count = req.query.count
        const timeSort = req.query.timeSort
        const priceSort = req.query.priceSort
        const pingSort = req.query.pingSort
        const isDelete = req.query.isDelete
        const minPrice = req.query.minPrice
        const maxPrice = req.query.maxPrice
        const minPing = req.query.minPing
        const maxPing = req.query.maxPing
        const minRoom = req.query.minRoom
        const maxRoom = req.query.maxRoom
        const minFloor = req.query.minFloor
        const maxFloor = req.query.maxFloor
        const buildingType = req.query.buildingType
        const city = req.query.city
        const area = req.query.area
        //特色
        const parking = req.query.parking
        const pet = req.query.pet
        const manager = req.query.manager
        const garbage = req.query.garbage
        const smoke = req.query.smoke
        const cook = req.query.cook
        const textQuery = req.query.textQuery
        //類型
        const typeOfRental = req.query.typeOfRental
        const owner = req.query.owner

        //歸屬
        const belongType = req.query.belongType
        const belongId = req.query.belongId

        const response = {
            'status':true,
            'data':''
        }
        house.getHouses(start,count,timeSort,priceSort,pingSort,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,minFloor,maxFloor,owner,buildingType,typeOfRental,city,area,parking,pet,manager,garbage,smoke,cook,textQuery,belongType,belongId,isDelete,(result,data)=>{
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeHouse',[middleware.tokenAuth], function(req, res) {
        /*
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
             in: 'body',
             description: 'Remove a housees',
             schema: {
                 ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
             }
         }*/ 
         const ids = req.body.ids
         const response = {
             'status':true,
             'data':''
         }
         house.removeHouse(ids,(result,data)=> {
             response.status = result;
             response.data = data
             res.send(response);
         })
     });

    app.put(preRestApi + '/editHouse',[middleware.tokenAuth], function(req, res) {
        /* #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a house',
            schema: {
                id:'61ed2777f5178ce385654350',
                name:'文山區好房子',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                houseNumber:{
                    lane:96,
                    alley:2,
                    number1:5,
                    number2:1
                },
                totalFloor:20,
                floor:3,
                floor2:1,
                room:"1001",
                price:6666,
                hostName:"host name",
                hostPhone:"0909636123",
                hostGender:true,
                config:{
                    room:2,
                    livingRoom:1,
                    balcony:1,
                    bathroom:1,
                    buildingType:1
                },
                ping:30,
                parking:true,
                traffic:[{
                    name:'萬芳醫院站',
                    distance:20,
                    type:1
                }],
                life:[{
                    name:'景美夜市',
                    distance:200,
                    type:1
                }],
                educate:[{
                    name:'景美幼稚園',
                    distance:200,
                    type:1
                }],
                saleType:1,
                saleInfo:{
                    pet: true,
                    manager: true,
                    garbage: true,
                    managerPrice:200,
                    garbagePrice:200,
                    smoke:true,
                    cook:true,
                    typeOfRental:1,
                    devices : [true,false,false,false,false,true,false,false,false,true,false,false,false,false]
                },
                photo:['1.jpg','2.jpg'],
                annex:['1.jpg'],
                remark:'test',
                belongType:1,
                belongId:'61ed2777f5178ce385654350',
                isRoofAnnex:false
            }
        }
        */

        const response = {
            'status':true,
            'data':''
        }

        const id = req.body.id
        const name = req.body.name
        const city = req.body.city
        const area = req.body.area
        const owner = req.body.owner
        const address = req.body.address
        const houseNumber = req.body.houseNumber
        const totalFloor = req.body.totalFloor
        const floor = req.body.floor
        const floor2 = req.body.floor2
        const room = req.body.room
        const price = req.body.price
        const houseConfig = req.body.config
        const ping = req.body.ping
        const parking = req.body.parking
        const traffic = req.body.traffic
        const life = req.body.life
        const educate = req.body.educate
        const saleType = req.body.saleType
        const saleInfo = req.body.saleInfo
        const photo = req.body.photo
        const annex = req.body.annex
        const remark = req.body.remark
        const hostName = req.body.hostName
        const hostPhone = req.body.hostPhone
        const hostGender = req.body.hostGender
        const belongType = req.body.belongType
        const belongId = req.body.belongId
        const isRoofAnnex = req.body.isRoofAnnex
        house.editHouseAndSendEditHouseNotifyMail(id,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,houseConfig,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,(result,data)=>{
            const newPhoto = [];
            const newAnnex = [];
            for(let i = 0 ;i<photo.length;i++){
                if(photo[i].indexOf('/')>=0){
                    newPhoto.push(photo[i])
                }
            }
            for(let i = 0 ;i<annex.length;i++){
                if(annex[i].indexOf('/')>=0){
                    newAnnex.push(annex[i])
                }
            }

            response.status = result;
            response.data = data
            if(utilsValue.isValid(id)){
                const path = require('path')
                const folderPath = path.join(nasDir,id)
                house.moveFiles(newPhoto,newAnnex,folderPath,(result)=>{
                    if(result){
                        res.send(response);
                    }else{
                        response.status = false;
                        response.data = 'move annex or photo fail'
                        res.send(response);
                    }
                })
            }else{
                if(utilsValue.isValid(data.errorMessage)){
                    const errorResponse = restApiResponse.createByData(data.errorMessage)
                    errorResponse.data = data
                    res.send(errorResponse);
                }else{
                    res.send(response);
                }
            }



        })

    });

    app.get(preRestApi + '/getHouse', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }],
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        */

        const id = req.query.id
        const isDelete = req.query.isDelete
        
        house.getHouse(id,isDelete,(result,data)=>{
            const response = {
                'status':result,
                'data':data
            }
            res.send(response)
        })
    })
}