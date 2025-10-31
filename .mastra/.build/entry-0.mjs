import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const jokeTool = createTool({
  id: "get-joke",
  description: "Fetch a safe, random programming joke from JokeAPI",
  inputSchema: z.object({}),
  outputSchema: z.object({
    joke: z.string().describe("The programming joke")
  }),
  execute: async () => {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );
    const data = await res.json();
    if (data.error) throw new Error("JokeAPI error");
    return { joke: data.joke };
  }
});

const jokeAgent = new Agent({
  name: "Joke Agent",
  instructions: `
    You deliver **one clean programming joke** per request.
    - Always call **get-joke** to fetch a fresh joke.
    - Return **only the joke**, nothing else.
  `,
  model: "google/gemini-1.5-flash-latest",
  tools: { jokeTool }
});

const mastra = new Mastra({
  agents: {
    "Joke Agent": jokeAgent
  }
});
console.log("KEY:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.slice(0, 5) + "...");

export { mastra };
