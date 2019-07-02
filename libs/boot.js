
//lol, this port is pretty weird
const port = 8081;
var common = require("./../libs/common.js")


module.exports = app => {

  app.listen(port, () => {
    console.log(`Athena is running at:${port}`);
  });

  //var value = common.sum(10,20);
  //console.log(value);
};

