import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword as encrypt } from "../utils/hashPassword.js";

/*
  DESC:   Create a new user
  PATH:   /api/users
  ACCESS: Public, anyone can create a new user
*/
const registerUser = asyncHandler(async (req, res) => {
  // Pull out values from the req body
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await encrypt(password);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    if (user) {
      res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (e) {
    console.error(e);
  }
});

/*
  DESC:   GET all users
  PATH:   /api/users
  ACCESS: Private, only admins should return all the user objects
*/
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.json({ msg: e });
  }
});

/*
  DESC:   Delete a user by :id
  PATH:   /api/users
  ACCESS: Private, only admins should delete users
  NOTE: *** Doesnt actually delete a user, just sets the isActive Flag to false ***
*/
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // Look for a user with id of :id, that IS active, we dont care about already deleted accounts.
    const userToBeDeleted = await User.findOne({
      where: { id: req.params.id, isActive: true },
    });
    if (userToBeDeleted) {
      userToBeDeleted.update({ isActive: false });
      res.status(201).json({ msg: "User was deleted" });
    } else {
      res.status(400).json({ msg: "Bad Request, Try again" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({
      msg: `Something went wrong, likely the user is already deleted.`,
    });
  }
});

/*
  DESC:   Update a user by :id
  PATH:   /api/users
  ACCESS: Private, only admins should be able to update a user object
  NOTE: 
*/
const updateUser = asyncHandler(async (req, res) => {
  try {
    // Look for a user with id of :id, that IS active, we dont care about already deleted accounts.
    const updatedUser = await User.findOne({
      where: { id: req.params.id, isActive: true },
    });
    // Pull values out of the req body
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await encrypt(password);
    if (updatedUser) {
      updatedUser.set(
        {
          firstName,
          lastName,
          email,
          password: await hashPassword.toString(),
        },
        { where: { id: req.params.id } }
      );
      await updatedUser.save();
      res.status(201).json({
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(400).json({ msg: "Bad Request, Try again" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({
      msg: `Something went wrong`,
      error: e,
    });
  }
});

export { registerUser, getUsers, deleteUser, updateUser };
