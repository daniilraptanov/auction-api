import { UserController } from "../controllers/user.controller";
import { validateParams } from "../middleware/validate-params.middleware";
import { loginSchema, registrationSchema } from "../schemas/user-auth.schemas";

const { Router } = require("express");
const router = Router();

router.post(
  "/registration",
  validateParams(registrationSchema),
  UserController.registration
);

router.post(
  "/login", 
  validateParams(loginSchema),
  UserController.login  
);

module.exports = router;
