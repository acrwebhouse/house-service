const utilsValue = require('../utils/value');
const employees = require('../role/employees');
const middleware = {
    checkIsAdmin: function(req, res, next) {
       const token = req.headers['x-token']
       const decodeToken = utilsValue.jwtDecode(token)
       const roles = decodeToken.roles
       if(roles.indexOf(1)>=0){
          next()
       }else{
        const response = {
            status : false,
            data :"role is not admin"
        }
        res.send(response);
       }
    },
    checkCanEdit: function(req, res, next) {
       const token = req.headers['x-token']
       const decodeToken = utilsValue.jwtDecode(token)
       const roles = decodeToken.roles
       const id = decodeToken.id
       const editId = req.body.id
       if(roles.indexOf(1)>=0 || id == editId){
          next()
       }else{
        const response = {
            status : false,
            data :"role is not admin and not account owner"
        }
        res.send(response);
       }
    },
    checkIsHost: function(req, res, next) {
        const token = req.headers['x-token']
        if(utilsValue.isValid(token)){
            const decodeToken = utilsValue.jwtDecode(token)
            const id = decodeToken.id
            if(utilsValue.isValid(id)){
                const host = req.body.host || req.query.host
                if(id == host){
                    next()
                }else{
                    const response = {
                        status : false,
                        data :"account is not host"
                    }
                    res.send(response);
                }
            }else{
                const response = {
                    status : false,
                    data :"x-token format error"
                }
                res.send(response);
            }
        }else{
            const response = {
                status : false,
                data :"x-token undefined"
            }
            res.send(response);
        }
    },
    checkIsEmployee: function(req, res, next) {
        const token = req.headers['x-token']
        const decodeToken = utilsValue.jwtDecode(token)
        const id = decodeToken.id
        const companyId = req.body.companyId
        let isEmployee = false;
        employees.getEmployeesByUserId(id,(result,data)=>{
            if(result == true){
                for(let i = 0 ;i<data.length; i++){
                    if(data[i].companyId == companyId && data[i].state == 2){
                        isEmployee = true;
                        i = data.length
                    }
                }
                if(isEmployee ==true){
                    next()
                }else{
                    const response = {
                        status : false,
                        data :'user is not employee'
                    }
                    res.send(response);
                }
            }else{
                const response = {
                    status : false,
                    data :data
                }
                res.send(response);
            }
        })
    },
}

exports.middleware = middleware