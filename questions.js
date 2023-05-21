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

