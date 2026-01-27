import express from "express";
import cors from "cors";
import Routes from "./routes";
import pinoHttp from "pino-http";
import morgan from "morgan";
import actuator from "express-actuator";
import prometheus from "express-prometheus-middleware";
import pino from "pino";
import crypto from "crypto";

import DotEnv from "@utils/Env/dotenv";

const app = express();
const isDev = DotEnv.getenv("NODE_ENV") === "development";

/* ===== Logger ===== */

if (isDev) {
  app.use(morgan("dev"));
} else {
  const logger = pino({
    level: DotEnv.getenv("LOG_LEVEL", "info"),
    redact: ["req.headers.authorization"],
  });

  app.use(
    pinoHttp({
      logger,
      genReqId: () => crypto.randomUUID(),
    })
  );
}

/* ===== Core middlewares ===== */

app.use(express.json());
app.use(cors());

/* ===== Metrics ===== */

app.use(
  prometheus({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
  })
);

/* ===== Health ===== */

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ===== Actuator (dev only) ===== */

if (isDev) {
  app.use(
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

app.use(Routes);

export default app;
