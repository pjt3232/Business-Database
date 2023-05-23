USE business_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES 
    ('Sales Representative', 50000, 1),
    ('Sales Manager', 80000, 1),
    ('Marketing Specialist', 60000, 2),
    ('Marketing Manager', 90000, 2),
    ('Accountant', 70000, 3),
    ('Finance Manager', 100000, 3),
    ('HR Coordinator', 55000, 4),
    ('HR Manager', 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Mike', 'Johnson', 3, 2),
    ('Sarah', 'Williams', 4, 2),
    ('David', 'Brown', 5, 3),
    ('Karen', 'Davis', 6, 3),
    ('Amy', 'Wilson', 7, 4),
    ('Michael', 'Taylor', 8, 4);