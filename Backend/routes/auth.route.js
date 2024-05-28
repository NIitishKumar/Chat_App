import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router  = Router();

router.post("/signup", signup)

router.get("/login",login)

router.get("/logout", login)

export default router;