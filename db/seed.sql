use employee_db;
insert into department (name) values 
("Human Resources"),
("IT"),
("Sales"),
("Accounting"),
("Logistics"),
("Customer Service"),
("Recruiting"),
("Upper Management"),
("Payroll");

insert into role (title, salary, department_id) values
("Receptionist", 40000, 6),
("IT Manager",65000,2),
("Database Admin",65000,2),
("Recruitment Specialist",60000,7),
("Work Force Coordinator",50000,5),
("CSR",45000,6),
("Payroll Administrator",55000,9),
("Office Culture Manager",65000,1),
("Fulfillment Director", 70000, 3),
("President of Sales",115000,3),
("Accounts Receivable Analyst",60000,4),
("Accounts Payable Analyst",60000,4),
("Project Accountant",80000,4),
("Senior Accountant",90000,4),
("Prodcut Specialist", 66000,2),
("Dispatcher",55000,5),
("Full Stack Developer",90000, 2),
("CEO", 200000, 8),
("COO",190000,8),
("CTO",185000,8); 

insert into employee (first_name, last_name, role_id, manager_id) values
("Annora", "Merrit",20,null),
("Anissa","Escarcega",18,null),
("Ikram", "Barzetti",19,null),
("Belenos","Schnieder",2,1),
("Eva","Assenberg",1,2),
("Mathias","Lowry",5,null),
("Joaquin","Jokinen",6,null),
("Kalman","Ventura",7,null),
("Yadira","Robert",8,null),
("Kamryn","Kinley",17,1),
("Apollonia","Choudhary",11,13),
("Crispus","Kovac",11,13),
("Astra","Pavic",13,2),
("Heli","Muller",15,4);