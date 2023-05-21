const inquirer = require('inquirer');
const { connection } = require('./assets/js/connection');

function promptMainMenu() {
    return inquirer.promt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View total utilized budget by a department',
                'Exit'
            ],
        },
    ]);
}

function viewAllDepartments() {
    return connection
        .promise()
        .query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.table(rows);
        });
}

function viewAllRoles() {
    return connection   
    .promise()
    .query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
    `)
    .then(([rows]) => {
        console.table(rows);
    });
}

function viewAllEmployees() {
    return connection
        .promise()
        .query(`
        SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title AS job_title,
            department.name AS department,
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON emplyee.role_id = role.id
        LEFT JOIN department on role.department_id = department.id
        LEFT JOIN employee manager on employee.manager_id = manager_id
        `)
        .then(([rows]) => {
            console.table(rows);
        });
}

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
                .query(`INSERT INTO roles SET ?`, answers)
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