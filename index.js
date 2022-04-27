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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Exit']
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
        else if (selectionData.startSelection === 'Update an Employee') {
            console.log('Update an Employee Was Selected');
            updateEmployee();
        }
        else {
            return;
        }
    });
}

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
        console.log('Have a great day!');
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

//connect to database upon run, else return err
db.connect(err => {
    if (err) throw err;
    console.log('Database connected successfully!');

    //begin inquirer prompts
    beginPrompt();
})