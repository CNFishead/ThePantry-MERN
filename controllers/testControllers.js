import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import users from "../data/users.js";

// Create multiple users
// PATH: api/users/test/
const bulkCreate = asyncHandler(async (req, res) => {
  try {
    await User.drop();
    await User.sync();
    await User.bulkCreate(users);

    console.log("Data Imported".green.inverse);
    res.status(200);
  } catch (e) {
    console.error(`${e}`.red.inverse);
  }
});

const bulkDestroy = asyncHandler(async (req, res) => {
  try {
    await User.drop();
    console.log(
      `The User Table has been dropped thus All information is gone`.yellow
        .inverse
    );
  } catch (error) {
    console.error(error.red);
  }
});

export { bulkCreate, bulkDestroy };
