import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

// Workflow
// User making a request to get user details -> autjorize middleware -> Verify -> if valid -> next -> get user details

const authorize = async (req, res, next) => {
  try {
    let token;

    // If token exists in the request :
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If token doesn't exists in the request :
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode the token :
    const decoded = jwt.decode(token, JWT_SECRET);

    // Search the user in DB through the decoded token :
    const user = await User.findById(decoded.userId);

    // If there's no such user :
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // If there is such user we'll attach that user object to the request and forward it to the routers and controllers :
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export default authorize;
