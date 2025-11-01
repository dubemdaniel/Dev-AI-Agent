import { M as MastraError } from './error.mjs';

// src/server/index.ts
function validateOptions(path, options) {
  const opts = options;
  if (opts.method === void 0) {
    throw new MastraError({
      id: "MASTRA_SERVER_API_INVALID_ROUTE_OPTIONS",
      text: `Invalid options for route "${path}", missing "method" property`,
      domain: "MASTRA_SERVER" /* MASTRA_SERVER */,
      category: "USER" /* USER */
    });
  }
  if (opts.handler === void 0 && opts.createHandler === void 0) {
    throw new MastraError({
      id: "MASTRA_SERVER_API_INVALID_ROUTE_OPTIONS",
      text: `Invalid options for route "${path}", you must define a "handler" or "createHandler" property`,
      domain: "MASTRA_SERVER" /* MASTRA_SERVER */,
      category: "USER" /* USER */
    });
  }
  if (opts.handler !== void 0 && opts.createHandler !== void 0) {
    throw new MastraError({
      id: "MASTRA_SERVER_API_INVALID_ROUTE_OPTIONS",
      text: `Invalid options for route "${path}", you can only define one of the following properties: "handler" or "createHandler"`,
      domain: "MASTRA_SERVER" /* MASTRA_SERVER */,
      category: "USER" /* USER */
    });
  }
}
function registerApiRoute(path, options) {
  if (path.startsWith("/api/")) {
    throw new MastraError({
      id: "MASTRA_SERVER_API_PATH_RESERVED",
      text: `Path must not start with "/api", it's reserved for internal API routes`,
      domain: "MASTRA_SERVER" /* MASTRA_SERVER */,
      category: "USER" /* USER */
    });
  }
  validateOptions(path, options);
  return {
    path,
    method: options.method,
    handler: options.handler,
    createHandler: options.createHandler,
    openapi: options.openapi,
    middleware: options.middleware
  };
}

export { registerApiRoute };
