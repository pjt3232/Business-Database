const inquirer = require('inquirer');
const { connection } = require('./connection');

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
                    choices: roles.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Select the employee's manager:",
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

module.exports = {
    addDepartment,
    addRole,
    addEmployee,
}