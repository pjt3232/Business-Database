const inquirer = require('inquirer');
const { connection } = require('./connection');

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
                    choices: employees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the new role for the employee:',
                    choices: () =>
                        connection
                            .promise()
                            .query(`SELECT * FROM role`)
                            .then(([roles]) =>
                                roles.map(([role]) => ({
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

function updateEmployeeManager() {
    return connection
        .promise()
        .query(`SELECT * FROM employee`)
        .then(([employees]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee to update:',
                    choices: employees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select the new manager for the employee:',
                    choices: () =>
                        connection
                            .promise()
                            .query(`SELECT * FROM employee WHERE id != ?` [answers.employee_id])
                            .then(([managers]) => 
                                managers.map((manager) => ({
                                    name: `${manager.first_name} ${manager.last_name}`,
                                    value: manager.id,
                                }))
                            ),
                },
            ]);
        })
        .then((answers) => {
            return connection
                .promise()
                .query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [
                    answers.manager_id,
                    answers.employee_id,
                ])
                .then(() => {
                    console.log('Employee manager updated successfully!');
                });
        });
}

module.exports = {
    updateEmployeeRole,
    updateEmployeeManager,
}