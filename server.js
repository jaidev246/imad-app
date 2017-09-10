var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
               ${date}
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

var counter=0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
    
});


app.get('/:ArticleName', function(req, res){
    //ArticleName == article-one
    //Articles[ArticleName]=={} content of article one
    var ArticleName = req.params.ArticleName;
    res.send(createTemplate(Articles[ArticleName]));
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

app.get('/submit-name/:name',function(req,res){
    //get name from req obj
    var name = req.params.name;
    
    names.push(name);
    //js notatns
    res.send(JSON.stringify(names));
    res.send(names);
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
