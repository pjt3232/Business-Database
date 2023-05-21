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

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
}