var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'jaidev246',
    database: 'jaidev246',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var Articles ={
    'article-one': {
        title:'ARTICLE ONE |  Jaidev',
        heading:'Article one',
        date:'Sep 5,2017',
        content:`
        <p>
        'This is the content for my First article'
        </p>`
    },
    'article-two':{
        title:'ARTICLE TWO |  Jaidev',
        heading:'Article Two',
        date:'Sep 5,2017',
        content:`
        <p>
        'This is the content for my Second article'
        </p>`
    },
    'article-three':{
        title:'ARTICLE THREE |  Jaidev',
        heading:'Article Three',
        date:'Sep 5,2017',
        content:`
        <p>
        'This is the content for my Third article'
        </p>`
    }
};

function createTemplate (data){
    var title =data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" /> 
            <style>
                
            </style>
        </head>
        <body>
            <div class="container">
            <div>
                <a href='/'>Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
               ${date.toDateString()}
            </div>
            <div>
               ${content}
            </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 1000, 512, 'sha512');
    return ['pbkdf2', "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'this-is-some-ramdom-string');
    res.send(hashedString);
    
});

app.post('/create-user',function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.getRandomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user"(username, password) VALUES ($1, $2)',[username,dbString], function(err, result){
        if(err) {
           res.status(500).send(err.toString());
            
        }else{
           res.send('User successfully created:' + username);
        }
    });
});


var pool = new Pool(config);
app.get('/test-db', function(req, res){
   //make a select rqt 
   //return a res with the result
   pool.query('SELECT * FROM test',function(err,result){
       if(err) {
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });
});


var counter=0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
    
});


app.get('/articles/:ArticleName', function(req, res){
    //ArticleName == article-one
    //Articles[ArticleName]=={} content of article one
    
    pool.query("SELECT * FROM article WHERE title = '"+ req.params.articleName +'', function(err,result){
       if(err) {
           res.status(500).send(err.toStr());
       }else{
           if(result.rows.length === 0) {
               res.status(404).send('Article not found');
           }else {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
    
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name/:name',function(req,res){
    //get name from req obj
    var name = req.params.name;
    
    names.push(name);
    //js notatns
    res.send(JSON.stringify(names));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
