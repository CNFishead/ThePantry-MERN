import pkg from "sequelize";
const { Sequelize, DataTypes } = pkg;
const sequelize = new Sequelize("postgres::memory:");

const userSchema = sequelize.define(
  "User",
  {
    // Model attributes are defined here
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

userSchema.beforeCreate("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
});

const User = sequelize.model("User", userSchema);

export default User;
