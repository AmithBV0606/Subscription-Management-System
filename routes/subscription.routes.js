import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  deleteUserSubscription,
  getUserSubscription,
  getUserSubscriptions,
  updateUserSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// All subscription routes :
subscriptionRouter.get("/", authorize, getUserSubscriptions);
subscriptionRouter.post("/", authorize, createSubscription);

// Individual subscription routes :
subscriptionRouter.get("/:id", authorize, getUserSubscription);
subscriptionRouter.put("/:id", authorize, updateUserSubscription);
subscriptionRouter.delete("/:id", authorize, deleteUserSubscription);

export default subscriptionRouter;
