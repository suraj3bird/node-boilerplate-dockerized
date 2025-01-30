import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "module-alias/register";
import config from "@config/index";
import v1Router from "@routes/index";
import { corsOption } from "@utils/cors";
import { globalErrorHandlers, notFoundHandlers } from "@helpers/handlers";

const app = express();

const PORT = config.app.port;
const HOST = config.app.host;

app.use(express.static("public"));
app.use(morgan(config.app.morganLevel));

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use("/api", v1Router);
app.use(notFoundHandlers);
app.use(globalErrorHandlers);

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT} 🚀`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("UNHANDLED REJECTION!:" + promise + "Shutting down..." + reason);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", err => {
  console.log("ERROR: ", err);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});
