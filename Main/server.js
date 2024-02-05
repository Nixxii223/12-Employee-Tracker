// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const makeSelection = (userChoice) => {
  if(userChoice === "View all departments") {
    db.query("SELECT department.department_name AS department, role.department_id FROM role JOIN department ON role.department_id = department.id ORDER BY department.department_name", (err, res, fields) => {
      if(err) throw err
      console.table(res)
      mainMenu()
    })
  }
  if(userChoice === "View all roles") {
    db.query("SELECT role.title AS role, employee.role_id FROM employee JOIN role ON employee.role_id = role.id ORDER BY role.title;", (err, res, fields) => {
      if(err) throw err
      console.table(res)
      mainMenu()
    })
  }
  if(userChoice === "View all employees") {
    
  }


}

const mainMenu = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    }
  ]).then((data) => {
    makeSelection(data.userChoice)
    mainMenu()
  })

}

mainMenu()