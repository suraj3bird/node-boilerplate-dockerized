import User from "@models/user.model";
import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    role: "ADMIN",
    status: "ACTIVE"
  }
];

export default async function seedUsers() {
  await User.insertMany(users);

  console.log("Users seeded ✅✅✅");
}
