# Challenge -12
## Employee Tracker

- For the twelfth challenge of my bootcamp, I am tasked with creating a CMS application that populates and edits the employee database in the command line. It will allow the user to view employees, edit and select through current data. I will be using inquirer, node, mysql2, and console.table.

<br>
<br>

## User Story
---

- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business

## Criteria to be considered complete (Apr. 2022)
---

GIVEN a command-line application that accepts user input
> WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
> WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
> WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
> WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
> WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
> WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
> WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
> WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

<br>
<br>

## Table of Contents
---
- [Installation](#installation)
- [Usage](#usage)
- [License Information](#license-information)
- [Questions](#questions)
- [Working Example of Project](#working-example-of-project)

## Installation
---
- Download repository, sign into mysql in your terminal, run "db/db.sql" to first initialize the database "employee_database." Then run "source db/schema.sql" to create the tables associated with the database. You can run "source db/seeds.sql" to populate the table with example data if you would like. 

- Next go to the connections.js file, and input your username and password to allow mysql2 to connect with the project.

- Now you can run "node index" in terminal to begin the question prompts and work with the database.

## Usage
---
- This application will allow the user to view all tables and their contents, add new data to each table, and edit an existing employee's role upon request. 


## License Information
---
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
<br/>

## Questions
---
- If you have any further questions, contact me here: [GitHub](https://github.com/jared-ruiz)

## Working Example of Project
---

![Gif](./src/employee-tracker%20example.gif)

## Weekly Reflection
---

This assignment was pretty fun to do actually. There was a lot of stuff I had to go back and reference from past modules but using inquirer for CLI prompts is interesting to me. I had to learn a lot about Mysql as well since it was intirely new to me but I think I have a good understanding of the basics to get things rolling. The modules are getting very lengthy and filled with content so I'm trying my best to knock them out as fast as I can so I can spend more time on the assignment. Every week I am getting closer to my goal so even if I feel overwhelmed, I have to keep going. I'll look back at this and be glad that I kept strong. Here's to another week!

-J