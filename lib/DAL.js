const mysql = require('mysql');

class ConnectionString {
    constructor(user,host,port,database,password){
        this.user = user;
        this.host = host;
        this.PORT = port;
        this.database = database;
        this.password = password;
    }
}

const connStr = new ConnectionString("root","localhost",3306,"employee_db","mqEl3Ar4pQi^JcE4");

async function newConnect(){
    let conn = mysql.createConnection(connStr);
    conn.connect(err=>{
        if(err) throw err;
    });
    //console.log("connected");
    return conn;
}

// async function executeQuery(connection, queryStr){
//     await connection.query(queryStr, (err,res)=>{
//         if(err) throw err;
//         console.table(res.map(e => e.name));
//         return Promise.resolve(res);
//     });
// }

class DAL {
   async getAllDepartments(){
        let conn = await newConnect();    
        return new Promise((resolve,reject)=>{
            
            let result;
            let query = "select * from department";
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();
                //console.table(res);
                resolve(res);
            });    
            //console.log(result);    
        });
    }
}
async function test(){
    let myDAL = new DAL();
    //let res;
    myDAL.getAllDepartments()
    .then(res =>{
        return res;
    });
    //console.log(res);
}

//console.table(test());
module.exports = DAL;