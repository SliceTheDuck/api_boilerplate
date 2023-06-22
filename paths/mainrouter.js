const express = require('express');
const fs = require('fs');
const path = require('path');

var router = express.Router();


const setupSubPaths = () => {
  const currentDir = fs.readdirSync(__dirname, { withFileTypes: true });

  currentDir.forEach((item) => {
    if(!item.isDirectory()){return;}
    const folderPath = path.join(__dirname, item.name);
    const items = fs.readdirSync(folderPath);
    items.forEach((file) => {
      if (path.extname(file) === '.js') {
        const pathroute = require(path.join(folderPath, file));
        if (!(typeof pathroute === 'function')) {return;}
        console.log('Loading: ' + file + ', under: /' + item.name);
        const basePath = path.relative(path.resolve(__dirname, '..'), folderPath);
        router.use('/' + item.name, pathroute);
      }
    });
  });
};
setupSubPaths();

module.exports = router;