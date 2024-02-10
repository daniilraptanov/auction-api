import { UserController } from "../controllers/user.controller";
import { validateParams } from "../middleware/validate-params.middleware";
import { loginSchema, registrationSchema } from "../schemas/user-auth.schemas";

const { Router } = require("express");
const AuthRouter = Router();

AuthRouter.post(
  "/registration",
  validateParams(registrationSchema),
  UserController.registration
);

AuthRouter.post(
  "/login", 
  validateParams(loginSchema),
  UserController.login  
);

export { AuthRouter };
