const DAL = require("./DAL");
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
}
// BLL.getDALTest = function(){
//     console.log(DAL.test);
// }

module.exports = BLL;