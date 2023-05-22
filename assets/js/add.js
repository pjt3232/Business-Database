const inquirer = require('inquirer');
const { connection } = require('./connection');

//Function for adding a new department
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
//Uses a query to insert the data given into department
function addDepartment() {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        },
    ])
    .then((answers) => {
        return connection
            .promise()
            .query(`INSERT INTO department SET ?`, answers)
            .then(() => {
                console.log('Department added successfully!');
            });
    });
}

//Function for adding a new role
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
//Uses a query to insert all criteria into the role database
function addRole() {
    return connection
        .promise()
        .query(`SELECT * FROM department`)
        .then(([departments]) => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: ' Enter the title of the role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for the role:',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department for the role:',
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: departments.map((department) => ({
                        name: department.name,
                        value: department.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            return connection
                .promise()
                .query(`INSERT INTO role SET ?`, answers)
                .then(() => {
                    console.log('Role added successfully!');
                });
        });
}

//Function for adding a new employee
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
//Uses a query to add all employee info into the employee database
function addEmployee() {
    return connection
        .promise()
        .query(`SELECT * FROM role`)
        .then(([roles]) => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Enter the employee's first name:",
                },
                {
                    input: 'input',
                    name: 'last_name',
                    message: "Enter the employee's last name:",
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "Select the employee's role:",
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: roles.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Select the employee's manager:",
                    //Uses promises and queries to bring up the correct choices given the database's data
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: () => 
                        connection
                            .promise()
                            .query(`SELECT * FROM employee`)
                            .then(([employees]) => 
                                employees.map((employee) => ({
                                    name: `${employee.first_name} ${employee.last_name}`,
                                    value: employee.id,
                                }))
                            ),
                },
            ]);
        })
        .then((answers) => {
            return connection
                .promise()
                .query(`INSERT INTO employee SET ?`, answers)
                .then(() => {
                    console.log('Employee added successfully!');
                });
        });
}

//Exports all the functions in this file to be used in the main file
module.exports = {
    addDepartment,
    addRole,
    addEmployee,
}