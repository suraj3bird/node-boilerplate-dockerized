import { unlinkMedia } from "@helpers/unlink";

const mediaService = {
  deleteMedia: async (path: string) => {
    try {
      unlinkMedia(path);
      return {
        ok: true,
        status: 200,
        message: "File deleted successfully"
      };
    } catch (err) {
      return {
        ok: false,
        status: 400,
        message: "Error deleting file"
      };
    }
  }
};

export default mediaService;
