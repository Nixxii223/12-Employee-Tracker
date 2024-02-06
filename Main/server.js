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
  if (userChoice === "View all departments") {
    db.query("SELECT * FROM department", (err, res, fields) => {
      if (err) throw err
      console.table(res)
      mainMenu()
    })
  }
  if (userChoice === "View all roles") {
    db.query("SELECT role.title AS role, employee.role_id FROM employee JOIN role ON employee.role_id = role.id ORDER BY role.title;", (err, res, fields) => {
      if (err) throw err
      console.table(res)
      mainMenu()
    })
  }
  if (userChoice === "View all employees") {
    db.query("SELECT e.id AS employee_id, e.first_name AS employee_first_name, e.last_name AS employee_last_name, e.role_id AS employee_role_id, m.id AS manager_id, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id;", (err, res, fields) => {
      if (err) throw err
      console.table(res)
      mainMenu()
    })
  }
  if (userChoice === "Add a department") {
    addDepartment()
  }
  if (userChoice === "Update an employee role") {
    updateEmployeeRole()
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
  })

}

mainMenu()

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newDept",
      message: "What is the name of the new department?"
    }
  ]).then((newDeptData) => {
    db.query(`INSERT INTO department (department_name) VALUES ('${newDeptData.newDept}')`, (err, res, fields) => {
      if (err) {
        console.log(err)
        return
      }
      console.log("\n", "1 record inserted")
      mainMenu()
    })

  });
}

const updateEmployeeRole = () => {
  db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`, (err, res, fields) => {
    if (err) {
      console.log(err)
      return
    }
    inquirer.prompt([
      {
        type: "list",
        name: "employeeChoice",
        message: "Who is the employee to be updated?",
        choices: res
      }
    ]).then((employeeData) => {
      db.query(`SELECT id AS value, title AS name FROM role`, (err, res, fields) => {
        if (err) {
          console.log(err)
          return
        }
        inquirer.prompt([
          {
            type: "list",
            name: "roleChoice",
            message: "What is the employee's role?",
            choices: res
          }
        ]).then((roleData) => {
          db.query(`UPDATE employee SET role_id = "${roleData.roleChoice}" WHERE id = "${employeeData.employeeChoice}"`, (err, res, fields) => {
            if (err) {
              console.log(err)
              return
            }
            console.log("\n", "Employee role updated.")
            mainMenu()
          })
        }) 
      })
    })
  })
}