require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 5001,
    'house-basic-server':{
        location: process.env.HOUSE_BASIC_LOCATION ||'http://127.0.0.1:14000',
        restApi:{
            'addHouse':'house/addHouse',
            'getHouses':'house/getHouses',
            'editHouse':'house/editHouse',
            'removeHouse':'house/removeHouse'
        }
    },
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'nasDir': process.env.NAS_DIR || '/Users/chris/Documents/work/ACR/nas_dir'
}