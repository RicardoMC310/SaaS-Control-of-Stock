import express, {type Express} from "express";
import cors from "cors";
import { createRouter } from "./routes";
import pinoHttp from "pino-http";
import morgan from "morgan";
import actuator from "express-actuator";
import prometheus from "express-prometheus-middleware";
import pino from "pino";
import crypto from "crypto";

import DotEnv from "@utils/Env/dotenv";

export async function createApp(): Promise<Express> {
  const App = express();
  const isDev = DotEnv.getenv("NODE_ENV") === "development";

  /* ===== Logger ===== */

  if (isDev) {
    App.use(morgan("dev"));
  } else {
    const logger = pino({
      level: DotEnv.getenv("LOG_LEVEL", "info"),
      redact: ["req.headers.authorization"],
    });

    App.use(
      pinoHttp({
        logger,
        genReqId: () => crypto.randomUUID(),
      })
    );
  }

  /* ===== Core middlewares ===== */

  App.use(express.json());
  App.use(cors());

  /* ===== Metrics ===== */

  App.use(
    prometheus({
      metricsPath: "/metrics",
      collectDefaultMetrics: true,
    })
  );
  
  /* ===== Actuator (dev only) ===== */

  if (isDev) {
    App.use(
      actuator({
        basePath: "/actuator",
        infoGitMode: "simple",
        infoBuildOptions: {
          name: "controle-estoque",
        },
      })
    );
  }

  /* ===== Routes ===== */

  const Routes = await createRouter();

  App.use(Routes);

  return App;
}

export default {createApp};