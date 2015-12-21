'use strict';

var express = require('express');
var controller = require('./file.controller');

var router = express.Router();

router.post('/', controller.uploadFile);
router.put('/:fileId', controller.updateFile);
router.get('/:fileId', controller.downloadFile);
router.delete('/:fileId', controller.deleteFile);

module.exports = router;