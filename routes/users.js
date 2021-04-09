const express = require("express");
const userController = require("../controllers/users");
const userRoutes = express.Router();

// Register
userRoutes.post("/register", userController.register);
// Login
userRoutes.post("/login", userController.login);
// Get All User
userRoutes.get("/", userController.getUserAll);
// Update
userRoutes.put("/:id", userController.updateUser);
// Get Profile
userRoutes.get("/:id", userController.getUserById);
// Delete User
userRoutes.delete("/:id", userController.deleteUser);

module.exports = userRoutes;
