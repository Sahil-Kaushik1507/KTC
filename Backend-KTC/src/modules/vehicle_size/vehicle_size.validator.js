import { body } from "express-validator";


export const vehicleSizeValidator = [

    body("size_name")
        .notEmpty()
        .withMessage("Vehicle Size is required")
        .toUpperCase(),


];