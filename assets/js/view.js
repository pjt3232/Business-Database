//Imports the connection object for MySQL
const { connection } = require('./connection');

//Function to handle viewing all departments
//Uses a promise object to handle the asynchronous operation
//A query to select all departments
function viewAllDepartments() {
    return connection
        .promise()
        .query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.table(rows);
        });
}

//Function for viewing all roles
//Uses a promise object to handle the asynchronous operation
//A query to select all role data under department and returns the matching values with the department.id from both tables
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

//Function to handle viewing all employees
//Uses a promise object to handle the asynchronous operation
//A query to select all needed employee data and labels role.title as job_title and department.name as department
//The query then concatonates the manager's first and last name under manager
//The query uses LEFT JOIN to return all rows for the left tables and the matching rows from the right tables
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
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
        `)
        .then(([rows]) => {
            console.table(rows);
        });
}

//Function for viewing all employees by their manager
//Uses a promise object to handle the asynchronous operation
//A query to select all employee data from employee and returns the matching values from manager.id from both tables
//The query is ordered by manager.id & employee.id
function viewEmployeesByManager() {
    return connection
        .promise()
        .query(`
        SELECT
            manager.id AS manager_id,
            manager.first_name AS manager_first_name,
            manager.last_name AS manager_last_name,
            employee.id AS employee_id,
            employee.first_name AS employee_first_name,
            employee.last_name AS employee_last_name
        FROM employee
        INNER JOIN employee manager ON employee.manager_id = manager.id
        ORDER BY manager.id, employee.id
        `)
        .then(([rows]) => {
            console.table(rows);
        });
}

//Function for viewing employees by their department
//Uses a promise object to handle the asynchronous operation
//A query to select employee id and name along with department name and id from employee
//Returns the matching data of role.id & department.id in both tables & orders them by department.id and employee.id
function viewEmployeesByDepartment() {
    return connection
        .promise()
        .query(`
        SELECT
            department.id AS department_id,
            department.name AS department_name,
            employee.id AS employee_id,
            employee.first_name AS employee_first_name,
            employee.last_name AS employee_last_name
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        ORDER BY department.id, employee.id
        `)
        .then(([rows]) => {
            console.table(rows);
        });
}

//Function for viewing the total budget utilized (combined salaries) of each department
//Uses a promise object to handle the asynchronous operation
//A query that selects the department name as department and the sum of all salaries as utilized budget from employee
//Returns matching data using role.id and department.id from both tables and groups by department name
function viewUtilizedBudget () {
    return connection
        .promise()
        .query(`
        SELECT
            department.name AS department,
            SUM(role.salary) AS utilized_budget
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        GROUP BY department.name
        `)
        .then(([rows]) => {
            console.table(rows);
        });
}

//Exports all the functions in this file to the main file
module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    viewUtilizedBudget,
}