const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const httpRequest = require('../utils/httpRequest');

function sendMail(toMail,subject,content,callback){
    const url = config['smtp-basic-server'].location+'/'+config['smtp-basic-server'].restApi.sendMail;
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    };
    const doc = {
        toMail,
        subject,
        content,
    }
    httpRequest.sendJsonRequest(url, headers, doc, method, (error, body) => {
        if (error) {
          callback(false,body);
        } else {
          callback(body.status,body.data);
        }
      });
}


function getAddress(house){
    let result = `${house.address} ${house.houseNumber.lane} 巷 ${house.houseNumber.alley} 弄 ${house.houseNumber.number1} 號`
    if(utilsValue.isValid(house.houseNumber.number2)){
        result = result + `之 ${house.houseNumber.number2} `
    }
    return result
}

function getFloor(house){
    let result = `${house.floor}`
    if(house.floor*1<0){
        result = '地下 '+house.floor*-1
    }
    if(utilsValue.isValid(house.floor2)){
        result = result + ` 之 ${house.floor2} `
    }
    result = result + `樓 / ${house.totalFloor} 樓`
    return result
}

function getHostGender(house){
    if(house.hostGender === true){
        return '男'
    }else{
        return '女'
    }
}

function getOutputBool(value){
    if(value === true){
        return '是'
    }else{
        return '否'
    }
}

function getTLE(value){
    if(utilsValue.isValid(value))
    {
        let result = '近'
        for(let i = 0 ;i<value.length;i++){
            result = result + ' '+value[i].name
        }
        return result
    }else{
        return '無'
    }
}

function getConfig(house){
    return `${house.config.room} 房 ${house.config.livingRoom} 廳 ${house.config.bathroom} 衛 ${house.config.balcony} 陽台`
}

function getBuildType(house){
    switch(house.config.buildingType){
        case 1 :
            return '公寓';
            break
        case 2 :
            return '電梯大樓';
            break
        case 3 :
            return '透天';
            break
        default :
            return '無';
            break
    }
}

function getTypeOfRental(house){
    switch(house.saleInfo.typeOfRental){
        case 1 :
            return '整層住家';
            break
        case 2 :
            return '獨立套房';
            break
        case 3 :
            return '分租套房';
            break
        case 3 :
            return '雅房';
            break
        default :
            return '無';
            break
    }
}

function getFeature(house){
    let result = ''
    if(house.saleInfo.pet === true){
        result = result + ' 可養寵物'
    }
    if(house.saleInfo.smoke === true){
        result = result + ' 可吸菸'
    }
    if(house.saleInfo.cook === true){
        result = result + ' 可開伙'
    }
    if(house.parking === true){
        result = result + ' 有車位'
    }
    if(house.saleInfo.manager === true){
        result = result + ' 有管理員，管理費：'+house.saleInfo.managerPrice+' 元'
    }
    if(house.saleInfo.garbage === true){
        result = result + ' 倒垃圾服務，垃圾費：'+house.saleInfo.garbagePrice+' 元'
    }
    if(result === ''){
        result = '無'
    }
    return result
}

function getNoNullValue(value){
    if(utilsValue.isValid(value)){
        return value
    }else{
        return '無'
    }
}

function getPhoto(house){
    let result = ''
    if(utilsValue.isValid(house.photo) && house.photo.length > 0){
        for(let i = 0;i<house.photo.length;i++){
            result = result + house.photo[i]
            if(i>0 && i<house.photo.length-1){
                result = result +' ,'
            }
        }
    }else{
        result = '無'
    }
    return result
}

function getAnnex(house){
    let result = ''
    if(utilsValue.isValid(house.annex) && house.annex.length > 0){
        for(let i = 0;i<house.annex.length;i++){
            result = result + house.annex[i]
            if(i>0 && i<house.annex.length-1){
                result = result +' ,'
            }
        }
    }else{
        result = '無'
    }
    return result
}

function isUpdateValueOrg(orgValue,updateValue){
    if(orgValue === updateValue){
        return ''
    }else{
        return 'color:blue;'
    }
}

function isUpdateValue(orgValue,updateValue){
    if(orgValue === updateValue){
        return ''
    }else{
        return 'color:red;'
    }
}

function getEditHouseNotifyContent(name,editName,orgHouse,editHouse,time){
    let first = '';
    if(utilsValue.isValid(name)){
        first += '親愛的 '+name+' 您好：<br>'
    }else{
        first += '親愛的您好：<br>'
    }

    const second = `【 ${orgHouse.name} 】 在 ${time} 經由你底下員工【 ${editName} 】更改過物件資料。<br>`


const third = `
<table style="border-spacing: 0;border: 1px solid #333;border-collapse: collapse;width:100%;">
    <tr>
      <td style="border:1px solid #000;">項目</td>
      <td style="border:1px solid #000;">原始資料</td>
      <td style="border:1px solid #000;">更改資料</td>
    </tr>
    <tr>
      <td style="border:1px solid #000;">名稱</td>
      <td style="border:1px solid #000; ${isUpdateValueOrg(orgHouse.name,editHouse.name)}">${orgHouse.name}</td>
      <td style="border:1px solid #000; ${isUpdateValue(orgHouse.name,editHouse.name)} ">${editHouse.name}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">地址</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getAddress(orgHouse),getAddress(editHouse))}">${getAddress(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getAddress(orgHouse),getAddress(editHouse))} ">${getAddress(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">樓層</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getFloor(orgHouse),getFloor(editHouse))}">${getFloor(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getFloor(orgHouse),getFloor(editHouse))} ">${getFloor(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">房間號碼</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getNoNullValue(orgHouse.room),getNoNullValue(editHouse.room))}">${getNoNullValue(orgHouse.room)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getNoNullValue(orgHouse.room),getNoNullValue(editHouse.room))} ">${getNoNullValue(editHouse.room)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">格局</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getConfig(orgHouse),getConfig(editHouse))}">${getConfig(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getConfig(orgHouse),getConfig(editHouse))}">${getConfig(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">建築類型</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getBuildType(orgHouse),getBuildType(editHouse))}">${getBuildType(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getBuildType(orgHouse),getBuildType(editHouse))}">${getBuildType(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">出租方式</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getTypeOfRental(orgHouse),getTypeOfRental(editHouse))}">${getTypeOfRental(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getTypeOfRental(orgHouse),getTypeOfRental(editHouse))}">${getTypeOfRental(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">特色</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getFeature(orgHouse),getFeature(editHouse))}">${getFeature(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getFeature(orgHouse),getFeature(editHouse))}">${getFeature(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">是否加蓋</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getOutputBool(orgHouse.isRoofAnnex),getOutputBool(editHouse.isRoofAnnex))}">${getOutputBool(orgHouse.isRoofAnnex)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getOutputBool(orgHouse.isRoofAnnex),getOutputBool(editHouse.isRoofAnnex))}">${getOutputBool(editHouse.isRoofAnnex)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">租金</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(orgHouse.price,editHouse.price)}">${orgHouse.price}</td>
        <td style="border:1px solid #000; ${isUpdateValue(orgHouse.price,editHouse.price)}">${editHouse.price}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">坪數</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(orgHouse.ping,editHouse.ping)}">${orgHouse.ping}</td>
        <td style="border:1px solid #000; ${isUpdateValue(orgHouse.ping,editHouse.ping)}">${editHouse.ping}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">交通</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getTLE(orgHouse.traffic),getTLE(editHouse.traffic))}">${getTLE(orgHouse.traffic)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getTLE(orgHouse.traffic),getTLE(editHouse.traffic))}">${getTLE(editHouse.traffic)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">生活</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getTLE(orgHouse.life),getTLE(editHouse.life))}">${getTLE(orgHouse.life)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getTLE(orgHouse.life),getTLE(editHouse.life))} ">${getTLE(editHouse.life)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">學校</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getTLE(orgHouse.educate),getTLE(editHouse.educate))}">${getTLE(orgHouse.educate)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getTLE(orgHouse.educate),getTLE(editHouse.educate))} ">${getTLE(editHouse.educate)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">備註</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getNoNullValue(orgHouse.remark),getNoNullValue(editHouse.remark))}">${getNoNullValue(orgHouse.remark)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getNoNullValue(orgHouse.remark),getNoNullValue(editHouse.remark))} ">${getNoNullValue(editHouse.remark)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">屋主名稱</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(orgHouse.hostName,editHouse.hostName)}">${orgHouse.hostName}</td>
        <td style="border:1px solid #000; ${isUpdateValue(orgHouse.hostName,editHouse.hostName)} ">${editHouse.hostName}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">屋主性別</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getHostGender(orgHouse),getHostGender(editHouse))}">${getHostGender(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getHostGender(orgHouse),getHostGender(editHouse))} ">${getHostGender(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">屋主電話</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(orgHouse.hostPhone,editHouse.hostPhone)}">${orgHouse.hostPhone}</td>
        <td style="border:1px solid #000; ${isUpdateValue(orgHouse.hostPhone,editHouse.hostPhone)}">${editHouse.hostPhone}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">照片</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getPhoto(orgHouse),getPhoto(editHouse))}">${getPhoto(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getPhoto(orgHouse),getPhoto(editHouse))}">${getPhoto(editHouse)}</td>
    </tr>
    <tr>
        <td style="border:1px solid #000;">附件</td>
        <td style="border:1px solid #000; ${isUpdateValueOrg(getAnnex(orgHouse),getAnnex(editHouse))}">${getAnnex(orgHouse)}</td>
        <td style="border:1px solid #000; ${isUpdateValue(getAnnex(orgHouse),getAnnex(editHouse))}">${getAnnex(editHouse)}</td>
    </tr>
</table>
`

    const end = `謝謝`
    const content = `<div style=color:black;>${first}<div/><br><div style=color:black;>${second}<br><div/><div style=color:black;>${third}<br><div style=color:black;>${end}<div/>`
    return content
}

function sendEditHouseNotifyMail(toMail,name,editName,orgHouse,editHouse,callback){
    const time = utilsValue.getCurrentTime()
    const subject = '[租屋物件更改通知] - ' + time
    const content = getEditHouseNotifyContent(name,editName,orgHouse,editHouse,time);
    sendMail(toMail,subject,content,callback)
}

exports.sendEditHouseNotifyMail = sendEditHouseNotifyMail
