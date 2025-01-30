import { IBlog } from "@interfaces/cms";
import { IReturnResponse } from "@interfaces/response";
import { prisma } from "@prisma/prisma";

const blogService = {
  getBlogs: async (page: number, limit: number): Promise<IReturnResponse> => {
    try {
      const currentPage = page >= 1 ? page - 1 : page;
      const totalBlogs = await prisma.blogs.count();
      const totalPage = Math.round(totalBlogs / limit) + 1;
      const blogLists = await prisma.blogs.findMany({
        skip: currentPage * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      });
      return {
        ok: true,
        data: blogLists,
        currentPage: page,
        totalPage: totalPage,
        limit: limit,
        total: totalBlogs
      };
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Blogs not found"
      }
    }
  },
  getBlogDetail: async (slug: string): Promise<IReturnResponse> => {
    try {
      const blog = await prisma.blogs.findFirst({
        where: {
          slug: slug
        }
      });
      return {
        ok: true,
        message: "Blog found",
        data: blog
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: 'Blog not found'
      }
    }
  },
  storeBlog:async (userId: number, blog: IBlog): Promise<IReturnResponse> => {
    try {
      const slug = blog.title.replace(/\s+/g, '-').toLowerCase();
      const blogExists = await prisma.blogs.findFirst({
        where: {
          slug: slug
        }
      })
      if (blogExists) {
        return {
          ok: false,
          status: 409,
          message: "Blog already exists"
        }
      }
      await prisma.blogs.create({
        data: {
          title: blog.title,
          userId: userId,
          excerpt: blog.excerpt,
          slug: slug,
          category: blog.category,
          description: blog.description,
          image: blog.image
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Blog added successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 409,
        data: error,
        message: "Something went wrong"
      }
    }
  },
  updateBlog: async (userId: number, blog: IBlog): Promise<IReturnResponse> => {
    try {
      const slug = blog.title.replace(/\s+/g, '-').toLowerCase();
      const blogExists = await prisma.blogs.findFirst({
        where: {
          id: blog.id
        }
      })
      if (!blogExists) {
        return {
          ok: false,
          status: 404,
          message: "Blog not found"
        }
      }
      await prisma.blogs.update({
        where: {
          id: blog.id
        },
        data: {
          title: blog.title,
          userId: userId,
          excerpt: blog.excerpt,
          slug: slug,
          category: blog.category,
          description: blog.description,
          image: blog.image
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Blog updated successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 409,
        data: error,
        message: "Something went wrong"
      }
    }
  },
  deleteBlog: async (blogId: number): Promise<IReturnResponse> => {
    try {
      await prisma.blogs.delete({
        where: {
          id: blogId
        }
      });
      return {
        ok: true,
        status: 200,
        message: "Blog deleted successfully!"
      }
    } catch (error) {
      return {
        ok: false,
        status: 404,
        message: "Blog not found"
      }
    }
  }
}

export default blogService;