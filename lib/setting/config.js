require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 5001,
    'house-basic-server':{
        location: process.env.HOUSE_BASIC_LOCATION ||'http://127.0.0.1:14000',
        restApi:{
            'addHouse':'house/addHouse',
            'getHouses':'house/getHouses',
            'getHouse':'house/getHouse',
            'editHouse':'house/editHouse',
            'removeHouse':'house/removeHouse'
        }
    },
    'user-basic-server':{
        location: process.env.USER_BASIC_LOCATION ||'http://127.0.0.1:13000',
        restApi:{
            'getUserById':'user/getUserById',
        }
    },
    'notification-basic-server':{
        location: process.env.NOTIFICATION_BASIC_LOCATION ||'http://127.0.0.1:17000',
        restApi:{
            'sendNotificationByUserId':'notification/sendNotificationByUserId',
        }
    },
    'reserve-house-basic-server':{
        location: process.env.RESERVE_HOUSE_BASIC_LOCATION ||'http://127.0.0.1:18000',
        restApi:{
            'addReserveHouse':'reserveHouse/addReserveHouse',
            'editReserveHouse':'reserveHouse/editReserveHouse',
            'removeReserveHouse':'reserveHouse/removeReserveHouse',
            'getReserveHouses':'reserveHouse/getReserveHouses',
            'getReserveHouse':'reserveHouse/getReserveHouse',
        }
    },
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'nasDir': process.env.NAS_DIR || '/Users/chris/Documents/work/ACR/nas_dir'
}