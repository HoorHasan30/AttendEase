# AttendEase
HR Attendance System

## Overview
A tool that reads employee fingerprint IN/OUT data, compares it against a standard company shift and attendance rules, and produces a payroll-ready shortage/overtime report, replacing a manual monthly Excel process.

## Related Links


## Technologies Used
- MERN - (MongoDB, Express, React, Node.js)

## ERD 
![erd](ERD.png)

## User Stories
- As HR, I can sign up and set my attendance rules (late allowance, missing punch allowance).
- As HR, I can log in to see my own branches, employees, and reports.
- As HR, I can change my rules later from the Settings page.
- As HR, I can add a branch (Office, Branch).
- As HR, I can add shifts to a branch (start time, end time).
- As HR, I can edit or remove a branch or shift.
- As HR, I can view employees, filter by date range and branch, and search by name.
- As HR, I can export an employee's record as a PDF.
- As HR, I can upload the biometric file and pick which branch it belongs to.
- As HR, I can see a confirmation that the file was read correctly.
- As HR, I can generate a report for a specific payroll period.
- As HR, I want worked hours calculated automatically per employee per day.
- As HR, I want to see shortage/overtime in minutes, per employee, per day.
- As HR, I want to see a quick overview when I log in (employees, recent activity)

## Features
- User registration
- User login and authentication
- Authentication middleware
- Setting attendance rules
- Upload biometric punch file (xlsx/csv)
- Auto-calculate shortage/overtime/worked hours per employee, per day, per payroll period accourding to the provided rules
