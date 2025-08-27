import { Router } from "express";

const userRouter = Router();

// All user routes :
userRouter.get("/", (req, res) => {
  res.send({ title: "GET all users details." });
});

userRouter.post("/", (req, res) => {
  res.send({ title: "Create a new user" });
});

// Individual user routes :
userRouter.get("/:id", (req, res) => {
  res.send({ title: "GET a individual user detail." });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "PUT(Update) an individual user detail." });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE(Remove) an individual user detail." });
});

export default userRouter;
