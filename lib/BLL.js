//imports
const DAL = require("./DAL");
const Employee = require("./employee");
const Role = require("./role");
const Department = require("./department");
//load the DAL
const myDAL = new DAL();

class BLL {
    getAllDepartments(){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.getAllDepartments());
        }); 
    }
    viewAllRoles(){
        return new Promise((resolve,reject)=>{
            myDAL.getAllRolesWithDepartmentName()
            .then(res =>{
                resolve(res);
            });
        });
    }
    getAllRoles(){
        return new Promise((resolve,reject)=>{
            myDAL.getAllRoles()
            .then(res =>{
                resolve(res);
            });
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
    getAllEmployees(){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.getAllEmployees());
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
    updateEmployeeRole(employee,role){
        return new Promise((resolve,reject)=>{
            resolve(myDAL.updateEmployeeRole(employee,role));
        }); 
    }
    async addRole(role){
        return new Promise(async function(resolve,reject){
            await myDAL.getAllRoles()
            .then(res=>{
                if(res.find(e =>{(e.title === role.title && e.department_id === role.department_id)}) != null){
                    resolve("A role with that title and department already exists");
                    return;
                }
                resolve(myDAL.addRole(role));
            });
        }); 
    }
    async addEmployee(employee){
        return new Promise(async function(resolve,reject){
            await myDAL.getAllEmployees()
            .then(res=>{
                if(res.find(e =>{(e.first_name === employee.firstName 
                    && e.last_name === employee.last_name
                    && e.role_id === employee.role_id)}) != null){
                    resolve("An employee with that name and role already exists");
                    return;
                }
                resolve(myDAL.addEmployee(employee));
            });
        }); 
    }
    async addDepartment(department){
        return new Promise(async function(resolve,reject){
            await myDAL.getAllDepartmentNames()
            .then(res=>{
                if (res.indexOf(department) != -1){
                    resolve("Departemnt already exists");
                    return;
                }
                resolve(myDAL.addDepartment(department));               
            });         
        });
    }
}

module.exports = BLL;