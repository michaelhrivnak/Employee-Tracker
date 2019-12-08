const BLL = require('./lib/BLL');
const mysql = require('mysql');
const cTable = require('console.table');
//BLL.getDALTest();
const myBLL = new BLL();

myBLL.viewAllDepartments()
.then(res=>{
    //console.log(new RowDataPacket({name:"test"}))
    console.table(res);
    //console.log(cTable.getTable(res));
});
//console.table(cTable.getTable(myBLL.getAllDepartments()));

