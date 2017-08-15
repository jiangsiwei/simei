'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class File {
  static createFolderSync(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  };

  static createReadStream(filePath) {
    return fs.createReadStream(filePath);
  };

  static saveTextFile(data, fileNameWithPath, endHandler) {
    // Create directory if it doesn't exist
    this.createFolderSync(path.dirname(fileNameWithPath));
    fs.writeFile(fileNameWithPath, data, function(err) {
      endHandler(err);
    });
  };

  static saveTextFileSync(data, fileNameWithPath) {
    // Create directory if it doesn't exist
    this.createFolderSync(path.dirname(fileNameWithPath));
    return fs.writeFileSync(fileNameWithPath, data);
  };

  static deleteFile(fileNameWithPath, endHandler) {
    fs.unlink(fileNameWithPath, function(err) {
      endHandler(err);
    });
  };

  // Can be deleted once ported over to v2 for MCT
  static deleteTextFile(fileNameWithPath, endHandler) {
    fs.unlink(fileNameWithPath, function(err) {
      endHandler(err);
    });
  };

  static appendFile(fileNameWithPath, content, endHandler) {
    fs.appendFile(fileNameWithPath, content, function(err, data) {
      endHandler(err, data);
    });
  };

  static readFile(fileNameWithPath, endHandler) {
    fs.readFile(fileNameWithPath, 'utf8', function(err, data) {
      endHandler(err, data);
    });
  };

  static readFileAsBlob(fileNameWithPath, endHandler) {
    fs.readFile(fileNameWithPath, endHandler);
  };
}
