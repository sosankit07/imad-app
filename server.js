var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
/*var config = {
    user: 'dubeankit07',
    database: 'dubeankit07',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};*/
var app = express();
app.use(morgan('combined'));

function hash(input,salt){
    var hashed = crypto.pbkd2Sync(input,salt,10000,512,'sha512');
    return(hashed.toString("hex"));
}
app.get('/hash/:input',function(req,res){
   var hashedstring=hash(req.params.input,'this-is-some-random-string');
   res.send(hashedstring);
});

function createTemplate(data){
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var HTMLTemplate=
`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, intial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
        <a href="/">Home</a>
        <hr/>
       
       <div>
            ${content}
        </div>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        </div>
    </body>
</html>`;
return HTMLTemplate;
}


var pool = new Pool(config);
app.get('/test-db',function(req,res){
   //make a select request
   //return a response with results
   pool.query('SELECT * FROM test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/articles/:articlename', function (req, res) {
    pool.query("SELECT * FROM articles WHERE title = $1",[req.params.articlename],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send('Article Not Found');
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articles[articlename]));
            }
        }
    });
  
});
var names=[];
app.get('/submit-name/:name', function (req, res) {
  var name=req.params.name;
  names.push(name);
  res.send(JSON.stringify(names));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
