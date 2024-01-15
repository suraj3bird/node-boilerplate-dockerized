import { getCredentialsUser } from "@helpers/auth";
import { successAuth, errorAuth } from "@constants/auth.constant";
import bcrypt from "bcryptjs";
import { genAccessToken } from "@utils/jwt";
import { genRandomNumber } from "@helpers/generator";
import { IReturnResponse } from "@interfaces/response";
import Token from "@models/token.model";
import crypto from "crypto";
import { sendEmail } from "@utils/mail";
import config from "@config/index";
import { unlinkMedia } from "@helpers/unlink";
import { prisma } from '@prisma/prisma';
import User from "@models/user.model";

const userAuthservice = {
  // dynamic user login
  login: async (email: string, password: string): Promise<IReturnResponse> => {
    let userData = await getCredentialsUser(email, password);
    const accessToken = await genAccessToken(userData.id);
    return {
      ok: true,
      status: successAuth.login.status,
      message: successAuth.login.msg,
      data: { ...userData, accessToken }
    };
  },

  //user registration based on credentials only
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IReturnResponse> => {
    const user = await prisma.user.findFirst({ where: { email: email }  });
    if (user)
      return {
        ok: false,
        status: errorAuth.login.alreadyExist.detail.status,
        message: errorAuth.login.alreadyExist.detail.msg,
        data: null
      };
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        status: 'ACTIVE'
        // other fields
      },
    });
    return {
      ok: true,
      status: successAuth.register.status,
      message: successAuth.register.msg,
      data: newUser
    };
  },
  users: async (page: number, limit: number): Promise<IReturnResponse> => {
    const currentPage = page >= 1 ? page - 1 : page;
    const totalUsers = await prisma.user.count();
    const totalPage = Math.round(totalUsers / limit) + 1;
    const userList = await prisma.user.findMany({
      skip: currentPage * limit,
      take: limit
    })

    return {
      ok: true,
      data: userList,
      currentPage: page,
      totalPage: totalPage,
      limit: limit,
      total: totalUsers
    };
  },
  profile: async (user: number): Promise<IReturnResponse> => {
    const currentUser = await prisma.user.findUnique({ where: { id: user } });
    return {
      ok: true,
      data: currentUser
    };
  },
  updateProfile: async (
    userId: number,
    firstName: string,
    lastName: string,
    avatar?: string
  ): Promise<IReturnResponse> => {
    const updateProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        avatar
      }
    });
    if (avatar && updateProfile.avatar != avatar) {
      unlinkMedia(updateProfile.avatar);
    }
    return {
      ok: true,
      data: updateProfile
    };
  },
  updateCredential: async (
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<IReturnResponse> => {
    console.log(userId, oldPassword, newPassword);
    const checkUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });
    if (!checkUser) {
      return {
        ok: false,
        message: "User not found",
        status: 404,
        data: null
      };
    }
    const comparePassword = bcrypt.compareSync(oldPassword, checkUser.password);
    if (!comparePassword) {
      return {
        ok: false,
        message: "Old password not matched !",
        status: 401,
        data: null
      };
    }
    const generatedPassword = bcrypt.hashSync(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: generatedPassword }
    });
    return {
      ok: true,
      data: updatedUser
    };
  },
  requestForgotPassword: async (email: string) => {
    const user = await User.findOne({
      email
    });
    if (!user) {
      return {
        ok: false,
        status: 404,
        message: "User not found"
      };
    }
    await Token.findOneAndDelete({
      user: user.id,
      type: "forgot-password"
    });
    // Create a verification token for this user
    const token = await Token.create({
      user: user.id,
      token: genRandomNumber(),
      key: crypto.randomBytes(32).toString("hex"),
      type: "forgot-password"
    });
    sendEmail(
      [config.mail.receiver],
      "Password verification code",
      `<p>Your confirmation code is: ${token.token}</p>
      <p>Note: This verification code will be expired after 5minutes</p>`
    );
    return {
      ok: true,
      data: { key: token.key },
      message: "Please check your email"
    };
  },
  requestTokenForPasswordChanges: async (key: string, code: string) => {
    const dbToken = await Token.findOneAndUpdate(
      {
        key: key,
        type: "forgot-password"
      },
      {
        $inc: {
          count: 1
        }
      },
      {
        new: true
      }
    );
    if (!dbToken) {
      return {
        ok: false,
        status: 400,
        message: "Code expired or invalid"
      };
    }

    if (dbToken.count > 5) {
      dbToken.deleteOne();
      return {
        ok: false,
        message: "Too many requests"
      };
    }
    if (dbToken.token !== String(code)) {
      return {
        ok: false,
        status: 400,
        message: "Invalid code, Please try again"
      };
    }

    await Token.findOneAndDelete({
      key: key,
      type: "forgot-password"
    });
    // Create a verification token for this user
    const token = await Token.create({
      user: dbToken.user,
      token: crypto.randomBytes(32).toString("hex"),
      type: "forgot-password"
    });
    return {
      ok: true,
      data: {
        token: token.token
      }
    };
  },
  changePasswordFromToken: async (token: string, newPassword: string) => {
    const dbToken = await Token.findOne({
      token: token,
      type: "forgot-password"
    });
    if (!dbToken) {
      return {
        ok: false,
        message: "Token expired or invalid",
        status: 400
      };
    }

    await User.findByIdAndUpdate(dbToken.user, {
      password: bcrypt.hashSync(newPassword, 10)
    });
    await Token.findOneAndDelete({
      token: token,
      type: "forgot-password"
    });
    return {
      ok: true,
      message: "Password changed successfully"
    };
  }
};

export default userAuthservice;
