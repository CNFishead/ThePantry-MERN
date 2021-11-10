import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword.js";

const users = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@admin.com",
    password: await hashPassword("password"),
    isAdmin: true,
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@test.com",
    password: await hashPassword("password"),
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@test.com",
    password: await hashPassword("password"),
  },
  {
    firstName: "Some",
    lastName: "Guy",
    email: "some@guy.com",
    password: await hashPassword("password"),
  },
];

export default users;
