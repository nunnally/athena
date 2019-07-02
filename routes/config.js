
const fs = require('fs');

module.exports = app => {


  /* Score Tecnologia	
  Score Politico	
  Score Economico	
  Score Disseminação
  Score Impacto	
  Score Seriedade	
  Score Interesse
  */
 
 const words = {
   
    dengue:{
      
      sinonimos:["zika"],
      scores:[0,0,0,1,1,3,3]
    },

    aids:{
      sinonimos:['dst', 'doença sexualmente transmissível'],
      scores:[3,4,3,1,0,2,4]
    }

  
 }




  app.get('/settings',function (req,res){

    let rawdata = fs.readFileSync('configs.json');  
    let config = JSON.parse(rawdata); 

    res.json(config)

  })

  app.post('/settings',function (req,res){

    //let data = JSON.stringify(words);  
    //fs.writeFileSync('teste1.json', data);

  })
}  