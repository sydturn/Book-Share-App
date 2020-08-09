const bodyParser = require('body-parser');
const express = require('express');     
const app = express();  
const router = express.Router();
const mysql = require('promise-mysql');
const jsonParser = bodyParser.json();
var cors = require('cors');
var path = require('path');

//create database connection
const createTcpPool = () => {
    return new Promise((resolve, reject) => {
        mysql.createPool({
            user: process.env.SQL_USER, 
            password: process.env.SQL_PASSWORD, 
            database: process.env.SQL_DATABASE, 
            host: process.env.SQL_HOST, 
            port: process.env.SQL_PORT,
            socketPath: process.env.INSTANCE_CONNECTION_NAME,
            connectionLimit: 5,
            connectTimeout: 10000,
            acquireTimeout: 10000,
            waitForConnections: true, 
            queueLimit: 0
        }).then(pool => {
            resolve(pool)
        }).catch(err => {
            console.log('could not initalize library managment api', err);
            reject({status: 500, message: err});
        })
    })
}

//first make the database connection
createTcpPool().then(database => {
    //initialize library manager, pass it db connection to give to mysql commands
    const libraryManager = require('./libraryManager')(database);
    //initalize router            
    // app.use(cors({origin: 'exactus-library.appspot.com'}));
    // app.use(cors({origin: 'localhost:3000'}));
    app.use(bodyParser.urlencoded({ extended: false}));        
    app.use(bodyParser.json());      
    app.use('/', new (require('./routes'))(router, libraryManager).getRouter());

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    
    app.get('*', function (req, res) {
         res.redirect('/');
    });
      
    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
    return exports;
}).catch(err => {
    console.log('failed to initialize', err)
})