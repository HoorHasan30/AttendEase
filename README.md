# AttendEase
HR Attendance System

## Overview
A tool that reads employee fingerprint IN/OUT data, compares it against a standard company shift and attendance rules, and produces a payroll-ready shortage/overtime report, replacing a manual monthly Excel process.

## Related Links

- **Backend API:** [Deployed Backend URL](https://attendease-ue2t.onrender.com)
- **Frontend Application:** Deployed Frontend URL

## Screenshots


## Technologies Used
- MERN - (MongoDB, Express, React, Node.js)

## ERD 
![erd](ERD.png)

## User Stories
### Company
- As a Company, I want to register in the syetem
- As a Company, I want to register my Hr team into the system
- As a Company, I want to set & edit my attendance rules
### HR
- As HR, I want to sign in into the system.
- As HR, I want to view employees records, filter by date range, and search by employee id.
- As HR, I want to export ther ecords as a excel sheet.
- As HR, I want to upload the biometric file.
- As HR, I want to see a confirmation that the file was read and calculated correctly.
- As HR, I want worked hours calculated automatically per employee per day.
- As HR, I want to see shortage/overtime in minutes, per employee, per day.
- As HR, I want to see a quick overview when I log in (employees, recent activity)


## Features
- Company registration
- User (Company & Hr) login
- Authentication middleware
- Setting attendance rules
- Edittig attendace rules
- Add Hr Team
- Upload biometric punch file (xlsx)
- Auto-calculate shortage/overtime/worked hours per employee, per day, per payroll period accourding to the provided rules
- Export records as excel sheet

## Backend Routes
### Auth
| Method | Route                 | Access       | Description      |
|--------|-----------------------|--------------|------------------|
| POST   | /auth/register-compnay | Public       | Register Company |
| POST   | /auth/register-hr      | Company      | Register HR      |
| POST   | /auth/sign-in          | Compnay / HR | Sign In          |
| GET    | /auth/hr-list              | Company      | Get HR List      |
| DELETE   | /auth/delete-hr/id            | Company      | Delete HR |


### EmployeeRecords
| Method | Route              | Access | Description                      |
|--------|--------------------|--------|----------------------------------|
| GET    | /records           | HR     | Get Employees Attendance Records |
| POST   | /records/dashboard | HR     | Get HR Dashboard Data            |


### Punches
| Method | Route              | Access | Description                     |
|--------|--------------------|--------|---------------------------------|
| POST   | /punches           | HR     | Upload .xlsx File               |
| POST   | /punches/calculate | HR     | Calculate Un-calculated Punches |


### Rules
| Method | Route               | Access       | Description                   |
|--------|---------------------|--------------|-------------------------------|
| GET    | /rules              | Company / HR | View Company Attendance Rules |
| POST   | /rules/set-rules    | Company      | Set Attendance Rule           |
| Put    | /rules/update-rules | Company      | Update Attendance Rules       |


## Frontend Routes
### Public
| Method | Route               | Access       | Description                   |
|--------|---------------------|--------------|-------------------------------|
| GET    | /rules              | Company / HR | View Company Attendance Rules |
| POST   | /rules/set-rules    | Company      | Set Attendance Rule           |
| Put    | /rules/update-rules | Company      | Update Attendance Rules       |

### Company
| Route          | Page           | Access                  |
|----------------|----------------|-------------------------|
| /hr-list       | HrList Page    | Authenticated - Company |
| /company-rules | ShowRules Page | Authenticated - Company |

### HR
| Route             | Page                 | Access             |
|-------------------|----------------------|--------------------|
| /dashboard        | Dashboard Page       | Authenticated - HR |
| /employee-records | EmployeeRecords Page | Authenticated - HR |
| /rules            | ShowRules Page       | Authenticated - HR |


## Future Enhancements
- Add Branches to the copmany 
- Add different working shifts
- Upload employees schedule and compare with the IN/OUT .xlsx file

## Credits
Developed by Hoor Hasan as part of the General Assembly Software Engineering Bootcamp.
