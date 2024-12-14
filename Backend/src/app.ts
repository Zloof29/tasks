import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import fs from "fs";
import helmet from "helmet";
import https from "https";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { taskController } from "./5-controllers/task-controller";
import { userController } from "./5-controllers/user-controller";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";

// Configure fileSaver once:
fileSaver.config(path.join(__dirname, "1-assets", "images"));

// Create main server object:
const server = express();

// Remove non-secured headers from the response:
server.use(helmet());

// Enable CORS:
server.use(cors());

// Create the body from json:
server.use(express.json());

// Read files into request.files:
server.use(expressFileUpload());

// Register middleware:
server.use(securityMiddleware.preventXssAttack);

// Register routes:
server.use("/api", taskController.router, userController.router);

// Register route not found middleware:
server.use("*", errorsMiddleware.routeNotFound);

// Register catchAll middleware:
server.use(errorsMiddleware.catchAll);

// Run server:
if (appConfig.isDevelopment) {
  server.listen(appConfig.port, () =>
    console.log("Listening on http://localhost:" + appConfig.port)
  );
} else {
  const options = {
    cert: fs.readFileSync(
      path.join(__dirname, "1-assets", "cert", "localhost_3000.crt")
    ),
    key: fs.readFileSync(
      path.join(__dirname, "1-assets", "cert", "localhost_3000-privateKey.key")
    ),
  };
  const httpsServer = https.createServer(options, server);
  httpsServer.listen(appConfig.port, () =>
    console.log("Listening on https://localhost:" + appConfig.port)
  );
}
