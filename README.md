# 🤖 Joke Agent — Mastra x Telex.im Integration

A fun, interactive AI agent that delivers clean **programming jokes** on demand.  
Built with **Mastra** for AI orchestration and integrated into **Telex.im** for real-time message handling.

---

## 🎯 Overview

**Joke Agent** brings a touch of humor to your developer workspace.  

It listens to messages like:
- "Hi, what do you do?"
- "Give me a joke to start the day."
- "Tell me a programming joke."

…and responds instantly with a clean, witty programming joke fetched dynamically from the **JokeAPI**.

The agent also responds politely to greetings and guides users to ask for a joke if they haven't already.

---

## 🧠 How It Works

The agent is powered by **Mastra** and structured around:

- **AI Model:** `google/gemini-2.0-flash-lite`
- **Tool:** `jokeTool` — fetches random, safe programming jokes
- **Memory:** optional persistence with `@mastra/memory` and `@mastra/libsql`
- **Routing:** custom A2A route for Telex integration (`a2a-agent-route.ts`)

---

## 📂 Folder Structure

```
src/
├── mastra/
│   ├── agents/
│   │   └── joke-agent.ts          # Defines the agent logic, model, and tools
│   ├── tools/
│   │   └── joke-tool.ts           # Custom tool fetching jokes from JokeAPI
│   ├── routes/
│   │   └── a2a-agent-route.ts     # Route handler for Telex.im and A2A integration
│   └── index.ts                   # Initializes Mastra and registers agents
├── .env                           # Environment variables (API keys, etc.)
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/dubemdaniel/Dev-AI-Agent.git
cd joke-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in your project root:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
```

### 4. Run locally

```bash
npm run dev
```

You should see:

```
✅ Joke Agent ready on Mastra
Playground: http://localhost:4113/
API:        http://localhost:4113/api
```

---

## 🌐 Telex.im Integration

To integrate your agent with Telex.im, create a new workflow with this configuration:

```json
{
  "active": true,
  "category": "fun",
  "description": "A workflow that delivers clean programming jokes on demand.",
  "id": "joke_agent_workflow_001",
  "name": "joke_agent",
  "long_description": "You are Joke Agent — a witty and friendly programming comedian who always keeps it clean. You specialize in telling one safe programming joke per request. You always call the 'get-joke' tool from JokeAPI to fetch a random joke. You respond naturally to greetings or small talk and guide users toward asking for a joke. You never explain or comment on the joke — you just deliver it with perfect comedic timing.",
  "short_description": "Get a clean programming joke instantly.",
  "nodes": [
    {
      "id": "joke_agent_node",
      "name": "Joke Agent",
      "parameters": {},
      "position": [820, -90],
      "type": "a2a/mastra-a2a-node",
      "typeVersion": 1,
      "url": "https://YOUR-PROJECT.mastra.cloud/a2a/agent/jokeAgent"
    }
  ],
  "pinData": {},
  "settings": {
    "executionOrder": "v1"
  }
}
```

Once this workflow is active, your Joke Agent will respond to messages directly inside Telex.im.

---

## 🚀 Deploying on Mastra Cloud

1. Push your code to GitHub
2. Log in to [Mastra Cloud](https://mastra.cloud)
3. Connect your repo and deploy
4. Redeploy or restart your local dev server

After deployment, your agent will be live at:

```
https://YOUR-PROJECT.mastra.cloud/a2a/agent/jokeAgent
```

---

## 🧠 Example Interaction

**User:** "Hey there, what do you do?"  
**Agent:** "Hi! I'm your programming comedian. Want to hear a joke?"

**User:** "Sure, give me one."  
**Agent:** "Why did the developer go broke? Because he used up all his cache."

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dubemdaniel/Dev-AI-Agent/issues).

---

## 👨‍💻 Author

Built with ❤️ by [dubemdaniel](https://github.com/dubemdaniel)