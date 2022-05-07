const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'okff8833',
    database:'blog'
});

// データベースに接続できたらコンソールにConnectedを表示
// connection.connect(function(err) {
//    if (err) throw err;
//    console.log('Connected');
//  });

const session = require('express-session');
const req = require('express/lib/request');
const res = require('express/lib/response');

app.use(
    session({
        secret:'my_secret_key',
        resave:false,
        saveUninitialized:false,
    })
);

app.get('/',(req,res)=> {
    res.render('top.ejs');
});

app.get('/list',(req,res)=> {
    connection.query(
        'select * from articles',
        (error,results) => {
            res.render('list.ejs',{articles:results});
        }
    );
});

app.listen(3000);