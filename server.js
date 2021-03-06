var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var app = express();
app.use(morgan('combined'));

var articles = {
'article-one': {
    title:'Article One | Singh Anubhav ',
    heading :  'Article One',
    date: '21 August',
    content: ` <p>
            This is the first page . YOLO.This is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLO
        </p>
        <p>
            This is the first page . YOLO.This is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLO
        </p>
        <p>
            This is the first page . YOLO.This is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLOThis is the first page . YOLO
        </p>
    `
},
'article-two':{
     title:'Article Two| Singh Anubhav ',
    heading :  'Article Two',
    date: '28 August',
    content: ` <p>
            This is the second page . YOLO.
        </p>
    `
} ,
'article-three':{
    title:'Article Three| Singh Anubhav ',
    heading :  'Article Three',
    date: '28 August',
    content: ` <p>
            This is the Third page . YOLO.
        </p>
    `
}};





function createtemplate (data){
var title= data.title ;
var heading=data.heading;
var date=data.date;
var content=data.content;



var htmltemplate = `
<html>
<head>
    <title>
       ${title}
    </title>
    <meta name="viewport" content="width=device-width , initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    
</head>

<body>
    <div class="container">
    <div>
    <a href="/">Home </a>
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
return htmltemplate;

}
var counter = 0;
app.get('/counter',function (req,res)
{
    counter = counter + 1;
    res.send(counter.toString());
});


function hash (input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2",10000 , salt,  hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res)){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
    
};





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articlename', function(req, res){
  //articleName == articleone
  //articles(articlename) == content object for the article one
  var articlename = req.params.articlename;
  res.send (createtemplate(articles[articlename]));
});

app.get('/article-two', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
