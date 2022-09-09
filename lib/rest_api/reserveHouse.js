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

    // app.get(preRestApi + '/getReserveHouses', function(req, res) {

    //     /* #swagger.security = [{
    //            "apiKeyAuth": []
    //     }],
    //     #swagger.parameters['isDelete'] = {
    //         in: 'query',
    //         type: 'boolean',
    //     }
    //     */

    //     const start = req.query.start
    //     const count = req.query.count
    //     const timeSort = req.query.timeSort
    //     const priceSort = req.query.priceSort
    //     const pingSort = req.query.pingSort
    //     const isDelete = req.query.isDelete
    //     const minPrice = req.query.minPrice
    //     const maxPrice = req.query.maxPrice
    //     const minPing = req.query.minPing
    //     const maxPing = req.query.maxPing
    //     const minRoom = req.query.minRoom
    //     const maxRoom = req.query.maxRoom
    //     const minFloor = req.query.minFloor
    //     const maxFloor = req.query.maxFloor
    //     const buildingType = req.query.buildingType
    //     const city = req.query.city
    //     const area = req.query.area
    //     //特色
    //     const parking = req.query.parking
    //     const pet = req.query.pet
    //     const manager = req.query.manager
    //     const garbage = req.query.garbage
    //     const smoke = req.query.smoke
    //     const cook = req.query.cook
    //     const textQuery = req.query.textQuery
    //     //類型
    //     const typeOfRental = req.query.typeOfRental
    //     const owner = req.query.owner

    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     house.getHouses(start,count,timeSort,priceSort,pingSort,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,minFloor,maxFloor,owner,buildingType,typeOfRental,city,area,parking,pet,manager,garbage,smoke,cook,textQuery,isDelete,(result,data)=>{
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });

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

    app.get(preRestApi + '/getReserveHouse',[middleware.tokenAuth,middleware.checkIsHost], function(req, res) {

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