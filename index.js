const inquirer = require('inquirer');

//importing mysql database connection
const db = require('./db/connection');

const cTable = require('console.table');

//prompt start. Branch out from here.
const beginPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'startSelection',
            message: 'Please select an option.',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit']
        }
    ])
    //take inquirer data and parse for selection
    .then(selectionData => {
        //view all departments
        if (selectionData.startSelection === 'View All Departments') {
            console.log('View All Departments Was Selected');
            getAllDepartments();
        }
        //view all roles
        else if (selectionData.startSelection === 'View All Roles') {
            console.log('View All Roles Was Selected');
            getAllRoles();
        }
        //view all employees
        else if (selectionData.startSelection === 'View All Employees') {
            console.log('View All Employees Was Selected');
            getAllEmployees();
        }
        //add a department
        else if (selectionData.startSelection === 'Add a Department') {
            console.log('Add a Department Was Selected');
            addDepartment();
        }
        //add a role
        else if (selectionData.startSelection === 'Add a Role') {
            console.log('Add a Role Was Selected');
            addRole();
        }
        //add an employee
        else if (selectionData.startSelection === 'Add an Employee') {
            console.log('Add an Employee Was Selected');
            addEmployee();
        }
        //update an existing employee
        else if (selectionData.startSelection === 'Update Employee Role') {
            console.log('Update Employee Role Was Selected');
            updateEmployeeRole();
        }
        else {
            console.log('Press "CTRL + C" to exit.');
            return;
        }
    });
}

//ask if the user would like to return to start of data selection
const returnToPrompt = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmReturn',
            message: 'Would you like to return to data selection?',
            default: false
        }
    ])
    .then(returnInfo => {
        if (returnInfo.confirmReturn) {
            console.log('-----------------------------------')
            console.log('~ Returning to Starting Selection ~');
            console.log('-----------------------------------');
            beginPrompt();
        }
        console.log('Press "CTRL + C" to exit.');
        return;
    })
}

getAllEmployees = (selectionData) => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);

        //confirm return to starting selection
        returnToPrompt();
    });
}

getAllRoles = (selectionData) => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);

        //confirm return to starting selection
        returnToPrompt();
    });
}

getAllDepartments = (selectionData) => {   
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);

        //confirm return to starting selection
        returnToPrompt();
    });
}

addDepartment = () => {

    return inquirer.prompt ([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please provide the name of the department you would like to add.'
        }
    ])
    .then(departmentInfo => {
        const sql = `INSERT INTO department (name)
        VALUES (?)`;
        const params = departmentInfo.departmentName;

        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(`Successfully added ${departmentInfo.departmentName} to the database.`);
            
            //ask if they would like to return to database selection
            returnToPrompt();
        });
        
    })
}

addRole = () => {
    
    //make query here to show current roles and departments
    //this will allow them to pick an existing department's id correctly

    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please provide a title for this new role.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please input the salary associated with this new role.'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Please provide the department ID.'
        }
    ])
    .then(roleInfo => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`
        const params = ([roleInfo.roleName, roleInfo.salary, roleInfo.departmentId]);

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`Successfully added ${roleInfo.name} to the database.`);

            //ask if they would like to return to database selection
            returnToPrompt();
        })
    })
}

addEmployee = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "Please provide the employee's First Name."
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Please provide the employee's Last Name."
        },
        {
            type: 'input',
            name: 'roleId',
            message: "Please provide the emplmoyee's Role ID."
        },
        {
            type: 'list',
            name: 'managerConfirm',
            message: 'Does this employee have a manager they report to?',
            choices: ['Yes', 'No'],
            default: 'No'
        },
        {
            type: 'input',
            name: 'managerId',
            message: "Please provide the manager's ID.",
            when: (response) => response.managerConfirm === 'Yes'
        }
    ])
    .then(employeeInfo => {
        if (employeeInfo.managerConfirm === 'Yes') {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;
            const params = [employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId];
        
            db.query(sql, params, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Successfully added ${employeeInfo.firstName, employeeInfo.lastName} to the database.`);
                
                //ask if they would like to return to database selection
                returnToPrompt();
            });
        }
        
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?, ?, ?)`;
        const params = [employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`Successfully added ${employeeInfo.firstName, employeeInfo.lastName} to the database.`);
            
            //ask if they would like to return to database selection
            returnToPrompt();
        });
    })
}

updateEmployeeRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: "Pleaes provide the ID of the employee you wish to update."
        },
        {
            type: 'input',
            name: 'roleChangeId',
            message: 'Please provide the updated Role ID you wish to change to.'
        }
    ])
    .then(employeeSelection => {
        const sql = `UPDATE employee SET role_id = ?
        WHERE id = ?`;
        const params = [employeeSelection.roleChangeId, employeeSelection.employeeId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Successfully Updated Role ID.');
            
            //ask if they would like to return to database selection
            returnToPrompt();
        })
    })
}

//connect to database upon run, else return err
db.connect(err => {
    if (err) throw err;
    console.log('Database connected successfully!');

    //begin inquirer prompts
    beginPrompt();
})