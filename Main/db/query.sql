SELECT role.title AS role, employee.role_id
FROM employee
JOIN role ON role.id = employee.role_id;

SELECT department.department_name AS department, role.department_id
FROM role
JOIN department
ON role.department_id = department.id
ORDER BY department.department_name;

SELECT role.title AS role, employee.role_id
FROM employee
JOIN role
ON employee.role_id = role.id
ORDER BY role.title;

SELECT
    e.id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    e.role_id AS employee_role_id,
    m.id AS manager_id,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name
FROM
    employee e
LEFT JOIN
    employee m ON e.manager_id = m.id;

