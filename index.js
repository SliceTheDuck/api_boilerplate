const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const requestIP = require('request-ip');
const shared = require('./tools/share.js');
global.toolPath = path.join(__dirname, 'tools');


app.use((req, res, next) => {
    req.trueip = requestIP.getClientIp(req);
    if(!shared.ip.includes(requestIP.getClientIp(req.trueip)))
    {
        shared.ip.push(req.trueip);
    }
    next();
});


const setupInitialPaths = (dir) => {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    if(path.extname(item)=== '.js')
    {
      console.log('Loading: ' + item + ', under /');
      var pathroute = require(`./paths/${item}`);
      app.use('/', pathroute);
    }
  });
};
setupInitialPaths('paths');

// Start the Express server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
