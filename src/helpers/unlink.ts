import fs from "fs";
import path from "path";

export const unlinkMedia = (mediaPath: string) => {
  try {
    fs.unlinkSync(path.join(__dirname, "..", "..", "public/") + mediaPath);
  } catch (err) {
    throw new Error(err);
  }
};

export const unlinkMedias = (mediaPaths: string[]) => {
  try {
    for (let mediaPath of mediaPaths) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/") + mediaPath);
    }
  } catch (err) {
    throw new Error(err);
  }
};
