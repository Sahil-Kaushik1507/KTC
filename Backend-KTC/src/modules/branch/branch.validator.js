import { body,param } from "express-validator";

export const branchValidator = [

    body("branch_name")
        .notEmpty()
        .withMessage("Branch name is required")
        .isLength({ max: 150 })
        .withMessage("Branch name cannot exceed 150 characters"),

    body("address")
        .notEmpty()
        .withMessage("Address is required")
        .isString()
        .withMessage("Address must be a string"),

    body("next_docket")
        .notEmpty()
        .withMessage("Next docket is required")
        .isInt({ min: 1 })
        .withMessage("Next docket must be a positive integer")
        .toInt(),

    
    body("manager_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Manager ID must be a valid number"),

];


export const branchManagerValidator = [

    body("branch_id")
        .notEmpty()
        .withMessage("Branch ID is required")
        .isInt({ min: 1 })
        .withMessage("Branch ID must be a valid number"),


    body("manager_id")
        .notEmpty()
        .withMessage("Manager ID is required")
        .isInt({ min: 1 })
        .withMessage("Manager ID must be a valid number"),

];


export const viewBranchValidator = [

    param("branch_id")
        .notEmpty()
        .withMessage("Branch ID is required")
        .isInt({ min: 1 })
        .withMessage("Branch ID must be a valid number"),


];