class Questions{
    get mainMenu(){
        let choices = ["View All Employees",
        "View Departments",
        "View Roles",
        "Update Employee Role",
        "View employees by Manager",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Quit"];
        return {
            type:"list",
            message:"Main Menu:",
            choices: choices,
            name:"choice",
            pageSize: choices.length 
        };
    }

}

module.exports = Questions;

this.internQuestions = [{  
    type:"input",
    message: "What is the intern's Name?",
    name: "name"
},
{  type:"input",
    message: "What is the intern's ID?",
    name: "id"
},
{  type:"input",
    message: "What is the intern's email?",
    name: "email"
},
{  type:"input",
    message: "What is the intern's school",
    name: "school"
}];
