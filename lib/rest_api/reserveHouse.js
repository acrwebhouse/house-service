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
            // console.log('===reserveHouseNotification==result=111==')
            // if(result == true){
            //     console.log('===reserveHouseNotification==result=222==')
            //     notification.reserveHouseNotification(clientName,clientPhone,host,(result,data)=>{
            //         console.log('===reserveHouseNotification==result===')
            //         console.log(result)
            //         console.log('===reserveHouseNotification==data===')
            //         console.log(data)
            //     })
            // }
        })
      
        
    });

    app.get(preRestApi + '/getReserveHousesOnlyHost',[middleware.tokenAuth], function(req, res) {

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
            reserveHouse.getReserveHouses(start,count,host,state,type,timeSort,(result,data)=>{
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

    // app.delete(preRestApi + '/removeReserveHouse',[middleware.tokenAuth], function(req, res) {
    //     /*
    //     #swagger.security = [{
    //            "apiKeyAuth": []
    //     }] 
    //     #swagger.parameters['obj'] = {
    //          in: 'body',
    //          description: 'Remove a housees',
    //          schema: {
    //              ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
    //          }
    //      }*/ 
    //      const ids = req.body.ids
    //      const response = {
    //          'status':true,
    //          'data':''
    //      }
    //      house.removeHouse(ids,(result,data)=> {
    //          response.status = result;
    //          response.data = data
    //          res.send(response);
    //      })
    //  });

    app.put(preRestApi + '/editReserveHouseByHost',[middleware.tokenAuth,middleware.checkIsHost], function(req, res) {
        /* #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a reserve house',
            schema: {
                "id": "61ed2777f5178ce385654350",
                "client": "61ed2777f5178ce385654350",
                "host": "61ed2777f5178ce385654351",
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
        const houseId = req.body.houseId
        const state = req.body.state
        const type = req.body.type
        const clientName = req.body.clientName
        const clientPhone = req.body.clientPhone

        res.send(response)

    });

    app.get(preRestApi + '/getReserveHouseOnlyHost',[middleware.tokenAuth], function(req, res) {

        /* #swagger.security = [{
               "apiKeyAuth": []
        }]
        */

        const id = req.query.id
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const host = decodeToken.id
        
        reserveHouse.getReserveHouse(id,(result,data)=>{
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
}