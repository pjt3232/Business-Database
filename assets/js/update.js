//Imports inquirer and the connection object for MySQL
const inquirer = require('inquirer');
const { connection } = require('./connection');

//Function for updating an employee's role
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
function updateEmployeeRole() {
    return connection
        .promise()
        .query(`SELECT * FROM employee`)
        .then(([employees]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee to update:',
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: employees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the new role for the employee:',
                    //Uses promises and queries to display the choices given the database's data
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: () =>
                        connection
                            .promise()
                            .query(`SELECT * FROM role`)
                            .then(([roles]) =>
                                roles.map((role) => ({
                                    name: role.title,
                                    value: role.id,
                                }))
                            ),
                },
            ]);
        })
        .then((answers) => {
            return connection
                .promise()
                .query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
                    answers.role_id,
                    answers.employee_id,
                ])
                .then(() => {
                    console.log('Employee role updated successfully!');
                });
        });
}


//Function for updating an employee's manager
//Uses a promise object to handle the asynchronous operation
//Uses a query to update the the employee's manager at a set id
function updateEmployeeManager() {
    let selectedEmployeeId;

    return connection
        .promise()
        .query(`SELECT * FROM employee`)
        .then(([employees]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee to update:',
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: employees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            selectedEmployeeId = answers.employee_id;

            return getManagerChoices(selectedEmployeeId);
        })
        .then((managerChoices) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select the new manager for the employee:',
                    choices: managerChoices,
                },
            ]);
        })
        .then((answers) => {
            const selectedManagerId = answers.manager_id;

            return connection
                .promise()
                .query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [
                    selectedManagerId,
                    selectedEmployeeId,
                ])
                .then(() => {
                    console.log('Employee manager updated successfully!');
                });
        });
}

//Function that is used in updateEmployeeManager to grab all of the choices of employees that could be the manager
//Uses a promise object to handle the asynchronous operation
//Uses a query to show all the employees besides the one being updated
//Creates an array of objects with map with a name property and a value property which is assigned
function getManagerChoices(employeeId) {
    return connection
        .promise()
        .query(`SELECT * FROM employee WHERE id != ?`, [employeeId])
        .then(([managers]) => 
            managers.map((manager) => ({
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id,
            }))
        );
}

//Exports all of the functions in this file to be used in the main file
module.exports = {
    updateEmployeeRole,
    updateEmployeeManager,
    getManagerChoices,
}