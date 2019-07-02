var fs = require('fs');


//WARNING //WARNING //WARNING //WARNING
//WARNING //WARNING //WARNING //WARNING
//WARNING //WARNING //WARNING //WARNING
//WARNING //WARNING //WARNING //WARNING
//WARNING //WARNING //WARNING //WARNING
//WARNING //WARNING //WARNING //WARNING
//WARNING //WARNING //WARNING //WARNING


// TOTAL USELESS ATM
// IMPROVE THAT 

// config file to load somes parameters like NEWS API key, rows per page, etc. Just look the file, dude;
module.exports = app => {
let rawcommon = fs.readFileSync('config/common.json');  
let common = JSON.parse(rawcommon); 


//The app.locals object has properties that are local variables within the application.

app.locals.news_api = common.news_api
//console.log(app.locals.news_api);   



}


module.exports = {
    sum: function(a,b) {
        return a+b
    },
    multiply: function(a,b) {
        return a*b
    }
};