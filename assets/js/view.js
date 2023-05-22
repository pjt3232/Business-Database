const { connection } = require('./connection');

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
            employee.last_name AS employee_last_name,
        FROM employee
        INNER JOIN employee manager ON employee.manager_id = manager.id
        ORDER BY manager.id, employee.id
        `)
        .then(([rows]) => {
            console.table(rows);
        });
}

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

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    viewUtilizedBudget,
}