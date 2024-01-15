import { prisma } from "@prisma/prisma";
import bcrypt from "bcryptjs";

export const getCredentialsUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, password: true }, // Only select necessary fields
  });
  if (!user) {
    const err = new Error();
    err.name = "user";
    err.message = "user not found";
    throw err;
  }
  const isValid = bcrypt.compareSync(password, user?.password);
  if (!isValid) {
    {
      const err = new Error();
      err.name = "user";
      err.message = "email or password is invalid";
      throw err;
    }
  }
  return { id: user.id, email: email };
};
