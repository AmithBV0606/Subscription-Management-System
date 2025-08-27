import { Router } from "express";

const subscriptionRouter = Router();

// All subscription routes :
subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions." });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "Create a subscriptions." });
});

// Individual subscription routes :
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET an individual subscription details." });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "PUT(Update) a subscriptions detail." });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE(Remove) a subscriptions detail." });
});

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
