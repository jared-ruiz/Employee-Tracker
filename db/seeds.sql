INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Finance'),
    ('HR'),
    ('Sales');

INSERT INTO  role (title, salary, department_id)
VALUES
    ('Marketing Associate', 40000.00, 1),
    ('Sales Lead', 45000.00, 4),
    ('Customer Service', 35000.00, 3),
    ('Financial Advisor', 60000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jake', 'Lorem', 2, 2),
    ('Cathy', 'Stark', 4, NULL),
    ('Bart', 'Skev', 3, NULL),
    ('Stacey', 'Climmings', 1, NULL);