import { body } from "express-validator";


export const newSequenceValidator = [

    body("sequence_name")
        .notEmpty()
        .withMessage("Sequence Name is required")
        .isLength({ min: 3 })
        .withMessage("Sequence Name must be minimum 3 Character")
        .toUpperCase(),

    body("next_number")
        .notEmpty()
        .withMessage("Next Number is required")
        .isInt({ min: 1 })
        .withMessage("Next Number must be a valid number")


];

export const getNextNumberValidator = [

    body("sequence_name")
        .notEmpty()
        .withMessage("Sequence Name is required")
        .isLength({ min: 3 })
        .withMessage("Sequence Name must be minimum 3 Character")
        .toUpperCase(),



];