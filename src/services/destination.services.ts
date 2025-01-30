import { IDestination } from "@interfaces/cms";
import { IReturnResponse } from "@interfaces/response";
import { prisma } from "@prisma/prisma";

const destinationService = {
  getDestinations: async(page: number, limit: number): Promise<IReturnResponse> => {
    const currentPage = page >= 1 ? page - 1 : page;
    const totalDestinations = await prisma.destinations.count();
    const totalPage = Math.round(totalDestinations / limit) + 1;
    const destinationList = await prisma.destinations.findMany({
      skip: currentPage * limit,
      take: limit,
    });
    return {
      ok: true,
      data: destinationList,
      currentPage: page,
      totalPage: totalPage,
      limit: limit,
      total: totalDestinations
    };
  },
  getDestinationDetail: async (slug: string): Promise<IReturnResponse> => {
    try {
      const destination = await prisma.destinations.findFirst({
        where: {
          slug: slug
        }
      });
      return {
        ok: true,
        message: "Destination found",
        data: destination
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: 'Destination not found'
      }
    }
  },
  storeDestination: async (destination: IDestination): Promise<IReturnResponse> => {
    try {
      const slug = destination.title.replace(/\s+/g, '-').toLowerCase();
      const destinationExists = await prisma.destinations.findFirst({
        where: {
          slug: slug
        }
      })
      if(destinationExists) {
        return {
          ok: false,
          status: 404,
          message: "destination already exists"
        }
      }
      await prisma.destinations.create({
        data: {
          title: destination.title,
          slug: slug,
          description: destination.description,
          image: destination.image
        }
      });
      return {
        ok: true,
        status: 200,
        message: "destination added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "destination not added"
      }
    }
  },
  updateDestination: async(destination: IDestination): Promise<IReturnResponse> => {
    try {
      const slug = destination.title.replace(/\s+/g, '-').toLowerCase();
      const destinationExists = await prisma.destinations.findFirst({
        where: {
          id: destination.id
        }
      })
      if (!destinationExists) {
        return {
          ok: false,
          status: 404,
          message: "destination not found"
        }
      }
      await prisma.destinations.update({
        where: {
          id: destination.id
        },
        data: {
          title: destination.title,
          slug: slug,
          description: destination.description,
          image: destination.image
        }
      });
      return {
        ok: true,
        status: 200,
        message: "destination updated successfully!"
      }
    } catch (error) { 
      return {
        ok: false,
        status: 404,
        message: "destination not updated"
      }
    }
  },
  deleteDestination: async (destinationId: number): Promise<IReturnResponse> => {
    try {
      const destinationExists = await prisma.destinations.findFirst({
        where: {
          id: destinationId
        }
      })
      if (!destinationExists) {
        return {
          ok: false,
          status: 404,
          message: "destination not found"
        }
      }
      await prisma.destinations.delete({
        where: {
          id: destinationId
        }
      });
      return {
        ok: true,
        status: 200,
        message: "destination Deleted Successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "destination not found"
      }
    }
  }
}

export default destinationService;