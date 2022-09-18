const fs = require('fs');
const globule = require('globule');
const path = require('path');
const async = require('async');

function mkdir(name,callback){
    fs.mkdir(name, 0777, function(err){
        if(err){
            callback(false)
        }else{
            callback(true)
        }
    })
}

function moveFile(orgPath, distPath, callback) {
    fs.readFile(orgPath, function(err, data) {
        if (err) {
            console.error(err.message);
            callback(err,false)
        } else {
            fs.writeFile(distPath, data, function(err) {
                if (err) {
                    console.error(err.message);
                    callback(err,false)
                } else {
                    fs.unlink(orgPath, function(err) {
                        if (err) {
                            console.error(err.message);
                            callback(err,false)
                        } else {
                            // console.log('delete ' + req.file.path + ' successfully!');
                            callback(err,true)
                        }
                    });
                }
            });
        }
    });
}
function removeFile(filePath, callback) {
    filePath = path.join(__dirname, '..', '..', 'client',filePath);
    fs.unlink(filePath, (err) => {
        if (err) {
            callback(err,false)
        }else{
            callback(err,true)
        }
    });
}
function removeFiles(filePathArray, callback) {
    let cbs = [];
    for(let i =0 ;i<filePathArray.length; i++){
        cbs.push(function(callback) {
          removeFile(filePathArray[i], callback)
        })
    }
    async.parallel(cbs, function(err, results) {
      let result = true;
      for (let i = 0; i < results.length; i++) {
        if(!results[i]){
            result = false;
        }
      }
      callback(err, result);
    });
}

function moveFiles(filePathArray, callback) {
    let cbs = [];
    for(let i =0 ;i<filePathArray.length; i++){
        cbs.push(function(callback) {
            moveFile(filePathArray[i].orgPath,filePathArray[i].distPath, callback)
        })
    }
    async.parallel(cbs, function(err, results) {
      let result = true;
      for (let i = 0; i < results.length; i++) {
        if(!results[i]){
            result = false;
        }
      }
      callback(err, result);
    });
}


function getFolderPathAll(folderName, isLocal, callback) {
    let searchBase = path.join(__dirname, '..', '..', 'client');
    let searchSource = path.join(folderName, '*')
    let result = globule.find({ src: searchSource, srcBase: searchBase, prefixBase: isLocal })
    callback(result)
}

function getUploadFiles(req, uploadDir,uploadName, callback) {
    const multer = require('multer');
        upload = multer({ dest: uploadDir }).array(uploadName);     
        upload(req, null, function(err) {
            if(err){
                callback(false,err)
            }else{
                callback(true,req.files)
            }
            
        })
}

function copyFile(orgPath, distPath, callback) {
    fs.readFile(orgPath, function(err, data) {
        if (err) {
            console.error(err.message);
            callback(err,false)
        } else {
            fs.writeFile(distPath, data, function(err) {
                if (err) {
                    console.error(err.message);
                    callback(err,false)
                } else {
                    callback(err,true)
                }
            });
        }
    });
}

function copyFiles(filePathArray, callback) {
    let cbs = [];
    for(let i =0 ;i<filePathArray.length; i++){
        cbs.push(function(callback) {
            copyFile(filePathArray[i].orgPath,filePathArray[i].distPath, callback)
        })
    }
    async.parallel(cbs, function(err, results) {
      let result = true;
      for (let i = 0; i < results.length; i++) {
        if(!results[i]){
            result = false;
        }
      }
      callback(err, result);
    });
}

exports.getFolderPathAll = getFolderPathAll;
exports.removeFile = removeFile;
exports.removeFiles = removeFiles;
exports.moveFile = moveFile;
exports.getUploadFiles = getUploadFiles;
exports.mkdir = mkdir;
exports.moveFiles = moveFiles
exports.copyFiles = copyFiles