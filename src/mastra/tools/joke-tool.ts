import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const jokeTool = createTool({
  id: "get-joke",
  description: "Fetch a safe, random programming joke from JokeAPI",
  inputSchema: z.object({}),
  outputSchema: z.object({
    joke: z.string().describe("The programming joke"),
  }),
  execute: async () => {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );
    const data = await res.json();

    if (data.error) throw new Error("JokeAPI error");

    return { joke: data.joke };
  },
});
