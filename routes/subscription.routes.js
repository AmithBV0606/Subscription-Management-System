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

// Fetch the subscription details of a particular user :
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({
    title: "GET(Read) the subscriptions details of a specified user.",
  });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    title: "Cancel the subscriptions of a specified user.",
  });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "Upgrade the subscription.",
  });
});

export default subscriptionRouter;
