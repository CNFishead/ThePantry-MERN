import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";

import User from "./models/userModel.js";

import connectDB from "./config/db.js";

dotenv.config();
console.log(process.env.DBPASS);

connectDB();

const importData = async () => {
  try {
    await User.drop();
    await User.sync();

    await User.bulkCreate(users);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.bulkDestroy();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
