import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: {
        subscription,
        workflowRunId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async (req, res, next) => {
  try {
    const updateSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      data: updateSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserSubscription = async (req, res, next) => {
  try {
    const deleteSubscription = await Subscription.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: deleteSubscription,
    });
  } catch (error) {
    next(error);
  }
};
