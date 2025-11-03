import { registerApiRoute } from "@mastra/core/server";
import { randomUUID } from "crypto";

type A2APart = { kind: "text"; text: string } | { kind: "data"; data: unknown };

export const a2aAgentRoute = registerApiRoute("/a2a/agent/:agentId", {
  method: "POST",
  handler: async (c) => {
    try {
      const mastra = c.get("mastra");
      const agentId = c.req.param("agentId");

      // Safely parse body
      let body: any = {};
      try {
        body = await c.req.json();
      } catch {
        body = {};
      }

      // Handle empty body (Mastra ping check)
      if (!body || Object.keys(body).length === 0) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: randomUUID(),
            result: {
              message: "✅ Joke Agent API is alive and ready.",
              status: "ok",
            },
          },
          200
        );
      }

      // Extract JSON-RPC fields properly
      const { jsonrpc, id: requestId, method, params } = body;

      // JSON-RPC 2.0 validation (must include method & id)
      if (jsonrpc !== "2.0" || !requestId || !method) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId || null,
            error: {
              code: -32600,
              message:
                'Invalid Request: must include "jsonrpc": "2.0", "id", and "method"',
            },
          },
          200
        );
      }

      // Validate agent existence
      const agent = mastra.getAgent(agentId);
      if (!agent) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId,
            error: {
              code: -32602,
              message: `Agent '${agentId}' not found`,
            },
          },
          404
        );
      }

      // Extract message data
      const { message, messages, contextId, taskId, metadata } = params || {};

      const messagesList = message
        ? [message]
        : Array.isArray(messages)
        ? messages
        : [];

      //  Convert messages to Mastra format
      const mastraMessages = messagesList.map((msg: any) => ({
        role: msg.role,
        content:
          msg.parts
            ?.map((part: { kind: string; text?: string; data?: unknown }) =>
              part.kind === "text"
                ? part.text
                : JSON.stringify(part.data ?? "")
            )
            .join("\n") || "",
      }));

      //  Generate agent response
      const response = await agent.generate(mastraMessages);
      const agentText = response.text || "";

      // Build artifacts
      const artifacts: {
        artifactId: string;
        name: string;
        parts: A2APart[];
      }[] = [
        {
          artifactId: randomUUID(),
          name: `${agentId}Response`,
          parts: [{ kind: "text", text: agentText }],
        },
      ];

      if (response.toolResults?.length) {
        artifacts.push({
          artifactId: randomUUID(),
          name: "ToolResults",
          parts: response.toolResults.map((result) => ({
            kind: "data",
            data: result,
          })),
        });
      }

      // Build message history
      const history = [
        ...messagesList.map((msg: any) => ({
          kind: "message",
          role: msg.role,
          parts: msg.parts,
          messageId: msg.messageId || randomUUID(),
          taskId: msg.taskId || taskId || randomUUID(),
        })),
        {
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: agentText }],
          messageId: randomUUID(),
          taskId: taskId || randomUUID(),
        },
      ];

      // Return A2A-compliant response
      return c.json({
        jsonrpc: "2.0",
        id: requestId,
        result: {
          id: taskId || randomUUID(),
          contextId: contextId || randomUUID(),
          status: {
            state: "completed",
            timestamp: new Date().toISOString(),
            message: {
              kind: "message",
              messageId: randomUUID(),
              role: "agent",
              parts: [{ kind: "text", text: agentText }],
            },
          },
          artifacts,
          history,
          kind: "task",
        },
      });
    } catch (err) {
      const error = err as Error;
      return c.json(
        {
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32603,
            message: "Internal error",
            data: { details: error.message },
          },
        },
        200 
      );
    }
  },
});
