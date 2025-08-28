import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

// All user routes :
userRouter.get("/", authorize, getUsers);

userRouter.post("/", (req, res) => {
  res.send({ title: "Create a new user" });
});

// Individual user routes :
userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", (req, res) => {
  res.send({ title: "PUT(Update) an individual user detail." });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE(Remove) an individual user detail." });
});

export default userRouter;
