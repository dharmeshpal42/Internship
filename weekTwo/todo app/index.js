const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path  = require('path');



console.log(__dirname);

//connection to the DATABASE

const con = mysql.createConnection({
    host:"localhost",
    user :"root",
    password:"",
    database:"todo"
});

con.connect(function(err)
{
    if(err) throw err;
    console.log('database connected');
});

//set views file]
app.use('/assests',express.static('assests'))
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set("view engine","ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



// to show the list of data into table form which from database
app.get('/',(req,res)=>
{
    var getQuery = "select * from `task`";
    
   con.query(getQuery,function(err,result)
   {
       if(err) throw err;
console.log(result);
        res.render('index',{
            records : result

        });
   });
});

// get the data from browser to database
app.post('/',(req,res,next)=>
{
    var name = req.body.name;
    var task = req.body.task;
    var description = req.body.description;
    var date = req.body.date;
    var time = req.body.time;

    console.log("here date is :"+date);
    console.log("here time is :"+time);
    var insertQuery = 'insert into`task`(`name`,`task_name`,`task_description`,`date`,`time`)VALUES(?,?,?,?,?)';
    var query = mysql.format(insertQuery,[name,task,description,date,time]);
    con.query(query,function(err,response)
    {
        if(err) throw err;
        console.log(response);
        var getQuery = "select * from `task`";
       con.query(getQuery,function(err,result)
       {
        if(err) throw err;
        res.render('index',{records :result});
    })
});
});

//get the data from databse to browser
app.get('/edit/:id',function(req,res,next) // '/edit/:id' is from the index.ejs file to get the data of the ID 
{
    var id = req.params.id;
    console.log(id);
    let sql = `select * from task where id = ${id}`;
    let query= con.query(sql,(err,result)=>
    {
        console.log(result);
        if(err) throw err;
        res.render('edit',
        {   
            records : result[0] //the data in rowpacket json format to convert into array so update it
        });
    });
});

// send to updated data browser to the database
app.post('/update/',(req,res,next)=>
{
    
    var id = req.body.id;
    var name = req.body.name;
    var task = req.body.task;
    var description = req.body.description;
    var date = req.body.date;
    var time = req.body.time;

    
    var updatequery = 'UPDATE `task` SET`name`=?,`task_name`=?,`task_description`=?,`date`=?,`time`=? where `id`=?';
    var query = mysql.format(updatequery,[name,task,description,date,time,id]);
    con.query(query,function(err,response)
    {
        if(err) throw err;
        console.log(response);
        var getQuery = "select * from `task`";
       con.query(getQuery,function(err,result)
       {
        if(err) throw err;
        res.redirect('/');//('index',{records :result});
    })
});
});

// remove the data from the databse
app.get('/delete/:id',function(req,res,next)
{
    var id = req.params.id;
    console.log(id);
    var deletequery = "delete from `task` where `id` = ? ";
    var query = mysql.format(deletequery,id);
    con.query(query,function(err)
    {
        if(err) throw err;
        res.redirect('/'); // redirect to the url 
    })
});
//to adding a search functionalities

app.get('/search',function(req,res)
{
    var searchquery = 'SELECT * from `task` where `name` like "%'+req.query.search+'%"';
    console.log(searchquery);
    con.query(searchquery,function(err,result)
    {
        res.render('index',{
            records : result

        });
    })
})
 
//creating a server into the browser to execute the js file
app.listen(port,()=>
{
    console.log(`app listnening on port ${port}`)
});