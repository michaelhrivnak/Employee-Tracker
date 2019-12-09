//load dependencies 
const BLL = require('./lib/BLL');
const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');
const Questions = require('./lib/questions');

const myBLL = new BLL();
const questions = new Questions();

// myBLL.viewAllDepartments()
// .then(res=>{
//          console.table(res);
// });

function welcome(){
    console.log("Welcome to Employee Tracker");
    console.log("Loading");
    
    let duration = 0;
    let time = 250;
    let endTime = 3000;   

    let interval = setInterval(()=>{
        process.stdout.write('.');
        duration += time;
        if(duration == endTime ){
            clearInterval(interval);
        }
    }, time);
    setTimeout(() => {
        process.stdout.write('\033c');
        start();       
    }, endTime); 
}

async function start(){
   
    let isQuit = false;
    
    while(!isQuit){
        await inquirer.prompt(questions.mainMenu)
        .then(async function(answers){
            switch(answers.choice){
                case "View All Employees":
                    await myBLL.getAllEmployeesFullData()
                    .then(res =>{
                        dispayResults(res);
                    });
                    break;
                case "View employees by Manager":
                    let managers;

                    await myBLL.getAllManagerNames()
                    .then(res=>{
                        managers = res; 
                    });                    
                    await inquirer.prompt({
                        message:"Choose a manager:",
                        type: "list",
                        choices: managers.map(e => e.name),
                        name: "choice"
                    }).then(async function(answer){
                        manager = managers.find(e => e.name === answer.choice);
                        await myBLL.getEmployeesByManager(manager).then(res=>{
                            dispayResults(res);
                        });
                    });
                    break;
                case "Quit":
                    isQuit = true;
                    break;
                default:
                    break;
            }            
        });
    }
}

function dispayResults(res){
    console.log("");
    console.table(res);
    console.log("");
}

welcome();

