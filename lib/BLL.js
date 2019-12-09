//imports
const DAL = require("./DAL");
const Employee = require("./employee");
const Role = require("./role");
const Department = require("./department");

const myDAL = new DAL();
class BLL {
    getAllDepartments(){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.getAllDepartments());
        }); 
    }

    viewAllDepartments(){
        return new Promise((resolve,reject)=>{
            myDAL.getAllDepartments()
            .then(res =>{
                resolve(res.map(({name}) =>{
                     return {name:name};
                }));
            });
        });
    }
    getAllEmployeesFullData(){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.getAllEmployeesFullData());
        });  
    }
    getAllManagerNames(){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.getAllManagerNames());
        });   
    }
    getEmployeesByManager(manager){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.getEmployeesByManager(manager));
        }); 
    }
}

module.exports = BLL;