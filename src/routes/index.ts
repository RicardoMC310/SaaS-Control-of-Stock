import express, { type Router } from "express";
import fg from "fast-glob";
import path from "path";

export async function createRouter(): Promise<Router> {
  const router = express.Router();

  const files = await fg("**/*.routes.{ts,js}", {
    cwd: __dirname,
    ignore: ["index.{ts,js}"],
  });

  for (const file of files) {
    const routePath =
      "/" +
      file
        .replace(/\.routes\.(ts|js)$/, "")
        .replace(/\/index$/, "")
        .replace(/\\/g, "/");

    const modulePath = path.join(__dirname, file);
    const module = await import(modulePath);

    if (!module.default) {
      throw new Error(`Route file ${file} does not export default router`);
    }

    router.use(routePath, module.default);
  }

  return router;
}
