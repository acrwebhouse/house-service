require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 5001,
    'user-basic-server':{
        location: process.env.USER_BASIC_LOCATION ||'http://127.0.0.1:13000',
        restApi:{
            'getUser':'user/getUser',
            'editUser':'user/editUser',
            'getUsers':'user/getUsers',
            'removeUser':'user/removeUser'
        }
    },
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
}