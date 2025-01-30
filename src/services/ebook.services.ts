import { IEbook } from "@interfaces/cms";
import { IReturnResponse } from "@interfaces/response";
import { prisma } from "@prisma/prisma";

const ebookService = {
  getEbooks: async (page: number, limit: number): Promise<IReturnResponse> => {
    const currentPage = page >= 1 ? page - 1 : page;
    const totalEbooks = await prisma.ebooks.count();
    const totalPage = Math.round(totalEbooks / limit) + 1;
    const ebookList = await prisma.ebooks.findMany({
      skip: currentPage * limit,
      take: limit,
    });
    return {
      ok: true,
      data: ebookList,
      currentPage: page,
      totalPage: totalPage,
      limit: limit,
      total: totalEbooks
    };
  },
  getEbookDetail: async (slug: string): Promise<IReturnResponse> => {
    try {
      const book = await prisma.ebooks.findFirst({
        where: {
          slug: slug
        }
      });
      return {
        ok: true,
        message: "Ebook found",
        data: book
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: 'EBook not found'
      }
    }
  },
  storeEbook: async (ebook: IEbook): Promise<IReturnResponse> => {
    try {
      const slug = ebook.name.replace(/\s+/g, '-').toLowerCase();
      const ebookExists = await prisma.ebooks.findFirst({
        where: {
          slug: slug
        }
      })
      if(ebookExists) {
        return {
          ok: false,
          status: 404,
          message: "Ebook already exists"
        }
      }
      await prisma.ebooks.create({
        data: {
          name: ebook.name,
          slug: slug,
          price: ebook.price,
          description: ebook.description,
          image: ebook.image
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Ebook added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Ebook not added"
      }
    }
  },
  updateEbook: async(ebook: IEbook): Promise<IReturnResponse> => {
    try {
      const slug = ebook.name.replace(/\s+/g, '-').toLowerCase();
      const ebookExists = await prisma.ebooks.findFirst({
        where: {
          id: ebook.id
        }
      })
      if (!ebookExists) {
        return {
          ok: false,
          status: 404,
          message: "Ebook not found"
        }
      }
      await prisma.ebooks.update({
        where: {
          id: ebook.id
        },
        data: {
          name: ebook.name,
          slug: slug,
          price: ebook.price,
          description: ebook.description,
          image: ebook.image
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Ebook updated successfully!"
      }
    } catch (error) { 
      return {
        ok: false,
        status: 404,
        message: "Ebook not updated"
      }
    }
  },
  deleteEbook: async (ebookId: number): Promise<IReturnResponse> => {
    try {
      const ebookExists = await prisma.ebooks.findFirst({
        where: {
          id: ebookId
        }
      })
      if (!ebookExists) {
        return {
          ok: false,
          status: 404,
          message: "Ebook not found"
        }
      }
      await prisma.ebooks.delete({
        where: {
          id: ebookId
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Ebook Deleted Successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Ebook not found"
      }
    }
  }
}

export default ebookService;