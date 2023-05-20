USE business_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance');


INSERT INTO role (title, salary, department_id) VALUES 
    ('Sales Manager', 60000, 1),
    ('Sales Representative', 40000, 1),
    ('Marketing Coordinator', 70000, 2),
    ('Financial Analyst' 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Micahel', 'Johnson', 3, 1),
    ('Emily', 'Davis', 4, NULL);