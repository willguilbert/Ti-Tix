import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { Password } from "../services/password";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError(
        "Something went wrong when trying to log you in"
      );
    }
    const passMatch = Password.compare(existingUser.password, password);
    if (!passMatch) {
      throw new BadRequestError(
        "Something went wrong when trying to log you in"
      );
    }
    // Gen JWT
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store on session obj
    req.session = {
      jwt: token,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
