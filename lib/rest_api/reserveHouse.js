exports.on = function(app) {
    const preRestApi = '/reserveHouse';
    const reserveHouse = require('../role/reserveHouse');
    const notification = require('../role/notification');
    const middleware = require('./middleware').middleware;
    const utilsValue = require('../utils/value');
    const config = require('../setting/config').config;
    app.post(preRestApi + '/addReserveHouse', function(req, res) {
        /* 
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
          #swagger.parameters['obj'] = {
            in: 'body',
            description: 'add a reserveHouse',
            schema: {
                host:'61ed2777f5178ce385654351',
                houseId:'61ed2777f5178ce385654352',
                state: 0,
                type:1,
                clientName:'Chris',
                clientPhone:'0909636123'
            }
        }
        */

        const response = {
            'status':true,
            'data':''
        }

        const host = req.body.host
        const houseId = req.body.houseId
        const state = req.body.state
        const type = req.body.type
        let client = ''
        const clientName = req.body.clientName
        const clientPhone = req.body.clientPhone
        const token = req.headers['x-token']
        if(utilsValue.isValid(token)){
            const decodeToken = utilsValue.jwtDecode(token)
            const id = decodeToken.id
            if(utilsValue.isValid(id)){
                client = id;
            }
        }
        reserveHouse.addReserveHouse(client,host,houseId,state,type,clientName,clientPhone,(result,data)=>{
            response.status = result;
            response.data = data
            res.send(response)
            if(result == true){
                notification.reserveHouseNotification(clientName,client,houseId,host,data._id,()=>{               
                })
            }
        })
      
        
    });

    app.get(preRestApi + '/getReserveHousesOnlyHost', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        */

        const start = req.query.start
        const count = req.query.count
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const host = decodeToken.id
        const state = req.query.state
        const type = req.query.type
        const timeSort = req.query.timeSort
 
        const response = {
            'status':true,
            'data':''
        }
        if(utilsValue.isValid(host)){
            reserveHouse.getReserveHouses(start,count,host,'',state,type,timeSort,(result,data)=>{
                response.status = result;
                response.data = data
                res.send(response);
            })
        }else{
            response.status = false
            response.data = 'host is invalid'
            res.send(response);
        }
    });

    app.get(preRestApi + '/getReserveHousesOnlyClient', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        */

        const start = req.query.start
        const count = req.query.count
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const client = decodeToken.id
        let state = req.query.state
        const type = req.query.type
        const timeSort = req.query.timeSort
        
        if(!utilsValue.isValid(state)){
            state = '0,1,2'
        }

        const response = {
            'status':true,
            'data':''
        }
        if(utilsValue.isValid(client)){
            reserveHouse.getReserveHouses(start,count,'',client,state,type,timeSort,(result,data)=>{
                response.status = result;
                response.data = data
                res.send(response);
            })
        }else{
            response.status = false
            response.data = 'client is invalid'
            res.send(response);
        }
    });

    app.delete(preRestApi + '/removeReserveHouse', function(req, res) {
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
         reserveHouse.removeReserveHouse(ids,(result,data)=> {
             response.status = result;
             response.data = data
             res.send(response);
         })
     });

    app.put(preRestApi + '/editReserveHouse', function(req, res) {
        /* #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a reserve house',
            schema: {
                "id": "61ed2777f5178ce385654350",
                "client": "61ed2777f5178ce385654350",
                "houseId": "61ed2777f5178ce385654352",
                "state": 0,
                "type": 1,
                "clientName": "Chris",
                "clientPhone": "0909636123"
            }
        }
        */

        const response = {
            'status':true,
            'data':''
        }

        const id = req.body.id
        const client = req.body.client
        const host = req.body.host
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const userId = decodeToken.id
        const houseId = req.body.houseId
        const state = req.body.state
        const type = req.body.type
        const clientName = req.body.clientName
        const clientPhone = req.body.clientPhone

        reserveHouse.getReserveHouse(id,false,(result,data)=>{
            if(result == true){
                if(data.host === host && host === userId){
                    reserveHouse.editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,(result,data)=>{
                        response.status = result;
                        response.data = data
                        res.send(response)
                    })
                }
                else if(data.client === client && client === userId){
                    reserveHouse.editReserveHouse(id,client,host,houseId,state,type,clientName,clientPhone,(result,data)=>{
                        response.status = result;
                        response.data = data
                        res.send(response)
                    })
                }
                else{
                    response.status = false;
                    response.data = 'user is not host or client'
                    res.send(response)
                }
            }else{
                response.status = result;
                response.data = data
                res.send(response)
            }
        })

        

    });

    app.get(preRestApi + '/getReserveHouseOnlyHost', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        */

        const id = req.query.id
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const host = decodeToken.id
        
        reserveHouse.getReserveHouse(id,false,(result,data)=>{
            if(data.host == host){
                const response = {
                    'status':result,
                    'data':data
                }
                res.send(response)
            }else{
                const response = {
                    'status':false,
                    'data':'account is not host'
                }
                res.send(response)
            }
        })
    })

    app.get(preRestApi + '/getReserveHouseOnlyClient', function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        */

        const id = req.query.id
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const client = decodeToken.id
        
        reserveHouse.getReserveHouse(id,true,(result,data)=>{
            if(data.client == client){
                const response = {
                    'status':result,
                    'data':data
                }
                res.send(response)
            }else{
                const response = {
                    'status':false,
                    'data':'account is not client'
                }
                res.send(response)
            }
        })
    })
}