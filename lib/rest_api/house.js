exports.on = function(app) {
    const preRestApi = '/house';
    const house = require('../role/house');
    const middleware = require('./middleware').middleware;
    const utilsValue = require('../utils/value');
    const utilsFile = require('../utils/file');
    const path = require('path')

    // app.post(preRestApi + '/addHouse',[middleware.tokenAuth], function(req, res) {
    app.post(preRestApi + '/addHouse', function(req, res) {
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


          console.log(req.files)

        const response = {
            'status':true,
            'data':''
        }
        const token = req.headers['x-token']
        // const decodeToken = utilsValue.jwtDecode(token)
        // const id = decodeToken.id
        // console.log(id)
        const files = req.files;
        // console.log(files)
        console.log(req)

        const multer = require('multer');
        const uploadDir = path.join(__dirname, '..', '..', 'uploadTmp');
        
        res.send('123')
        
        utilsFile.getUploadFiles(req, uploadDir,'photo',(result,filePath)=>{
            console.log('======result====')
            console.log(result)
            console.log('======filePath====')
            console.log(filePath)
        })
        
        // house.addHouse(id,(result,data)=>{
        //     response.status = result;
        //     response.data = data
        //     res.send(response);
        // })
        
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

    app.get(preRestApi + '/getHouses',[middleware.tokenAuth], function(req, res) {

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

        const response = {
            'status':true,
            'data':''
        }
        house.getHouses(start,count,timeSort,priceSort,pingSort,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,isDelete,(result,data)=>{
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeHouse', function(req, res) {
        /*#swagger.parameters['obj'] = {
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

    // app.put(preRestApi + '/editUser',[middleware.tokenAuth , middleware.checkCanEdit], function(req, res) {
    //     /* #swagger.security = [{
    //            "apiKeyAuth": []
    //     }] 
    //     #swagger.parameters['obj'] = {
    //         in: 'body',
    //         description: 'Edit a user',
    //         schema: {
    //             id: '61ed2777f5178ce385654350',
    //             account: 'a123456789',
    //             password: 123456,
    //             name: 'Chris',
    //             gender: true,
    //             roles: [1,2,3,4],
    //             rolesInfo: {
    //                 admin:{},
    //                 host:{},
    //                 user:{},
    //                 sales:{},
    //             },
    //             houseIds:[],
    //             phone: '0909666666',
    //             mail: 'acr.webhouse@gmail.com',
    //             address: '台北市文山區興隆路六段66號6樓'
    //         }
    //     }
    //     */

    //     const response = {
    //         'status':true,
    //         'data':''
    //     }

    //     const id = req.body.id
    //     const account = req.body.account
    //     const password = req.body.password
    //     const name = req.body.name
    //     const gender = req.body.gender
    //     const roles = req.body.roles
    //     const rolesInfo = req.body.rolesInfo
    //     const houseIds = req.body.houseIds
    //     const phone = req.body.phone
    //     const mail = req.body.mail
    //     const address = req.body.address

    //     user.editUser(id,account,password,name,gender,roles,rolesInfo,houseIds,phone,mail,address,(result,data)=>{
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });

    // app.delete(preRestApi + '/removeUser',[middleware.tokenAuth,middleware.checkIsAdmin], function(req, res) {
    //      /*
    //      #swagger.security = [{
    //            "apiKeyAuth": []
    //     }]
    //      #swagger.parameters['obj'] = {
    //         in: 'body',
    //         description: 'Remove a user',
    //         schema: {
    //             ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
    //         }
    //     }*/

    //     const ids = req.body.ids
    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     user.removeUser(ids,(result,data)=>{
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });
}