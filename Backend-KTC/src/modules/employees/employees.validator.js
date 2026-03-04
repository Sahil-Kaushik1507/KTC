import { body } from "express-validator";


export const employeeValidator = [

    body("employee_name")
        .trim()
        .notEmpty()
        .withMessage("Employee Name is Required")
        .isLength({ min: 3 })
        .withMessage("Employee name can't be of 2 characters"),

    body("phone_no")
        .notEmpty()
        .withMessage("Phone No. is Required")
        .isMobilePhone("en-IN")
        .withMessage("Valid Indian phone number required"),

    body("email")
        .notEmpty()
        .withMessage("Email ID is Required")
        .isEmail()
        .withMessage("Invaild Email"),

    body("date_of_joining")
        .notEmpty()
        .withMessage("Date of Joinig is Required")
        .isDate()
        .withMessage("Invaild Date"),

    body("branch_id")
        .notEmpty()
        .withMessage("Branch ID is required")
        .isInt({ min: 1 })
        .withMessage("Branch ID must be a valid number"),

    body("salary")
        .notEmpty()
        .withMessage("Salary is required")
        .isFloat({ min: 1000 })
        .withMessage("Salary must be a greater than 1000")
        .toFloat(),
    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .trim()
        .toUpperCase()
        .isIn(["MANAGER", "ACCOUNTANT", "OPERATOR", "ADMIN", "HELPER"])
        .withMessage("Invalid role. Role can be: MANAGER, ACCOUNTANT, OPERATOR, ADMIN, HELPER"),


]