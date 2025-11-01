import { A as AISpanType } from './ai-tracing.mjs';
import { o as object, s as string, r as record, _ as _enum, a as any, n as number } from './coerce.mjs';

record(string(), any()).optional();
var scoringValueSchema = number();
object({
  result: record(string(), any()).optional(),
  score: scoringValueSchema,
  prompt: string().optional()
});
var saveScorePayloadSchema = object({
  runId: string(),
  scorerId: string(),
  entityId: string(),
  score: number(),
  input: any().optional(),
  output: any(),
  source: _enum(["LIVE", "TEST"]),
  entityType: _enum(["AGENT", "WORKFLOW", ...Object.values(AISpanType)]).optional(),
  scorer: record(string(), any()),
  traceId: string().optional(),
  spanId: string().optional(),
  preprocessStepResult: record(string(), any()).optional(),
  extractStepResult: record(string(), any()).optional(),
  analyzeStepResult: record(string(), any()).optional(),
  reason: string().optional(),
  metadata: record(string(), any()).optional(),
  preprocessPrompt: string().optional(),
  extractPrompt: string().optional(),
  generateScorePrompt: string().optional(),
  generateReasonPrompt: string().optional(),
  analyzePrompt: string().optional(),
  additionalContext: record(string(), any()).optional(),
  runtimeContext: record(string(), any()).optional(),
  entity: record(string(), any()).optional(),
  resourceId: string().optional(),
  threadId: string().optional()
});

export { saveScorePayloadSchema as s };
