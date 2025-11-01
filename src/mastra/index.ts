import "dotenv/config";
import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { jokeAgent } from "./agents/joke-agent";
import { a2aAgentRoute } from "./routes/a2a-agent-route";
// import { a2aAgentRoute } from "./routes/a2a-agent-route";

export const mastra = new Mastra({
  agents: { jokeAgent },
  storage: new LibSQLStore({ url: ":memory:" }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "debug",
  }),
  observability: {
    default: { enabled: true },
  },
  server: {
    build: {
      openAPIDocs: true,
      swaggerUI: true,
    },
    apiRoutes: [a2aAgentRoute],
  },
});

console.log("✅ Joke Agent ready on Mastra");
