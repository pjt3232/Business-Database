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

