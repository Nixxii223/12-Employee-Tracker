SELECT department.department_name AS department, role.department_id
FROM role
JOIN department
ON role.department_id = department.id
ORDER BY department.department_name;

SELECT role.title AS employee, employee.role_id
FROM employee
JOIN role
ON employee.role_id = role.id
ORDER BY role.id;
