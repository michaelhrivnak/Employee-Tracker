const mysql = require('mysql');

//uncessesary in practice but just getting used to classes
class ConnectionString {
    constructor(user,host,port,database,password){
        this.user = user;
        this.host = host;
        this.PORT = port;
        this.database = database;
        this.password = password;
    }
}

//connection string to be reused
const connStr = new ConnectionString("root","localhost",3306,"employee_db","mqEl3Ar4pQi^JcE4");

//connection function to get new connections
async function newConnect(){
    let conn = mysql.createConnection(connStr);
    conn.connect(err=>{
        if(err) throw err;
    });
    //console.log("connected");
    return conn;
}

class DAL {

    async getAllDepartments(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from department";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }
    async getAllDepartmentNames(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select name from department";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllEmployees(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from employee";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllEmployeeNames(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select id, first_name,last_name from employee";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllEmployeesFullData(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllManagerNames(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select distinct id,
            concat(first_name, ' ',last_name) as 'name'          
            from employee
            where id in (select manager_id from employee where manager_id is not null)`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getEmployeeByName(fullName){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where concat(first_name, ' ',last_name) = '${fullName}'`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getEmployeeByID(id){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where e.id = ${id}`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getEmployeesByDepartment(department){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager'            
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where d.name = '${department}'`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getEmployeesByManager(manager){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,          
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where manager_id = ${manager.id}`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getEmployeesByRole(role){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',            
            d.name as 'department'
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where r.title = '${role}'`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllRoles(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from role";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllRolesWithDepartmentName(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select r.id, title, salary, d.name as 'department'
                        from role as r
                        left join department as d on r.department_id = d.id`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async updateEmployeeRole(employee,role){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `update employee set role_id = ${role.id}
            where id = ${employee.id} `;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve("update successful");
            });    
             
        });
    }

    async addEmployee(employee){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `insert into employee
                        (first_name, last_name, role_id, manager_id)
                        values ('${employee.first_name}',
                                '${employee.last_name}',
                                ${employee.role_id},
                                ${employee.manager_id})`;            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res.insertId);
            });    
             
        });
    }

    async addRole(role){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `insert into role
                        (title, salary, department_id)
                        values ('${role.title}',
                                ${role.salary},
                                ${role.department_id})`;            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res.insertId);
            });    
             
        });
    }

    async addDepartment(department){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `insert into department
                        (name)
                        values ('${department}')`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                conn.end();               
                resolve(res.insertId);
            });    
             
        });
    }
    async removeDepartment(id){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `delete from department where id = ${id}`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                conn.end();               
                resolve(res);
            });    
             
        });
    }
    async removeEmployee(id){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `delete from employee where id = ${id}`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                conn.end();               
                resolve(res);
            });    
             
        });
    }
    async removeRole(id){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `delete from role where id = ${id}`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                conn.end();               
                resolve(res);
            });    
             
        });
    }
    
}
module.exports = DAL;