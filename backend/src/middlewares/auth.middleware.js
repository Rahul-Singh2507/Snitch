import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";   


export const authMiddleware = async (req, res, next) => {
    let token;

    // 1. Try cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // 2. Try Authorization header (Postman)
    else if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, no token provided"
        });
    }

    try {
        console.log("VERIFY SECRET:", config.JWT_SECRET);
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        if (user.role !== "seller") {
            return res.status(403).json({
                message: "Forbidden, only sellers can perform this action"
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};