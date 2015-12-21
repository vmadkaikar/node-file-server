'use strict';

var config = require('../../config/environment');
var storage = require('filestorage').create(config.root + config.dataFolder);
var formidable = require('formidable');
var fs = require('fs');

exports.uploadFile = function(request, response) {
    var incomingForm = new formidable.IncomingForm();

    incomingForm.parse(request);
    incomingForm.on('end', function() {
        var filePath = this.openedFiles[0].path,
            fileName = this.openedFiles[0].name;

        storage.insert(fileName, fs.createReadStream(filePath), function(error, fileId, stats) {
            if(!error) {
                fs.unlink(filePath); // delete the temporary file
                response.send({fileId: fileId, stats: stats});
            } else {
                console.log("ERROR UPLOADING FILE!!!" + JSON.stringify(error));
                response.writeHead(500);
                response.end();
            }
        });
    });
};

exports.updateFile = function(request, response) {
    var incomingForm = new formidable.IncomingForm(),
        fileId = request.params.fileId;

    incomingForm.parse(request);
    incomingForm.on('end', function() {
        var filePath = this.openedFiles[0].path,
            fileName = this.openedFiles[0].name;

        storage.update(fileId, fileName, fs.createReadStream(filePath), function(error, fileId, stats) {
            if(!error) {
                fs.unlink(filePath); // delete the temporary file
                response.send({fileId: fileId, stats: stats});
            } else {
                console.log("ERROR UPLOADING FILE!!!" + JSON.stringify(error));
                response.writeHead(500);
                response.end();
            }
        });
    });
};

exports.downloadFile = function(request, response) {
    var fileId = request.params.fileId;

    storage.pipe(fileId, request, response, true);
};

exports.deleteFile = function(request, response) {
    var fileId = request.params.fileId;

    storage.remove(fileId, function(error) {
        if(!error) {
            response.status(204).send({
                success: true
            });
        } else {
            response.status(404).send({
                success: false
            });
        }
    });
};