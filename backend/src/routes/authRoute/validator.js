
import { body } from "express-validator";
import { Validatore } from "../validator.js";
export const validatoreAuth = new (class ValidatoreAuth extends Validatore {
  constructor() {
    super();
  }

  register() {
    return [
      body("email")
        .isEmail()
        .withMessage("email cannot be empty")
        .notEmpty()
        .withMessage("email cannot be empty"),
      // .not(),
      body("mobile")
        .isLength({min: 11, max:11})
        .matches(/^(09|\+639)\d{9}$/)
        .withMessage("The mobile number is wrong")
        .notEmpty()
        .withMessage("mobile cannot be empty"),
      // .not(),
      body("username")
        .isLength({ min: 4, max: 21 })
        .withMessage("user name must be at least 4 cahracters")
        .notEmpty()
        .withMessage("Username cannot be empty"),
      // .not(),
      body("password")
        .isLength({ min: 8,max:20 })
        .withMessage("password must be at least 8 characters")
        .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/)
        .withMessage(
          "password must contain string, at least one special and one numeric character"
        ),
    ];
  }
  login() {
    return [
      body("username")
        .isLength({ min: 4, max: 21 })
        .withMessage("user name must be at least 4 cahracters")
        .notEmpty()
        .withMessage("Username cannot be empty"),
        // .not()
      body("password")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters")
        .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/)
        .withMessage(
          "password must contain string, at least one special and one numeric character"
        ),
    ];
  }
})();
