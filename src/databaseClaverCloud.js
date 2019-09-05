const mysql = require('mysql');
const {promisify} = require('util');//modulo que convierte callback en promesas

const {cleverCloud} =require('./keys');

const pool = mysql.createPool(cleverCloud);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code ==='PROTOCOL_CONNECTION_LOST')
            console.log('DATABASE CONNECTIONS WAS CLOSED');
        if(err.code ==='ER_CON_COUNT_ERROR')
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        if(err.code ==='ECONNREFUSED')     
            console.log("DATABASE CONNECTIONS WAS REFUSED");
    }
    if(connection) connection.release()
    console.log('DB is Connected');
    return;
    
});
//promisify poll Query convierte callback en promesas
pool.query=  promisify(pool.query)

module.exports = pool;