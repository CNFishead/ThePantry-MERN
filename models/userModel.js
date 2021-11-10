import pkg from "sequelize";
const { Sequelize, DataTypes } = pkg;
const user = "postgres";
const host = "localhost";
const database = "thePantry";
const port = "5432";

const sequelize = new Sequelize(database, user, process.env.DBPASS, {
  host,
  port,
  dialect: "postgres",
  logging: false,
});
try {
  await sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:".bgRed.black, error);
}

const userSchema = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

const User = sequelize.model("User", userSchema);
User.sync();

export default User;
