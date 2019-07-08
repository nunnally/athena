const NewsAPI = require('newsapi');
var fs = require('fs');
const path = require('path');
const axios = require('axios')




/*
    TODO
    - Global Config
    - I FORGOT OMG, DUde
    - Return some infos like news per domain, and other useful things

*/


module.exports = app => {

    let rawcommon = fs.readFileSync('config/common.json');  
    let common = JSON.parse(rawcommon); 

    const newsapi = new NewsAPI(common.news_api);

    function rankNews() {
        
    }

    console.log(common.news_api);

    /*
        Returns a list of News from results, and the number of results expected.
    */
    app.post('/getNews', function (req, res) {

        data = {
            "words":req.body.words
           
    }
        //data = {}
        const promises = [];
        req.body.words.forEach(function (word) {
        
            const promise = newsapi.v2.everything({
                q: word,
                domains: req.body.domains.join(', '),
                sort_by: 'relevancy'
            })
                .then(response => {

                    /*
                    Só pra testes, melhorando a função ranktext, depois, utilize:
                    data[word]['score']= score(response)

                    */
                    var precision = 100; // 2 decimals
                    var score = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);

        
                    data[word] = response;
                    data[word]['score'] = score;
                })
            promises.push(promise);
        });
        
        Promise.all(promises)
        .then(()=>{
            res.send(data);
        })
        
      });


    app.post('/saveNews', function (req, res) {
        

        
        news = req.body.news 

        /*var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate = year + "-" + month + "-" + day;
        */
        const currentDate = new Date().toISOString().slice(0,10);

        data = [];
        responses = [];
        const promises = [];
        errors = []
        news.forEach(element => {

            
            const promise = axios({
                'method': 'post',
                'url': 'http://164.41.147.15:8080/noticias',
                'data': {
                    "author":element['source'].name,
                    "content":element.content,
                    "description":element.description,
                    "event": [
                        "teste"
                      ],
                    "publishedAt":element.publishedAt,
                    "insertionDate":currentDate,
                    "score":6.6711,
                    "source":element['source'].name,
                    "title":element.title,
                    "country":"BR",
                    "region":"",
                    "uf":"",
                    "url":element.url,
                    "urlToImage":element.urlToImage
    
                },
                'headers': {
                    'Authorization': 'Basic ZGV2OmFwaWtleQ==',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                
                //responses.push(response)
                console.log('adicionei')
               
            })
            /*
            .catch((error) => {
                errors.push(error)
                //console.log('error')
            })
            */
            promises.push(promise);
            //data.push(current);

        });

        Promise.all(promises)
        .then(()=>{
            res.json(1);
            //console.log('foi')
        })
        .catch((error) => {
            //console.log('foi n')
            //console.log(error)
            res.json(error);
        })
        //res.json(news)

        /*
        news.forEach(element => {

            data = {
                "author":element.author,
                "content":element.content,
                "description":element.description,
                "event": [
                    "dengue",
                    "chuva"
                  ],
                "publishedAt":element.publishedAt,
                "insertionDate":newdate,
                "score":6.0,
                "source":element['source'].name,
                "title":element.title,
                "country":"BR",
                "region":"",
                "uf":"",
                "url":element.url,
                "urlToImage":element.urlToImage


            }

            axios({
                'method': 'post',
                'url': 'http://164.41.147.15:8080/noticias',
                'data': data,
                'headers': {
                    'Authorization': 'Basic ZGV2OmFwaWtleQ==',
                    'Content-Type': 'application/json'
                }
            }).then(data => {
               res.json(data.data)
               
            })
            .catch((error)=>{
                console.log(error)
            })
            
        });

        */
            
    
    });

    app.post('/teste', function (req, res) {

    data = {}
    let count = 0;
    req.body.words.forEach(function (word) {
        count++;
        newsapi.v2.everything({
            q: word,
            domains: req.body.domains.join(', '),
            sort_by: 'relevancy'
            })
            .then(response => {
                data[word]=response;
                //return only if all the entries are processed
                if (count === req.body.words.length) {
                    return res.json(data);
                }
            });
        });

    

    
    });


    app.get('/sources',function (req,res){

        newsapi.v2.sources({

            country: 'br'
          }).then(response => {
            res.json(response);

          });
    })

    /*
     this is NOT THE RIGHT WAY TO RENDER
     Just use VUE cli to solve that, guys ;)

    */

    app.get('/',function(req,res){

        res.sendFile(path.join(__dirname+'/index.html'));
        //res.sendFile('../index.html');

    })

}  