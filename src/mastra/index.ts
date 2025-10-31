import "dotenv/config";

import { Mastra } from "@mastra/core/mastra";
import { jokeAgent } from "./agents/joke-agent";

export const mastra = new Mastra({
    agents: { "Joke Agent": jokeAgent },
    
});


console.log("KEY:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.slice(0, 5) + "...");