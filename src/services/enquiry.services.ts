import { genRandomNumber } from "@helpers/generator";
import { IEnquiry } from "@interfaces/cms";
import { IReturnResponse } from "@interfaces/response";
import { prisma } from "@prisma/prisma";

const enquiryService = {
  getEnquirys: async (page: number, limit: number): Promise<IReturnResponse> => {
    try {
      const currentPage = page >= 1 ? page - 1 : page;
      const totalEnquirys = await prisma.enquiry.count();
      const totalPage = Math.round(totalEnquirys / limit) + 1;
      const enquirys = await prisma.enquiry.findMany({
        skip: currentPage * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          enquiryId: true,
          fullName: true,
          email: true,
          phone: true,
          subject: true,
          createdAt: true
        }
      });
      const enquiryEmails = enquirys.map(enquiry => enquiry.email);
      const registeredUsers = await prisma.user.findMany({
        where: { email: { in: enquiryEmails } },
        select: { email: true },
      })
      const existingEmails = new Set(registeredUsers.map(user => user.email));
      const result = enquirys.map(entry => ({
        ...entry,
        status: existingEmails.has(entry.email) ? 'registered' : 'unregistered',
      }));
      return {
        ok: true,
        data: result,
        currentPage: page,
        totalPage: totalPage,
        limit: limit,
        total: totalEnquirys
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Enquiries not found"
      }
    }
  },
  getEnquiryDetail: async (id: number): Promise<IReturnResponse> => { 
    try {
      const enquiry = await prisma.enquiry.findFirst({
        where: {
          id: id
        },
        include: {
          destination: {
            select: {
              title: true
            }
          }
        }
      });
      return {
        ok: true,
        message: "Enquiry found",
        data: enquiry
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: 'Enquiry not found'
      }
    } 
  },
  storeEnquiry: async (enquiry: IEnquiry): Promise<IReturnResponse> => {
    try {
      const enquiryId = genRandomNumber().toString();
      await prisma.enquiry.create({
        data: {
          enquiryId: enquiryId,
          fullName: enquiry.fullName,
          email: enquiry.email,
          phone: enquiry.phone,
          message: enquiry?.message,
          destinationId: enquiry.destinationId,
          subject: enquiry.subject,
          intake: enquiry?.intake,
          studyLevel: enquiry?.studyLevel
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Enquiry added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 409, 
        message: "Something went wrong"
      }
    }
  },
  deleteEnquiry: async (id: number): Promise<IReturnResponse> => {
    try {
      await prisma.enquiry.delete({
        where: {
          id: id
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Enquiry deleted successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Enquiry not found"
      }
    }
  }
}

export default enquiryService;