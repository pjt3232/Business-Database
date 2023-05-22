const inquirer = require('inquirer');
const { connection } = require('./assets/js/connection');
const viewFunctions = require('./assets/js/view');
const addFunctions = require('./assets/js/add');
const updateFunctions = require('./assets/js/update');
const deleteFunctions = require('./assets/js/delete');

function promptMainMenu() {
    return inquirer.prompt([
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
    ])
    .then((answers) => {
        return handleMainMenuChoice(answers.action);
    });
}

function handleMainMenuChoice(choice) {
    switch (choice) {
        case 'View all departments':
            return viewFunctions.viewAllDepartments();
        case 'View all roles':
            return viewFunctions.viewAllRoles();
        case 'View all employees':
            return viewFunctions.viewAllEmployees();
        case 'Add a department':
            return addFunctions.addDepartment();
        case 'Add a role':
            return addFunctions.addRole();
        case 'Add an employee':
            return addFunctions.addEmployee();
        case 'Update an employee role':
            return updateFunctions.updateEmployeeRole();
        case 'Update an employee manager':
            return updateFunctions.updateEmployeeManager();
        case 'View employees by manager':
            return viewFunctions.viewEmployeesByManager();
        case 'View employees by department':
            return viewFunctions.viewEmployeesByDepartment();
        case 'Delete a department':
            return deleteFunctions.deleteDepartment();
        case 'Delete a role':
            return deleteFunctions.deleteRole();
        case 'Delete an employee':
            return deleteFunctions.deleteEmployee();
        case 'View total utilized budget by a department':
            return viewFunctions.viewUtilizedBudget();
        case 'Exit':
            connection.end();
            break;
        default:
            console.log('Invalid choice. Please select a valid option.');
            promptMainMenu().then(({ action }) => handleMainMenuChoice(action));
    }
}

promptMainMenu();

