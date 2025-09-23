import express, { Request, Response, type Router } from "express";
import { getHealthy, getTestDB } from "./controllers/apiController";
import { getTestUser } from "./controllers/userController";

const router: Router = express.Router();

router.get("/healthy", getHealthy);
router.get("/testeDB", getTestDB);

router.post("/user", getTestUser);

export default router;