import { param } from "express-validator";

export const partyIdValidator = [

    param("party_id")
        .trim()
        .notEmpty()
        .withMessage("Party Id is required")
        .toUpperCase()
]