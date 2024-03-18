exports.on = function(app) {
    const preRestApi = '/houseDev';
    const reserveHouse = require('../role/reserveHouse');
    const notification = require('../role/notification');
    const middleware = require('./middleware').middleware;
    const utilsValue = require('../utils/value');
    const config = require('../setting/config').config;
    app.post(preRestApi + '/addHouseDev', function(req, res) {
        /* 
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
          #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a houseDev',
            schema: {
                name:'文山區好房子',
                companyId: '61ed2777f5178ce385654350',
                status: 0,
                serviceCharge:'半個月',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                saleType:1,
                source:'591租屋',
                hostName:'王大明',
                hostPhone:'0939520012',
                hostGender:true,
                remark:'備註內容'
            }
        }
        */

        const response = {
            'status':true,
            'data':''
        }

        // const host = req.body.host
        // const houseId = req.body.houseId
        // const state = req.body.state
        // const type = req.body.type
        // let client = ''
        // const clientName = req.body.clientName
        // const clientPhone = req.body.clientPhone
        // const token = req.headers['x-token']
        // if(utilsValue.isValid(token)){
        //     const decodeToken = utilsValue.jwtDecode(token)
        //     const id = decodeToken.id
        //     if(utilsValue.isValid(id)){
        //         client = id;
        //     }
        // }
        // reserveHouse.addReserveHouse(client,host,houseId,state,type,clientName,clientPhone,(result,data)=>{
        //     response.status = result;
        //     response.data = data
        //     res.send(response)
        //     if(result == true){
        //         notification.reserveHouseNotification(clientName,client,houseId,host,data._id,()=>{               
        //         })
        //     }
        // })
      
        
    });

    app.get(preRestApi + '/getHouseDev', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        #swagger.parameters['isDelete'] = {
             in: 'query',
             type: 'boolean',
         }
        */

        // const start = req.query.start
        // const count = req.query.count
        // const token = req.headers['x-token']
        // const decodeToken = utilsValue.jwtDecode(token)
        // const host = decodeToken.id
        // const state = req.query.state
        // const type = req.query.type
        // const timeSort = req.query.timeSort
 
        // const response = {
        //     'status':true,
        //     'data':''
        // }
        // if(utilsValue.isValid(host)){
        //     reserveHouse.getReserveHouses(start,count,host,'',state,type,timeSort,(result,data)=>{
        //         response.status = result;
        //         response.data = data
        //         res.send(response);
        //     })
        // }else{
        //     response.status = false
        //     response.data = 'host is invalid'
        //     res.send(response);
        // }
    });

    app.get(preRestApi + '/getHouseDevList', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        */

        // const start = req.query.start
        // const count = req.query.count
        // const token = req.headers['x-token']
        // const decodeToken = utilsValue.jwtDecode(token)
        // const client = decodeToken.id
        // let state = req.query.state
        // const type = req.query.type
        // const timeSort = req.query.timeSort
        
        // if(!utilsValue.isValid(state)){
        //     state = '0,1,2'
        // }

        // const response = {
        //     'status':true,
        //     'data':''
        // }
        // if(utilsValue.isValid(client)){
        //     reserveHouse.getReserveHouses(start,count,'',client,state,type,timeSort,(result,data)=>{
        //         response.status = result;
        //         response.data = data
        //         res.send(response);
        //     })
        // }else{
        //     response.status = false
        //     response.data = 'client is invalid'
        //     res.send(response);
        // }
    });

    app.delete(preRestApi + '/removeHouseDev', function(req, res) {
        /*
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
             in: 'body',
             description: 'Remove reserve housees',
             schema: {
                 ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
             }
         }*/ 
         const ids = req.body.ids
         const response = {
             'status':true,
             'data':''
         }
        //  reserveHouse.removeReserveHouse(ids,(result,data)=> {
        //      response.status = result;
        //      response.data = data
        //      res.send(response);
        //  })
     });

    app.put(preRestApi + '/editHouseDev', function(req, res) {
        /* #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a house dev',
            schema: {
                id:'61ed2777f5178ce385654350',
                name:'文山區好房子',
                companyId: '61ed2777f5178ce385654350',
                status: 0,
                serviceCharge:'半個月',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                saleType:1,
                source:'591租屋',
                hostName:'王大明',
                hostPhone:'0939520012',
                hostGender:true,
                remark:'備註內容'
            }
        }
        */

        const response = {
            'status':true,
            'data':''
        }

        // const id = req.body.id
        // const client = req.body.client
        // const host = req.body.host
        // const token = req.headers['x-token']
        // const decodeToken = utilsValue.jwtDecode(token)
        // const userId = decodeToken.id
        // const houseId = req.body.houseId
        // const state = req.body.state
        // const type = req.body.type
        // const clientName = req.body.clientName
        // const clientPhone = req.body.clientPhone

        // reserveHouse.getReserveHouse(id,false,(result,data)=>{
        //     if(result == true){
        //         if(data.host === host && host === userId){
        //             reserveHouse.editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,(result,data)=>{
        //                 response.status = result;
        //                 response.data = data
        //                 res.send(response)
        //             })
        //         }
        //         else if(data.client === client && client === userId){
        //             reserveHouse.editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,(result,data)=>{
        //                 response.status = result;
        //                 response.data = data
        //                 res.send(response)
        //             })
        //         }
        //         else{
        //             response.status = false;
        //             response.data = 'user is not host or client'
        //             res.send(response)
        //         }
        //     }else{
        //         response.status = result;
        //         response.data = data
        //         res.send(response)
        //     }
        // })

        

    });

}