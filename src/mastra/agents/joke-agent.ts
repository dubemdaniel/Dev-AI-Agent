import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { jokeTool } from "../tools/joke-tool";

export const jokeAgent = new Agent({
  name: "Joke Agent",
  instructions: `
    You deliver **one clean programming joke** per request.
    - Always call **get-joke** to fetch a fresh joke.
    - Return **only the joke**, nothing else.
  `,
  model: "google/gemini-2.0-flash-lite",
  tools: { jokeTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db",
    }),
  }),
});
