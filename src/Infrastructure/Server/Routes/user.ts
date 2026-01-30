import express, { type Router } from "express";

const UserRouter: Router = express.Router();

UserRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "OK"
    });
});

export default UserRouter;