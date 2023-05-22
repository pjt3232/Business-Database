const inquirer = require('inquirer');
const { connection } = require('./connection');

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
                    choices: departments.map((department) => ({
                        name: department.name,
                        value: department.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            const departmentId = answers.department_id
            const updateRolesPromise = connection
                .promise()
                .query(`UPDATE role SET department_id = NULL WHERE department_id = ?`, [departmentId]);
            const updateEmployeesPromise = connection
                .promise()
                .query(`
                UPDATE employee
                INNER JOIN role ON employee.role_id = role.id
                SET employee.role_id = NULL
                WHERE role.department_id = ?`, 
                [departmentId]);

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
                    choices: roles.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
            ]);
        })
        .then((answers) => {
            return connection
                .promise()
                .query(`DELETE FROM role WHERE id = ?`, [answers.role_id])
                .then(() => {
                    console.log('Role deleted successfully!');
                });
        });
}

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

module.exports = {
    deleteDepartment,
    deleteRole,
    deleteEmployee,
}