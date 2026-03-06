import { body } from "express-validator";


export const registerValidator = [

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

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain one special character"),


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


export const loginValidator =[
        body("email")
        .notEmpty()
        .withMessage("Email ID is Required")
        .isEmail()
        .withMessage("Invaild Email"),
]

export const updateUserValidator=[
    body("phone_no")
        .optional()
        .isMobilePhone("en-IN")
        .withMessage("Valid Indian phone number required"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invaild Email"),

    body("branch_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Branch ID must be a valid number"),

    body("salary")
        .optional()
        .isFloat({ min: 1000 })
        .withMessage("Salary must be a greater than 1000")
        .toFloat(),
    
        body("role")
        .optional()
        .trim()
        .toUpperCase()
        .isIn(["MANAGER", "ACCOUNTANT", "OPERATOR", "ADMIN", "HELPER"])
        .withMessage("Invalid role. Role can be: MANAGER, ACCOUNTANT, OPERATOR, ADMIN, HELPER"),

]


export const newPasswordValidator=[

     body("old_password")
        .notEmpty()
        .withMessage("Old Password is required")
        .isLength({ min: 8 })
        .withMessage("Old Password Invalid")
        .matches(/[A-Z]/)
        .withMessage("Old Password Invalid")
        .matches(/[a-z]/)
        .withMessage("Old Password Invalid")
        .matches(/[0-9]/)
        .withMessage("Old Password Invalid")
        .matches(/[!@#$%^&*]/)
        .withMessage("Old Password Invalid"),
    
    body("new_password")
        .notEmpty()
        .withMessage("New Password is required")
        .isLength({ min: 8 })
        .withMessage("New Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("New Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("New Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("New Password must contain at least one number")
        .matches(/[!@#$%^&*]/)
        .withMessage("New Password must contain one special character"),

]