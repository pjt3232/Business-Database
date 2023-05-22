//Imports npm package for MySQL & connection object
//Imports all of the functions for the database from the other files
const inquirer = require('inquirer');
const { connection } = require('./assets/js/connection');
const viewFunctions = require('./assets/js/view');
const addFunctions = require('./assets/js/add');
const updateFunctions = require('./assets/js/update');
const deleteFunctions = require('./assets/js/delete');

//Uses inquirer to prompt a main menu to select which action to run
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
        //Runs the function that will handle the action chosen
        return handleMainMenuChoice(answers.action);
    });
}

//Uses switch statment to handle the various cases from the main menu
function handleMainMenuChoice(choice) {
    switch (choice) {
        case 'View all departments':
            viewFunctions.viewAllDepartments()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'View all roles':
            viewFunctions.viewAllRoles()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'View all employees':
            viewFunctions.viewAllEmployees()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Add a department':
            addFunctions.addDepartment()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Add a role':
            addFunctions.addRole()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Add an employee':
            addFunctions.addEmployee()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Update an employee role':
            updateFunctions.updateEmployeeRole()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Update an employee manager':
            updateFunctions.updateEmployeeManager()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'View employees by manager':
            viewFunctions.viewEmployeesByManager()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'View employees by department':
            viewFunctions.viewEmployeesByDepartment()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Delete a department':
            deleteFunctions.deleteDepartment()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Delete a role':
            deleteFunctions.deleteRole()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Delete an employee':
            deleteFunctions.deleteEmployee()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'View total utilized budget by a department':
            viewFunctions.viewUtilizedBudget()
                .then(() => {
                    return promptMainMenu();
                });
            break;
        case 'Exit':
            connection.end();
            break;
        default:
            console.log('Invalid choice. Please select a valid option.');
            promptMainMenu().then(({ action }) => handleMainMenuChoice(action));
    }
}

//Runs the main menu function when application is started
promptMainMenu();


