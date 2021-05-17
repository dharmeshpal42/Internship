const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const { check, validationResult } = require('express-validator');




console.log(__dirname);

//connection to the DATABASE

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo"
});

con.connect(function (err) {
    if (err) throw err;
    console.log('database connected');
});

//set views file]
app.use('/assests', express.static('assests'))
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// to show the list of data into table form which from database

app.get('/', (req, res) => {
    const limit = 5
    // page number
    let page = req.query.page
    console.log(req.query.page);
    if (typeof page === 'undefined')//when we first time start the server so url does not define intially page value so it's undefined
    {
        page = 1
    }
    getUserData(limit, page, function (data, result) {
        res.render('index', {
            records: result,
            countData: data,
            dataLimit: limit,
        });
    })


});
function getUserData(limit, page, callback) {

    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    var getQuery = "select * from `task` limit " + limit + " OFFSET " + offset;
    var countquery = "select COUNT(*) AS `name` FROM `task`"
    con.query(countquery, function (err, data) {
        if (err) throw err
        console.log('the data is ' + data);
        con.query(getQuery, function (err, result) {
            if (err) throw err;
            console.log('the result is ' + result);
            callback(data[0], result)
        });
    })
}


// get the data from browser to database
//added a validation in the form
app.post('/', [
    check('name', 'Please Filled a Name column')
        .notEmpty(),
    check('task', 'Task Column not Filled ')
        .notEmpty(),
    check('description', 'Enter The Description of Task')
        .notEmpty(),
    check('date', 'Enter the Date')
        .notEmpty(),
    check('time', 'Enter The Time')
        .notEmpty()
], (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array());
        const alert = errors.array()
        var getQuery = "select * from `task`";
        con.query(getQuery, function (err, result) {
            if (err) throw err;
            res.render('index', { records: result, alert });
        })
    }
    else {
        var name = req.body.name;
        var task = req.body.task;
        var description = req.body.description;
        var date = req.body.date;
        var time = req.body.time;

        console.log("here date is :" + date);
        console.log("here time is :" + time);
        var insertQuery = 'insert into`task`(`name`,`task_name`,`task_description`,`date`,`time`)VALUES(?,?,?,?,?)';
        var query = mysql.format(insertQuery, [name, task, description, date, time]);
        con.query(query, function (err, response) {
            if (err) throw err;
            console.log(response);
            
            let limit = 5
            // getUserData(limit, 1, function (data, result) {
            //     res.render('index', {
            //         records: result,
            //         countData: data,
            //         dataLimit: limit,
            //     });
            // })
            res.redirect('/');
        })
    }
});

//get the data from databse to browser
app.get('/edit/:id', function (req, res, next) // '/edit/:id' is from the index.ejs file to get the data of the ID 
{
    var id = req.params.id;
    console.log(id);
    let sql = `select * from task where id = ${id}`;
    let query = con.query(sql, (err, result) => {
        console.log(result);
        if (err) throw err;
        res.render('edit',
            {
                records: result[0] //the data in rowpacket json format to convert into array so update it
            });
    });
});

// send to updated data browser to the database
app.post('/update/', (req, res, next) => {

    var id = req.body.id;
    var name = req.body.name;
    var task = req.body.task;
    var description = req.body.description;
    var date = req.body.date;
    var time = req.body.time;


    var updatequery = 'UPDATE `task` SET`name`=?,`task_name`=?,`task_description`=?,`date`=?,`time`=? where `id`=?';
    var query = mysql.format(updatequery, [name, task, description, date, time, id]);
    con.query(query, function (err, response) {
        if (err) throw err;
        console.log(response);
        var getQuery = "select * from `task`";
        con.query(getQuery, function (err, result) {
            if (err) throw err;
            res.redirect('/');//('index',{records :result});
        })
    });
});

// remove the data from the databse
app.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    var deletequery = "delete from `task` where `id` = ? ";
    var query = mysql.format(deletequery, id);
    con.query(query, function (err) {
        if (err) throw err;
        res.redirect('/'); // redirect to the url 
    })
});


//to adding a search functionalities
app.get('/search', function (req, res) {
    var searchquery = 'SELECT * from `task` where `name` like "%' + req.query.search + '%" or `task_name` like "%' + req.query.search + '%" or `task_description` like "%' + req.query.search + '%"';
    console.log(searchquery);
    con.query(searchquery, function (err, result) {
        res.render('index', {
            records: result

        });
    })
})


app.get('/page', function (req, res) {
    const limit = 5
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    var getQuery = "select * from `task` limit " + limit + " OFFSET " + offset;


})

//creating a server into the browser to execute the js file
app.listen(port, () => {
    console.log(`app listnening on port ${port}`)
});



