import { validationResult } from "express-validator"
import { AppError } from "../utils/AppError.js"

export const validateRequest = (req, res, next) => {

    const errors = validationResult(req)
    // console.log("inside validate", errors.array()[0].msg)

    if (!errors.isEmpty()) {
        return next(
            new AppError(errors.array()[0].msg, 400)
        )
    }

    next()
}