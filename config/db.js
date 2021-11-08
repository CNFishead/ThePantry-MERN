import { Sequelize } from "sequelize";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const user = "postgres";
const host = "localhost";
const database = "thePantry";
const port = "5432";

const connectDB = async () => {
  const sequelize = new Sequelize(database, user, process.env.DBPASS, {
    host,
    port,
    dialect: "postgres",
    logging: false,
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.".bgGreen.black);
  } catch (error) {
    console.error("Unable to connect to the database:".bgRed.black, error);
  }
};

export default connectDB;
