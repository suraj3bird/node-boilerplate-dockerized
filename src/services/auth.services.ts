import { successAuth, errorAuth } from "@constants/auth.constant";
import { IReturnResponse } from "@interfaces/response";
import config from "@config/index";
import { unlinkMedia } from "@helpers/unlink";
import { AddressType, UserStatus, prisma } from "@prisma/prisma";
import axios from "axios";
import { IAddress, IEducation, IGuardian } from "@interfaces/user";

const userAuthservice = {
  // dynamic user login
  login: async (email: string, password: string): Promise<IReturnResponse> => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email, isDeleted: false } });
      if (!user)
        return {
          ok: false,
          status: 403,
          message: "Wrong email or password"
        };
      if (user.isDeleted || user.status === "unverified")
        return {
          ok: false,
          status: 403,
          message: "User has not been activated or has been deleted"
        };
      const response = await axios.post(
        `${config.app.auth0.issuerBaseUrl}/oauth/token`,
        {
          grant_type: "password",
          client_id: config.app.auth0.clientId,
          client_secret: config.app.auth0.secret,
          username: email,
          password,
          scope: "openid profile email offline_access",
          audience: config.app.auth0.apiIdentifier
        }
      );
      return {
        ok: true,
        status: response?.status || 200,
        message: "Logged In Successfully",
        data: {
          accessToken: response?.data?.access_token,
          idToken: response?.data?.id_token,
          refreshToken: response?.data?.refresh_token
        }
      };
    } catch (error) {
      return {
        ok: false,
        status: error.response?.status || 500,
        message:
          error.response?.data?.error_description ||
          "An unknown error occurred.",
        data: {}
      };
    }
  },
  //user registration based on credentials only
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Promise<IReturnResponse> => {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (user)
      return {
        ok: false,
        status: errorAuth.login.alreadyExist.detail.status,
        message: errorAuth.login.alreadyExist.detail.msg
      };
    try {
      const auth0Response = await axios.post(
        `${config.app.auth0.issuerBaseUrl}/dbconnections/signup`,
        {
          email,
          password,
          connection: "Username-Password-Authentication" // This is the default database connection
        }
      );
      const userId = auth0Response?.data?._id;
      if (userId) {
        const newUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            role: "student",
            status: "unverified",
            uuId: userId
            // other fields
          }
        });
        return {
          ok: true,
          status: successAuth.register.status,
          message: successAuth.register.msg,
          data: newUser
        };
      }
    } catch (error) {
      return {
        ok: false,
        status: error.response?.status || 500,
        message: error.response?.data?.message,
        data: error.response?.data?.description || "An unknown error occurred."
      };
    }
  },
  users: async (page: number, limit: number): Promise<IReturnResponse> => {
    const currentPage = page >= 1 ? page - 1 : page;
    const totalUsers = await prisma.user.count();
    const totalPage = Math.round(totalUsers / limit) + 1;
    const userList = await prisma.user.findMany({
      where: {
        role: "student"
      },
      skip: currentPage * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        phone: true,
        validity: true,
        isDeleted: true
      }
    });

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
    const currentUser = await prisma.user.findUnique(
      {
        where: { id: user },
        include: {
          address: true,
          education: true,
          guardian: true
        }
      }
    );
    return {
      ok: true,
      data: currentUser
    };
  },
  updateProfile: async (user: number, data: {
    firstName: string,
    lastName: string,
    phone: string,
    username?: string,
    avatar?: string,
    occupation?: string,
    status: string
  }): Promise<IReturnResponse> => {
    const updateProfile = await prisma.user.update({
      where: { id: user },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        username: data.username,
        avatar: data.avatar,
        occupation: data.occupation,
        status: data.status as UserStatus
      }
    });
    if (data.avatar && updateProfile.avatar != data.avatar) {
      unlinkMedia(updateProfile.avatar);
    }
    return {
      ok: true,
      data: updateProfile
    };
  },
  requestPasswordChange: async (
    email: string
  ): Promise<IReturnResponse> => {
    try {
      const auth0Response = await axios.post(
        `${config.app.auth0.issuerBaseUrl}/dbconnections/change_password`,
        {
          client_id: config.app.auth0.clientId,
          email: email,
          connection: "Username-Password-Authentication" // This is the default database connection
        }
      );
      return {
        ok: true,
        status: 200,
        message: auth0Response.data
      };
    } catch (error) {
      return {
        ok: false,
        status: 429,
        message: error.response?.data?.message
      }
    }
  },
  addUpdateAddressDetails: async (
    userId: number,
    addressData: IAddress
  ): Promise<IReturnResponse> => {
    try {
      if (addressData?.id) {
        const addressExists = await prisma.address.findFirst({
          where: {
            id: addressData.id
          }
        })
        if(!addressExists) {
          return {
            ok: false,
            status: 404,
            message: "Address not found"
          }
        }
        const address = await prisma.address.update({
          where: { 
            id: addressData.id,
            userId: userId
          },
          data: {
            country: addressData.country,
            state: addressData.state,
            city: addressData.city,
            district: addressData.district,
            street: addressData.street,
            addressType: addressData.addressType as AddressType
          }
        });
        return {
          ok: true,
          data: address,
          message: "Address updated successfully!"
        };
      }
      const address = await prisma.address.create({
        data: {
          userId: userId,
          country: addressData.country,
          state: addressData.state,
          city: addressData.city,
          district: addressData.district,
          street: addressData.street,
          addressType: addressData.addressType as AddressType
        }
      })
      return {
        ok: true,
        data: address,
        message: "Address added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 400,
        message: "Error adding address"
      }
    }
  },
  deleteAddress: async (
    userId: number,
    addressId: number
  ): Promise<IReturnResponse> => { 
    try {
      await prisma.address.delete({
        where: {
          id: addressId,
          userId: userId
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Address deleted successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Address not found"
      }
    }
  },
  addUpdateGuardianDetails: async (
    userId: number,
    guardianData: IGuardian
  ): Promise<IReturnResponse> => {
    try {
      if (guardianData?.id) {
        const guardianExists = await prisma.guardian.findFirst({
          where: {
            id: guardianData.id
          }
        })
        if(!guardianExists) {
          return {
            ok: false,
            status: 404,
            message: "Guardian not found"
          }
        }
        const guardian = await prisma.guardian.update({
          where: { 
            id: guardianData.id,
            userId: userId
          },
          data: guardianData
        });
        return {
          ok: true,
          data: guardian,
          message: "Guardian updated successfully!"
        };
      }
      const guardian = await prisma.guardian.create({
        data: {
          userId: userId,
          fullName: guardianData.fullName,
          relation: guardianData.relation,
          email: guardianData.email ?? null,
          phone: guardianData.phone
        }
      })
      return {
        ok: true,
        data: guardian,
        message: "Guardian added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 400,
        message: "Error adding guardian"
      }
    }
  },
  deleteGuardian: async (
    userId: number,
    guardianId: number
  ): Promise<IReturnResponse> => {
    try {
      await prisma.guardian.delete({
        where: {
          id: guardianId,
          userId: userId
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Guardian deleted successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Guardian not found"
      }
    } 
  },
  addUpdateEducationDetails: async(
    userId: number,
    education: IEducation
  ): Promise<IReturnResponse> => {
    try { 
      if (education?.id) {
        const educationExists = await prisma.education.findFirst({
          where: {
            id: education.id
          }
        });
        if (!educationExists) { 
          return {
            ok: false,
            status: 404,
            message: "Education not found"
          }
        }
        const educationData = await prisma.education.update({
          where: { 
            id: education.id,
            userId: userId
          },
          data: education
        });
        return {
          ok: true,
          data: educationData,
          message: "Education updated successfully!"
        };
      }
      const educationData = await prisma.education.create({
        data: {
          userId: userId,
          university: education.university,
          degree: education.degree,
          startDate: education.startDate,
          endDate: education.endDate
        }
      })
      return {
        ok: true,
        data: educationData,
        message: "Education added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 400,
        message: "Error adding education"
      }
    }
  },
  deleteEducation: async (
    userId: number,
    educationId: number
  ): Promise<IReturnResponse> => {
    try {
      await prisma.education.delete({
        where: {
          id: educationId,
          userId: userId
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Education deleted successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Education not found"
      }
    }
  },
  deleteUser: async (userId: number): Promise<IReturnResponse> => {
    try {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          isDeleted: true
        }
      });
      return {
        ok: true,
        status: 200,
        message: "User deleted successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "User not found"
      }
    }
  }
};

export default userAuthservice;
