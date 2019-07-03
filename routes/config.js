
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


  /*
    Receive a dict with a word and his scores.

  */
  app.post('/settings',function (req,res){

    const word=  {
      
      teste:{
      
        sinonimos:["teste","teste2"],
        scores:[0,0,0,1,1,3,3]
      }

    }

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

    palavra = Object.keys(word)

    words[palavra[0]] = word[palavra[0]]

    console.log(words)

  })
}  