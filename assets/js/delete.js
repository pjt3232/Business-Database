//Imports inquirer and the connection object for MySQL
const inquirer = require('inquirer');
const { connection } = require('./connection');

//Function for deleting a department
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
//Uses a query and inquirer prompt to delete the department chosen by the user
//The .then(answers) section creates null values for employee and role to add the deature to delete a department without deleteing the employee's or role
function deleteDepartment() {
    return connection
        .promise()
        .query(`SELECT * FROM department`)
        .then(([departments]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department to delete:',
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: departments.map((department) => ({
                        name: department.name,
                        value: department.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            //Updates the associated role ids in the department to NULL 
            const departmentId = answers.department_id
            const updateRolesPromise = connection
                .promise()
                .query(`UPDATE role SET department_id = NULL WHERE department_id = ?`, [departmentId]);
            //Updates the associated employee's role id that is included in the deleted department to NULL
            const updateEmployeesPromise = connection
                .promise()
                .query(`
                UPDATE employee
                INNER JOIN role ON employee.role_id = role.id
                SET employee.role_id = NULL
                WHERE role.department_id = ?`, 
                [departmentId]);

            //Deletes the department using promises and a query that uses the answer from the prompt
            return Promise.all([updateRolesPromise, updateEmployeesPromise])
                .then(() => {
                    return connection
                        .promise()
                        .query(`DELETE FROM department WHERE id = ?`, answers.department_id);
                });
        })
        .then(() => {
            console.log('Department deleted successfully!');
        });
}

//Function that deletes a role
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
//Uses a query that deletes the role given its id
//The .then(answers) section creates null values for employee to add the feature to delete a role without deleteing the employee
function deleteRole() {
    return connection
        .promise()
        .query(`SELECT * FROM role`)
        .then(([roles]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the role to delete:',
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: roles.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            const roleId = answers.role_id;
            //Update the associated employees' roles to null
            const updateEmployeesPromise = connection
                .promise()
                .query(`UPDATE employee SET role_id = NULL WHERE role_id = ?`, [roleId]);

            //Deletes the role using promises and a query using the answer from the prompt
            return Promise.all([updateEmployeesPromise])
                .then(() => {
                    return connection
                        .promise()
                        .query(`DELETE FROM role WHERE id = ?`, [answers.role_id]);    
                });
        })
        .then(() => {
            console.log('Role deleted successfully!');
        });
}

//Function to delete an employee
//Uses inquirer prompt and the user's answer to build database
//Uses a promise object to handle the asynchronous operation
//Uses a query to delete an employee given the employee's id
function deleteEmployee() {
    return connection
        .promise()
        .query(`SELECT * FROM employee`)
        .then(([employees]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee to delete:',
                    //Creates an array of objects with a name property and a value property which is assigned
                    choices: employees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            return connection
                .promise()
                .query(`DELETE FROM employee WHERE id = ?`, [answers.employee_id])
                .then(() => {
                    console.log('Employee deleted successfully!');
                });
        });
}

//Exports all the functions in this file to the main file
module.exports = {
    deleteDepartment,
    deleteRole,
    deleteEmployee,
}