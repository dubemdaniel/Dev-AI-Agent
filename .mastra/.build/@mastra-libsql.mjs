import { createClient } from '@libsql/client';
import { M as MastraError, E as ErrorCategory, a as ErrorDomain } from './error.mjs';
import { M as MastraBase } from './_commonjsHelpers.mjs';
import { T as TABLE_WORKFLOW_SNAPSHOT, a as TABLE_EVALS, b as TABLE_MESSAGES, c as TABLE_THREADS, d as TABLE_TRACES, e as TABLE_SCHEMAS, f as TABLE_SCORERS, g as TABLE_RESOURCES, h as TABLE_AI_SPANS, A as AI_SPAN_SCHEMA } from './storage.mjs';
import { p as parseSqlIdentifier } from './ai-tracing.mjs';
import { s as saveScorePayloadSchema } from './chunk-KAEQISOW.mjs';
import { M as MessageList } from './chunk-E3PG7G6E.mjs';

// src/storage/base.ts
function ensureDate(date) {
  if (!date) return void 0;
  return date instanceof Date ? date : new Date(date);
}
function serializeDate(date) {
  if (!date) return void 0;
  const dateObj = ensureDate(date);
  return dateObj?.toISOString();
}
function resolveMessageLimit({
  last,
  defaultLimit
}) {
  if (typeof last === "number") return Math.max(0, last);
  if (last === false) return 0;
  return defaultLimit;
}
var MastraStorage = class extends MastraBase {
  /** @deprecated import from { TABLE_WORKFLOW_SNAPSHOT } '@mastra/core/storage' instead */
  static TABLE_WORKFLOW_SNAPSHOT = TABLE_WORKFLOW_SNAPSHOT;
  /** @deprecated import from { TABLE_EVALS } '@mastra/core/storage' instead */
  static TABLE_EVALS = TABLE_EVALS;
  /** @deprecated import from { TABLE_MESSAGES } '@mastra/core/storage' instead */
  static TABLE_MESSAGES = TABLE_MESSAGES;
  /** @deprecated import from { TABLE_THREADS } '@mastra/core/storage' instead */
  static TABLE_THREADS = TABLE_THREADS;
  /** @deprecated import { TABLE_TRACES } from '@mastra/core/storage' instead */
  static TABLE_TRACES = TABLE_TRACES;
  hasInitialized = null;
  shouldCacheInit = true;
  stores;
  constructor({ name }) {
    super({
      component: "STORAGE",
      name
    });
  }
  get supports() {
    return {
      selectByIncludeResourceScope: false,
      resourceWorkingMemory: false,
      hasColumn: false,
      createTable: false,
      deleteMessages: false,
      aiTracing: false,
      indexManagement: false,
      getScoresBySpan: false
    };
  }
  ensureDate(date) {
    return ensureDate(date);
  }
  serializeDate(date) {
    return serializeDate(date);
  }
  /**
   * Resolves limit for how many messages to fetch
   *
   * @param last The number of messages to fetch
   * @param defaultLimit The default limit to use if last is not provided
   * @returns The resolved limit
   */
  resolveMessageLimit({
    last,
    defaultLimit
  }) {
    return resolveMessageLimit({ last, defaultLimit });
  }
  getSqlType(type) {
    switch (type) {
      case "text":
        return "TEXT";
      case "timestamp":
        return "TIMESTAMP";
      case "float":
        return "FLOAT";
      case "integer":
        return "INTEGER";
      case "bigint":
        return "BIGINT";
      case "jsonb":
        return "JSONB";
      default:
        return "TEXT";
    }
  }
  getDefaultValue(type) {
    switch (type) {
      case "text":
      case "uuid":
        return "DEFAULT ''";
      case "timestamp":
        return "DEFAULT '1970-01-01 00:00:00'";
      case "integer":
      case "float":
      case "bigint":
        return "DEFAULT 0";
      case "jsonb":
        return "DEFAULT '{}'";
      default:
        return "DEFAULT ''";
    }
  }
  batchTraceInsert({ records }) {
    if (this.stores?.traces) {
      return this.stores.traces.batchTraceInsert({ records });
    }
    return this.batchInsert({ tableName: TABLE_TRACES, records });
  }
  async getResourceById(_) {
    throw new Error(
      `Resource working memory is not supported by this storage adapter (${this.constructor.name}). Supported storage adapters: LibSQL (@mastra/libsql), PostgreSQL (@mastra/pg), Upstash (@mastra/upstash). To use per-resource working memory, switch to one of these supported storage adapters.`
    );
  }
  async saveResource(_) {
    throw new Error(
      `Resource working memory is not supported by this storage adapter (${this.constructor.name}). Supported storage adapters: LibSQL (@mastra/libsql), PostgreSQL (@mastra/pg), Upstash (@mastra/upstash). To use per-resource working memory, switch to one of these supported storage adapters.`
    );
  }
  async updateResource(_) {
    throw new Error(
      `Resource working memory is not supported by this storage adapter (${this.constructor.name}). Supported storage adapters: LibSQL (@mastra/libsql), PostgreSQL (@mastra/pg), Upstash (@mastra/upstash). To use per-resource working memory, switch to one of these supported storage adapters.`
    );
  }
  async deleteMessages(_messageIds) {
    throw new Error(
      `Message deletion is not supported by this storage adapter (${this.constructor.name}). The deleteMessages method needs to be implemented in the storage adapter.`
    );
  }
  async init() {
    if (this.shouldCacheInit && await this.hasInitialized) {
      return;
    }
    const tableCreationTasks = [
      this.createTable({
        tableName: TABLE_WORKFLOW_SNAPSHOT,
        schema: TABLE_SCHEMAS[TABLE_WORKFLOW_SNAPSHOT]
      }),
      this.createTable({
        tableName: TABLE_EVALS,
        schema: TABLE_SCHEMAS[TABLE_EVALS]
      }),
      this.createTable({
        tableName: TABLE_THREADS,
        schema: TABLE_SCHEMAS[TABLE_THREADS]
      }),
      this.createTable({
        tableName: TABLE_MESSAGES,
        schema: TABLE_SCHEMAS[TABLE_MESSAGES]
      }),
      this.createTable({
        tableName: TABLE_TRACES,
        schema: TABLE_SCHEMAS[TABLE_TRACES]
      }),
      this.createTable({
        tableName: TABLE_SCORERS,
        schema: TABLE_SCHEMAS[TABLE_SCORERS]
      })
    ];
    if (this.supports.resourceWorkingMemory) {
      tableCreationTasks.push(
        this.createTable({
          tableName: TABLE_RESOURCES,
          schema: TABLE_SCHEMAS[TABLE_RESOURCES]
        })
      );
    }
    if (this.supports.aiTracing) {
      tableCreationTasks.push(
        this.createTable({
          tableName: TABLE_AI_SPANS,
          schema: TABLE_SCHEMAS[TABLE_AI_SPANS]
        })
      );
    }
    this.hasInitialized = Promise.all(tableCreationTasks).then(() => true);
    await this.hasInitialized;
    await this?.alterTable?.({
      tableName: TABLE_MESSAGES,
      schema: TABLE_SCHEMAS[TABLE_MESSAGES],
      ifNotExists: ["resourceId"]
    });
    await this?.alterTable?.({
      tableName: TABLE_WORKFLOW_SNAPSHOT,
      schema: TABLE_SCHEMAS[TABLE_WORKFLOW_SNAPSHOT],
      ifNotExists: ["resourceId"]
    });
    await this?.alterTable?.({
      tableName: TABLE_SCORERS,
      schema: TABLE_SCHEMAS[TABLE_SCORERS],
      ifNotExists: ["spanId"]
    });
  }
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    resourceId,
    snapshot
  }) {
    await this.init();
    const data = {
      workflow_name: workflowName,
      run_id: runId,
      resourceId,
      snapshot,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.logger.debug("Persisting workflow snapshot", { workflowName, runId, data });
    await this.insert({
      tableName: TABLE_WORKFLOW_SNAPSHOT,
      record: data
    });
  }
  async loadWorkflowSnapshot({
    workflowName,
    runId
  }) {
    if (!this.hasInitialized) {
      await this.init();
    }
    this.logger.debug("Loading workflow snapshot", { workflowName, runId });
    const d = await this.load({
      tableName: TABLE_WORKFLOW_SNAPSHOT,
      keys: { workflow_name: workflowName, run_id: runId }
    });
    return d ? d.snapshot : null;
  }
  async getScoresBySpan({
    traceId,
    spanId,
    pagination: _pagination
  }) {
    throw new MastraError({
      id: "SCORES_STORAGE_GET_SCORES_BY_SPAN_NOT_IMPLEMENTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      details: { traceId, spanId }
    });
  }
  /**
   * OBSERVABILITY
   */
  /**
   * Provides hints for AI tracing strategy selection by the DefaultExporter.
   * Storage adapters can override this to specify their preferred and supported strategies.
   */
  get aiTracingStrategy() {
    if (this.stores?.observability) {
      return this.stores.observability.aiTracingStrategy;
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_TRACING_STRATEGY_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Creates a single AI span record in the storage provider.
   */
  async createAISpan(span) {
    if (this.stores?.observability) {
      return this.stores.observability.createAISpan(span);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_CREATE_AI_SPAN_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Updates a single AI span with partial data. Primarily used for realtime trace creation.
   */
  async updateAISpan(params) {
    if (this.stores?.observability) {
      return this.stores.observability.updateAISpan(params);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_UPDATE_AI_SPAN_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Retrieves a single AI trace with all its associated spans.
   */
  async getAITrace(traceId) {
    if (this.stores?.observability) {
      return this.stores.observability.getAITrace(traceId);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_GET_AI_TRACE_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Retrieves a paginated list of AI traces with optional filtering.
   */
  async getAITracesPaginated(args) {
    if (this.stores?.observability) {
      return this.stores.observability.getAITracesPaginated(args);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_GET_AI_TRACES_PAGINATED_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Creates multiple AI spans in a single batch.
   */
  async batchCreateAISpans(args) {
    if (this.stores?.observability) {
      return this.stores.observability.batchCreateAISpans(args);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_BATCH_CREATE_AI_SPANS_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Updates multiple AI spans in a single batch.
   */
  async batchUpdateAISpans(args) {
    if (this.stores?.observability) {
      return this.stores.observability.batchUpdateAISpans(args);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_BATCH_UPDATE_AI_SPANS_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Deletes multiple AI traces and all their associated spans in a single batch operation.
   */
  async batchDeleteAITraces(args) {
    if (this.stores?.observability) {
      return this.stores.observability.batchDeleteAITraces(args);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_BATCH_DELETE_AI_TRACES_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `AI tracing is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * DATABASE INDEX MANAGEMENT
   * These methods delegate to the operations store for index management.
   * Storage adapters that support indexes should implement these in their operations class.
   */
  /**
   * Creates a database index on specified columns
   * @throws {MastraError} if not supported by the storage adapter
   */
  async createIndex(options) {
    if (this.stores?.operations) {
      return this.stores.operations.createIndex(options);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_CREATE_INDEX_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Drops a database index by name
   * @throws {MastraError} if not supported by the storage adapter
   */
  async dropIndex(indexName) {
    if (this.stores?.operations) {
      return this.stores.operations.dropIndex(indexName);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_DROP_INDEX_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Lists database indexes for a table or all tables
   * @throws {MastraError} if not supported by the storage adapter
   */
  async listIndexes(tableName) {
    if (this.stores?.operations) {
      return this.stores.operations.listIndexes(tableName);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_LIST_INDEXES_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter (${this.constructor.name})`
    });
  }
  /**
   * Gets detailed statistics for a specific index
   * @throws {MastraError} if not supported by the storage adapter
   */
  async describeIndex(indexName) {
    if (this.stores?.operations) {
      return this.stores.operations.describeIndex(indexName);
    }
    throw new MastraError({
      id: "MASTRA_STORAGE_DESCRIBE_INDEX_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter (${this.constructor.name})`
    });
  }
};

// src/storage/domains/legacy-evals/base.ts
var LegacyEvalsStorage = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "LEGACY_EVALS"
    });
  }
};

// src/storage/domains/memory/base.ts
var MemoryStorage = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "MEMORY"
    });
  }
  async deleteMessages(_messageIds) {
    throw new Error(
      `Message deletion is not supported by this storage adapter (${this.constructor.name}). The deleteMessages method needs to be implemented in the storage adapter.`
    );
  }
  async getResourceById(_) {
    throw new Error(
      `Resource working memory is not supported by this storage adapter (${this.constructor.name}). Supported storage adapters: LibSQL (@mastra/libsql), PostgreSQL (@mastra/pg), Upstash (@mastra/upstash). To use per-resource working memory, switch to one of these supported storage adapters.`
    );
  }
  async saveResource(_) {
    throw new Error(
      `Resource working memory is not supported by this storage adapter (${this.constructor.name}). Supported storage adapters: LibSQL (@mastra/libsql), PostgreSQL (@mastra/pg), Upstash (@mastra/upstash). To use per-resource working memory, switch to one of these supported storage adapters.`
    );
  }
  async updateResource(_) {
    throw new Error(
      `Resource working memory is not supported by this storage adapter (${this.constructor.name}). Supported storage adapters: LibSQL (@mastra/libsql), PostgreSQL (@mastra/pg), Upstash (@mastra/upstash). To use per-resource working memory, switch to one of these supported storage adapters.`
    );
  }
  castThreadOrderBy(v) {
    return v in THREAD_ORDER_BY_SET ? v : "createdAt";
  }
  castThreadSortDirection(v) {
    return v in THREAD_THREAD_SORT_DIRECTION_SET ? v : "DESC";
  }
};
var THREAD_ORDER_BY_SET = {
  createdAt: true,
  updatedAt: true
};
var THREAD_THREAD_SORT_DIRECTION_SET = {
  ASC: true,
  DESC: true
};

// src/storage/domains/observability/base.ts
var ObservabilityStorage = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "OBSERVABILITY"
    });
  }
  /**
   * Provides hints for AI tracing strategy selection by the DefaultExporter.
   * Storage adapters can override this to specify their preferred and supported strategies.
   */
  get aiTracingStrategy() {
    return {
      preferred: "batch-with-updates",
      // Default for most SQL stores
      supported: ["realtime", "batch-with-updates", "insert-only"]
    };
  }
  /**
   * Creates a single AI span record in the storage provider.
   */
  createAISpan(_span) {
    throw new MastraError({
      id: "OBSERVABILITY_CREATE_AI_SPAN_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support creating AI spans"
    });
  }
  /**
   * Updates a single AI span with partial data. Primarily used for realtime trace creation.
   */
  updateAISpan(_params) {
    throw new MastraError({
      id: "OBSERVABILITY_STORAGE_UPDATE_AI_SPAN_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support updating AI spans"
    });
  }
  /**
   * Retrieves a single AI trace with all its associated spans.
   */
  getAITrace(_traceId) {
    throw new MastraError({
      id: "OBSERVABILITY_STORAGE_GET_AI_TRACE_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support getting AI traces"
    });
  }
  /**
   * Retrieves a paginated list of AI traces with optional filtering.
   */
  getAITracesPaginated(_args) {
    throw new MastraError({
      id: "OBSERVABILITY_STORAGE_GET_AI_TRACES_PAGINATED_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support getting AI traces paginated"
    });
  }
  /**
   * Creates multiple AI spans in a single batch.
   */
  batchCreateAISpans(_args) {
    throw new MastraError({
      id: "OBSERVABILITY_STORAGE_BATCH_CREATE_AI_SPAN_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support batch creating AI spans"
    });
  }
  /**
   * Updates multiple AI spans in a single batch.
   */
  batchUpdateAISpans(_args) {
    throw new MastraError({
      id: "OBSERVABILITY_STORAGE_BATCH_UPDATE_AI_SPAN_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support batch updating AI spans"
    });
  }
  /**
   * Deletes multiple AI traces and all their associated spans in a single batch operation.
   */
  batchDeleteAITraces(_args) {
    throw new MastraError({
      id: "OBSERVABILITY_STORAGE_BATCH_DELETE_AI_SPAN_NOT_IMPLEMENTED",
      domain: "MASTRA_OBSERVABILITY" /* MASTRA_OBSERVABILITY */,
      category: "SYSTEM" /* SYSTEM */,
      text: "This storage provider does not support batch deleting AI traces"
    });
  }
};

// src/storage/domains/operations/base.ts
var StoreOperations = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "OPERATIONS"
    });
  }
  getSqlType(type) {
    switch (type) {
      case "text":
        return "TEXT";
      case "timestamp":
        return "TIMESTAMP";
      case "float":
        return "FLOAT";
      case "integer":
        return "INTEGER";
      case "bigint":
        return "BIGINT";
      case "jsonb":
        return "JSONB";
      default:
        return "TEXT";
    }
  }
  getDefaultValue(type) {
    switch (type) {
      case "text":
      case "uuid":
        return "DEFAULT ''";
      case "timestamp":
        return "DEFAULT '1970-01-01 00:00:00'";
      case "integer":
      case "bigint":
      case "float":
        return "DEFAULT 0";
      case "jsonb":
        return "DEFAULT '{}'";
      default:
        return "DEFAULT ''";
    }
  }
  /**
   * DATABASE INDEX MANAGEMENT
   * Optional methods for database index management.
   * Storage adapters can override these to provide index management capabilities.
   */
  /**
   * Creates a database index on specified columns
   * @throws {MastraError} if not supported by the storage adapter
   */
  async createIndex(_options) {
    throw new MastraError({
      id: "MASTRA_STORAGE_CREATE_INDEX_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter`
    });
  }
  /**
   * Drops a database index by name
   * @throws {MastraError} if not supported by the storage adapter
   */
  async dropIndex(_indexName) {
    throw new MastraError({
      id: "MASTRA_STORAGE_DROP_INDEX_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter`
    });
  }
  /**
   * Lists database indexes for a table or all tables
   * @throws {MastraError} if not supported by the storage adapter
   */
  async listIndexes(_tableName) {
    throw new MastraError({
      id: "MASTRA_STORAGE_LIST_INDEXES_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter`
    });
  }
  /**
   * Gets detailed statistics for a specific index
   * @throws {MastraError} if not supported by the storage adapter
   */
  async describeIndex(_indexName) {
    throw new MastraError({
      id: "MASTRA_STORAGE_DESCRIBE_INDEX_NOT_SUPPORTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      text: `Index management is not supported by this storage adapter`
    });
  }
  /**
   * Returns definitions for automatic performance indexes
   * Storage adapters can override this to define indexes that should be created during initialization
   * @returns Array of index definitions to create automatically
   */
  getAutomaticIndexDefinitions() {
    return [];
  }
};

// src/storage/domains/scores/base.ts
var ScoresStorage = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "SCORES"
    });
  }
  async getScoresBySpan({
    traceId,
    spanId,
    pagination: _pagination
  }) {
    throw new MastraError({
      id: "SCORES_STORAGE_GET_SCORES_BY_SPAN_NOT_IMPLEMENTED",
      domain: "STORAGE" /* STORAGE */,
      category: "SYSTEM" /* SYSTEM */,
      details: { traceId, spanId }
    });
  }
};

// src/storage/domains/traces/base.ts
var TracesStorage = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "TRACES"
    });
  }
};

// src/storage/domains/workflows/base.ts
var WorkflowsStorage = class extends MastraBase {
  constructor() {
    super({
      component: "STORAGE",
      name: "WORKFLOWS"
    });
  }
};

// src/storage/utils.ts
function safelyParseJSON(input) {
  if (input && typeof input === "object") return input;
  if (input == null) return {};
  if (typeof input === "string") {
    try {
      return JSON.parse(input);
    } catch {
      return input;
    }
  }
  return {};
}

function transformEvalRow(row) {
  const resultValue = JSON.parse(row.result);
  const testInfoValue = row.test_info ? JSON.parse(row.test_info) : void 0;
  if (!resultValue || typeof resultValue !== "object" || !("score" in resultValue)) {
    throw new Error(`Invalid MetricResult format: ${JSON.stringify(resultValue)}`);
  }
  return {
    input: row.input,
    output: row.output,
    result: resultValue,
    agentName: row.agent_name,
    metricName: row.metric_name,
    instructions: row.instructions,
    testInfo: testInfoValue,
    globalRunId: row.global_run_id,
    runId: row.run_id,
    createdAt: row.created_at
  };
}
var LegacyEvalsLibSQL = class extends LegacyEvalsStorage {
  client;
  constructor({ client }) {
    super();
    this.client = client;
  }
  /** @deprecated use getEvals instead */
  async getEvalsByAgentName(agentName, type) {
    try {
      const baseQuery = `SELECT * FROM ${TABLE_EVALS} WHERE agent_name = ?`;
      const typeCondition = type === "test" ? " AND test_info IS NOT NULL AND test_info->>'testPath' IS NOT NULL" : type === "live" ? " AND (test_info IS NULL OR test_info->>'testPath' IS NULL)" : "";
      const result = await this.client.execute({
        sql: `${baseQuery}${typeCondition} ORDER BY created_at DESC`,
        args: [agentName]
      });
      return result.rows?.map((row) => transformEvalRow(row)) ?? [];
    } catch (error) {
      if (error instanceof Error && error.message.includes("no such table")) {
        return [];
      }
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_EVALS_BY_AGENT_NAME_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { agentName }
        },
        error
      );
    }
  }
  async getEvals(options = {}) {
    const { agentName, type, page = 0, perPage = 100, dateRange } = options;
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const conditions = [];
    const queryParams = [];
    if (agentName) {
      conditions.push(`agent_name = ?`);
      queryParams.push(agentName);
    }
    if (type === "test") {
      conditions.push(`(test_info IS NOT NULL AND json_extract(test_info, '$.testPath') IS NOT NULL)`);
    } else if (type === "live") {
      conditions.push(`(test_info IS NULL OR json_extract(test_info, '$.testPath') IS NULL)`);
    }
    if (fromDate) {
      conditions.push(`created_at >= ?`);
      queryParams.push(fromDate.toISOString());
    }
    if (toDate) {
      conditions.push(`created_at <= ?`);
      queryParams.push(toDate.toISOString());
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    try {
      const countResult = await this.client.execute({
        sql: `SELECT COUNT(*) as count FROM ${TABLE_EVALS} ${whereClause}`,
        args: queryParams
      });
      const total = Number(countResult.rows?.[0]?.count ?? 0);
      const currentOffset = page * perPage;
      const hasMore = currentOffset + perPage < total;
      if (total === 0) {
        return {
          evals: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const dataResult = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_EVALS} ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        args: [...queryParams, perPage, currentOffset]
      });
      return {
        evals: dataResult.rows?.map((row) => transformEvalRow(row)) ?? [],
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_EVALS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
};
var MemoryLibSQL = class extends MemoryStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  parseRow(row) {
    let content = row.content;
    try {
      content = JSON.parse(row.content);
    } catch {
    }
    const result = {
      id: row.id,
      content,
      role: row.role,
      createdAt: new Date(row.createdAt),
      threadId: row.thread_id,
      resourceId: row.resourceId
    };
    if (row.type && row.type !== `v2`) result.type = row.type;
    return result;
  }
  async _getIncludedMessages({
    threadId,
    selectBy
  }) {
    if (!threadId.trim()) throw new Error("threadId must be a non-empty string");
    const include = selectBy?.include;
    if (!include) return null;
    const unionQueries = [];
    const params = [];
    for (const inc of include) {
      const { id, withPreviousMessages = 0, withNextMessages = 0 } = inc;
      const searchId = inc.threadId || threadId;
      unionQueries.push(
        `
                SELECT * FROM (
                  WITH numbered_messages AS (
                    SELECT
                      id, content, role, type, "createdAt", thread_id, "resourceId",
                      ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) as row_num
                    FROM "${TABLE_MESSAGES}"
                    WHERE thread_id = ?
                  ),
                  target_positions AS (
                    SELECT row_num as target_pos
                    FROM numbered_messages
                    WHERE id = ?
                  )
                  SELECT DISTINCT m.*
                  FROM numbered_messages m
                  CROSS JOIN target_positions t
                  WHERE m.row_num BETWEEN (t.target_pos - ?) AND (t.target_pos + ?)
                ) 
                `
        // Keep ASC for final sorting after fetching context
      );
      params.push(searchId, id, withPreviousMessages, withNextMessages);
    }
    const finalQuery = unionQueries.join(" UNION ALL ") + ' ORDER BY "createdAt" ASC';
    const includedResult = await this.client.execute({ sql: finalQuery, args: params });
    const includedRows = includedResult.rows?.map((row) => this.parseRow(row));
    const seen = /* @__PURE__ */ new Set();
    const dedupedRows = includedRows.filter((row) => {
      if (seen.has(row.id)) return false;
      seen.add(row.id);
      return true;
    });
    return dedupedRows;
  }
  async getMessages({
    threadId,
    resourceId,
    selectBy,
    format
  }) {
    try {
      if (!threadId.trim()) throw new Error("threadId must be a non-empty string");
      const messages = [];
      const limit = resolveMessageLimit({ last: selectBy?.last, defaultLimit: 40 });
      if (selectBy?.include?.length) {
        const includeMessages = await this._getIncludedMessages({ threadId, selectBy });
        if (includeMessages) {
          messages.push(...includeMessages);
        }
      }
      const excludeIds = messages.map((m) => m.id);
      const remainingSql = `
        SELECT 
          id, 
          content, 
          role, 
          type,
          "createdAt", 
          thread_id,
          "resourceId"
        FROM "${TABLE_MESSAGES}"
        WHERE thread_id = ?
        ${excludeIds.length ? `AND id NOT IN (${excludeIds.map(() => "?").join(", ")})` : ""}
        ORDER BY "createdAt" DESC
        LIMIT ?
      `;
      const remainingArgs = [threadId, ...excludeIds.length ? excludeIds : [], limit];
      const remainingResult = await this.client.execute({ sql: remainingSql, args: remainingArgs });
      if (remainingResult.rows) {
        messages.push(...remainingResult.rows.map((row) => this.parseRow(row)));
      }
      messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      const list = new MessageList().add(messages, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId, resourceId: resourceId ?? "" }
        },
        error
      );
    }
  }
  async getMessagesById({
    messageIds,
    format
  }) {
    if (messageIds.length === 0) return [];
    try {
      const sql = `
        SELECT 
          id, 
          content, 
          role, 
          type,
          "createdAt", 
          thread_id,
          "resourceId"
        FROM "${TABLE_MESSAGES}"
        WHERE id IN (${messageIds.map(() => "?").join(", ")})
        ORDER BY "createdAt" DESC
      `;
      const result = await this.client.execute({ sql, args: messageIds });
      if (!result.rows) return [];
      const list = new MessageList().add(result.rows.map(this.parseRow), "memory");
      if (format === `v1`) return list.get.all.v1();
      return list.get.all.v2();
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_MESSAGES_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { messageIds: JSON.stringify(messageIds) }
        },
        error
      );
    }
  }
  async getMessagesPaginated(args) {
    const { threadId, format, selectBy } = args;
    const { page = 0, perPage: perPageInput, dateRange } = selectBy?.pagination || {};
    const perPage = perPageInput !== void 0 ? perPageInput : resolveMessageLimit({ last: selectBy?.last, defaultLimit: 40 });
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const messages = [];
    if (selectBy?.include?.length) {
      try {
        const includeMessages = await this._getIncludedMessages({ threadId, selectBy });
        if (includeMessages) {
          messages.push(...includeMessages);
        }
      } catch (error) {
        throw new MastraError(
          {
            id: "LIBSQL_STORE_GET_MESSAGES_PAGINATED_GET_INCLUDE_MESSAGES_FAILED",
            domain: ErrorDomain.STORAGE,
            category: ErrorCategory.THIRD_PARTY,
            details: { threadId }
          },
          error
        );
      }
    }
    try {
      if (!threadId.trim()) throw new Error("threadId must be a non-empty string");
      const currentOffset = page * perPage;
      const conditions = [`thread_id = ?`];
      const queryParams = [threadId];
      if (fromDate) {
        conditions.push(`"createdAt" >= ?`);
        queryParams.push(fromDate.toISOString());
      }
      if (toDate) {
        conditions.push(`"createdAt" <= ?`);
        queryParams.push(toDate.toISOString());
      }
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const countResult = await this.client.execute({
        sql: `SELECT COUNT(*) as count FROM ${TABLE_MESSAGES} ${whereClause}`,
        args: queryParams
      });
      const total = Number(countResult.rows?.[0]?.count ?? 0);
      if (total === 0 && messages.length === 0) {
        return {
          messages: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const excludeIds = messages.map((m) => m.id);
      const excludeIdsParam = excludeIds.map((_, idx) => `$${idx + queryParams.length + 1}`).join(", ");
      const dataResult = await this.client.execute({
        sql: `SELECT id, content, role, type, "createdAt", "resourceId", "thread_id" FROM ${TABLE_MESSAGES} ${whereClause} ${excludeIds.length ? `AND id NOT IN (${excludeIdsParam})` : ""} ORDER BY "createdAt" DESC LIMIT ? OFFSET ?`,
        args: [...queryParams, ...excludeIds, perPage, currentOffset]
      });
      messages.push(...(dataResult.rows || []).map((row) => this.parseRow(row)));
      const messagesToReturn = format === "v1" ? new MessageList().add(messages, "memory").get.all.v1() : new MessageList().add(messages, "memory").get.all.v2();
      return {
        messages: messagesToReturn,
        total,
        page,
        perPage,
        hasMore: currentOffset + messages.length < total
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "LIBSQL_STORE_GET_MESSAGES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
      this.logger?.trackException?.(mastraError);
      this.logger?.error?.(mastraError.toString());
      return { messages: [], total: 0, page, perPage, hasMore: false };
    }
  }
  async saveMessages({
    messages,
    format
  }) {
    if (messages.length === 0) return messages;
    try {
      const threadId = messages[0]?.threadId;
      if (!threadId) {
        throw new Error("Thread ID is required");
      }
      const batchStatements = messages.map((message) => {
        const time = message.createdAt || /* @__PURE__ */ new Date();
        if (!message.threadId) {
          throw new Error(
            `Expected to find a threadId for message, but couldn't find one. An unexpected error has occurred.`
          );
        }
        if (!message.resourceId) {
          throw new Error(
            `Expected to find a resourceId for message, but couldn't find one. An unexpected error has occurred.`
          );
        }
        return {
          sql: `INSERT INTO "${TABLE_MESSAGES}" (id, thread_id, content, role, type, "createdAt", "resourceId") 
                  VALUES (?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET
                    thread_id=excluded.thread_id,
                    content=excluded.content,
                    role=excluded.role,
                    type=excluded.type,
                    "resourceId"=excluded."resourceId"
                `,
          args: [
            message.id,
            message.threadId,
            typeof message.content === "object" ? JSON.stringify(message.content) : message.content,
            message.role,
            message.type || "v2",
            time instanceof Date ? time.toISOString() : time,
            message.resourceId
          ]
        };
      });
      const now = (/* @__PURE__ */ new Date()).toISOString();
      batchStatements.push({
        sql: `UPDATE "${TABLE_THREADS}" SET "updatedAt" = ? WHERE id = ?`,
        args: [now, threadId]
      });
      const BATCH_SIZE = 50;
      const messageStatements = batchStatements.slice(0, -1);
      const threadUpdateStatement = batchStatements[batchStatements.length - 1];
      for (let i = 0; i < messageStatements.length; i += BATCH_SIZE) {
        const batch = messageStatements.slice(i, i + BATCH_SIZE);
        if (batch.length > 0) {
          await this.client.batch(batch, "write");
        }
      }
      if (threadUpdateStatement) {
        await this.client.execute(threadUpdateStatement);
      }
      const list = new MessageList().add(messages, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_SAVE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async updateMessages({
    messages
  }) {
    if (messages.length === 0) {
      return [];
    }
    const messageIds = messages.map((m) => m.id);
    const placeholders = messageIds.map(() => "?").join(",");
    const selectSql = `SELECT * FROM ${TABLE_MESSAGES} WHERE id IN (${placeholders})`;
    const existingResult = await this.client.execute({ sql: selectSql, args: messageIds });
    const existingMessages = existingResult.rows.map((row) => this.parseRow(row));
    if (existingMessages.length === 0) {
      return [];
    }
    const batchStatements = [];
    const threadIdsToUpdate = /* @__PURE__ */ new Set();
    const columnMapping = {
      threadId: "thread_id"
    };
    for (const existingMessage of existingMessages) {
      const updatePayload = messages.find((m) => m.id === existingMessage.id);
      if (!updatePayload) continue;
      const { id, ...fieldsToUpdate } = updatePayload;
      if (Object.keys(fieldsToUpdate).length === 0) continue;
      threadIdsToUpdate.add(existingMessage.threadId);
      if (updatePayload.threadId && updatePayload.threadId !== existingMessage.threadId) {
        threadIdsToUpdate.add(updatePayload.threadId);
      }
      const setClauses = [];
      const args = [];
      const updatableFields = { ...fieldsToUpdate };
      if (updatableFields.content) {
        const newContent = {
          ...existingMessage.content,
          ...updatableFields.content,
          // Deep merge metadata if it exists on both
          ...existingMessage.content?.metadata && updatableFields.content.metadata ? {
            metadata: {
              ...existingMessage.content.metadata,
              ...updatableFields.content.metadata
            }
          } : {}
        };
        setClauses.push(`${parseSqlIdentifier("content", "column name")} = ?`);
        args.push(JSON.stringify(newContent));
        delete updatableFields.content;
      }
      for (const key in updatableFields) {
        if (Object.prototype.hasOwnProperty.call(updatableFields, key)) {
          const dbKey = columnMapping[key] || key;
          setClauses.push(`${parseSqlIdentifier(dbKey, "column name")} = ?`);
          let value = updatableFields[key];
          if (typeof value === "object" && value !== null) {
            value = JSON.stringify(value);
          }
          args.push(value);
        }
      }
      if (setClauses.length === 0) continue;
      args.push(id);
      const sql = `UPDATE ${TABLE_MESSAGES} SET ${setClauses.join(", ")} WHERE id = ?`;
      batchStatements.push({ sql, args });
    }
    if (batchStatements.length === 0) {
      return existingMessages;
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    for (const threadId of threadIdsToUpdate) {
      if (threadId) {
        batchStatements.push({
          sql: `UPDATE ${TABLE_THREADS} SET updatedAt = ? WHERE id = ?`,
          args: [now, threadId]
        });
      }
    }
    await this.client.batch(batchStatements, "write");
    const updatedResult = await this.client.execute({ sql: selectSql, args: messageIds });
    return updatedResult.rows.map((row) => this.parseRow(row));
  }
  async deleteMessages(messageIds) {
    if (!messageIds || messageIds.length === 0) {
      return;
    }
    try {
      const BATCH_SIZE = 100;
      const threadIds = /* @__PURE__ */ new Set();
      const tx = await this.client.transaction("write");
      try {
        for (let i = 0; i < messageIds.length; i += BATCH_SIZE) {
          const batch = messageIds.slice(i, i + BATCH_SIZE);
          const placeholders = batch.map(() => "?").join(",");
          const result = await tx.execute({
            sql: `SELECT DISTINCT thread_id FROM "${TABLE_MESSAGES}" WHERE id IN (${placeholders})`,
            args: batch
          });
          result.rows?.forEach((row) => {
            if (row.thread_id) threadIds.add(row.thread_id);
          });
          await tx.execute({
            sql: `DELETE FROM "${TABLE_MESSAGES}" WHERE id IN (${placeholders})`,
            args: batch
          });
        }
        if (threadIds.size > 0) {
          const now = (/* @__PURE__ */ new Date()).toISOString();
          for (const threadId of threadIds) {
            await tx.execute({
              sql: `UPDATE "${TABLE_THREADS}" SET "updatedAt" = ? WHERE id = ?`,
              args: [now, threadId]
            });
          }
        }
        await tx.commit();
      } catch (error) {
        await tx.rollback();
        throw error;
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_DELETE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { messageIds: messageIds.join(", ") }
        },
        error
      );
    }
  }
  async getResourceById({ resourceId }) {
    const result = await this.operations.load({
      tableName: TABLE_RESOURCES,
      keys: { id: resourceId }
    });
    if (!result) {
      return null;
    }
    return {
      ...result,
      // Ensure workingMemory is always returned as a string, even if auto-parsed as JSON
      workingMemory: result.workingMemory && typeof result.workingMemory === "object" ? JSON.stringify(result.workingMemory) : result.workingMemory,
      metadata: typeof result.metadata === "string" ? JSON.parse(result.metadata) : result.metadata,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt)
    };
  }
  async saveResource({ resource }) {
    await this.operations.insert({
      tableName: TABLE_RESOURCES,
      record: {
        ...resource,
        metadata: JSON.stringify(resource.metadata)
      }
    });
    return resource;
  }
  async updateResource({
    resourceId,
    workingMemory,
    metadata
  }) {
    const existingResource = await this.getResourceById({ resourceId });
    if (!existingResource) {
      const newResource = {
        id: resourceId,
        workingMemory,
        metadata: metadata || {},
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      return this.saveResource({ resource: newResource });
    }
    const updatedResource = {
      ...existingResource,
      workingMemory: workingMemory !== void 0 ? workingMemory : existingResource.workingMemory,
      metadata: {
        ...existingResource.metadata,
        ...metadata
      },
      updatedAt: /* @__PURE__ */ new Date()
    };
    const updates = [];
    const values = [];
    if (workingMemory !== void 0) {
      updates.push("workingMemory = ?");
      values.push(workingMemory);
    }
    if (metadata) {
      updates.push("metadata = ?");
      values.push(JSON.stringify(updatedResource.metadata));
    }
    updates.push("updatedAt = ?");
    values.push(updatedResource.updatedAt.toISOString());
    values.push(resourceId);
    await this.client.execute({
      sql: `UPDATE ${TABLE_RESOURCES} SET ${updates.join(", ")} WHERE id = ?`,
      args: values
    });
    return updatedResource;
  }
  async getThreadById({ threadId }) {
    try {
      const result = await this.operations.load({
        tableName: TABLE_THREADS,
        keys: { id: threadId }
      });
      if (!result) {
        return null;
      }
      return {
        ...result,
        metadata: typeof result.metadata === "string" ? JSON.parse(result.metadata) : result.metadata,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt)
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_THREAD_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
    }
  }
  /**
   * @deprecated use getThreadsByResourceIdPaginated instead for paginated results.
   */
  async getThreadsByResourceId(args) {
    const resourceId = args.resourceId;
    const orderBy = this.castThreadOrderBy(args.orderBy);
    const sortDirection = this.castThreadSortDirection(args.sortDirection);
    try {
      const baseQuery = `FROM ${TABLE_THREADS} WHERE resourceId = ?`;
      const queryParams = [resourceId];
      const mapRowToStorageThreadType = (row) => ({
        id: row.id,
        resourceId: row.resourceId,
        title: row.title,
        createdAt: new Date(row.createdAt),
        // Convert string to Date
        updatedAt: new Date(row.updatedAt),
        // Convert string to Date
        metadata: typeof row.metadata === "string" ? JSON.parse(row.metadata) : row.metadata
      });
      const result = await this.client.execute({
        sql: `SELECT * ${baseQuery} ORDER BY ${orderBy} ${sortDirection}`,
        args: queryParams
      });
      if (!result.rows) {
        return [];
      }
      return result.rows.map(mapRowToStorageThreadType);
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "LIBSQL_STORE_GET_THREADS_BY_RESOURCE_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error
      );
      this.logger?.trackException?.(mastraError);
      this.logger?.error?.(mastraError.toString());
      return [];
    }
  }
  async getThreadsByResourceIdPaginated(args) {
    const { resourceId, page = 0, perPage = 100 } = args;
    const orderBy = this.castThreadOrderBy(args.orderBy);
    const sortDirection = this.castThreadSortDirection(args.sortDirection);
    try {
      const baseQuery = `FROM ${TABLE_THREADS} WHERE resourceId = ?`;
      const queryParams = [resourceId];
      const mapRowToStorageThreadType = (row) => ({
        id: row.id,
        resourceId: row.resourceId,
        title: row.title,
        createdAt: new Date(row.createdAt),
        // Convert string to Date
        updatedAt: new Date(row.updatedAt),
        // Convert string to Date
        metadata: typeof row.metadata === "string" ? JSON.parse(row.metadata) : row.metadata
      });
      const currentOffset = page * perPage;
      const countResult = await this.client.execute({
        sql: `SELECT COUNT(*) as count ${baseQuery}`,
        args: queryParams
      });
      const total = Number(countResult.rows?.[0]?.count ?? 0);
      if (total === 0) {
        return {
          threads: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const dataResult = await this.client.execute({
        sql: `SELECT * ${baseQuery} ORDER BY ${orderBy} ${sortDirection} LIMIT ? OFFSET ?`,
        args: [...queryParams, perPage, currentOffset]
      });
      const threads = (dataResult.rows || []).map(mapRowToStorageThreadType);
      return {
        threads,
        total,
        page,
        perPage,
        hasMore: currentOffset + threads.length < total
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "LIBSQL_STORE_GET_THREADS_BY_RESOURCE_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error
      );
      this.logger?.trackException?.(mastraError);
      this.logger?.error?.(mastraError.toString());
      return { threads: [], total: 0, page, perPage, hasMore: false };
    }
  }
  async saveThread({ thread }) {
    try {
      await this.operations.insert({
        tableName: TABLE_THREADS,
        record: {
          ...thread,
          metadata: JSON.stringify(thread.metadata)
        }
      });
      return thread;
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "LIBSQL_STORE_SAVE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId: thread.id }
        },
        error
      );
      this.logger?.trackException?.(mastraError);
      this.logger?.error?.(mastraError.toString());
      throw mastraError;
    }
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    const thread = await this.getThreadById({ threadId: id });
    if (!thread) {
      throw new MastraError({
        id: "LIBSQL_STORE_UPDATE_THREAD_FAILED_THREAD_NOT_FOUND",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: `Thread ${id} not found`,
        details: {
          status: 404,
          threadId: id
        }
      });
    }
    const updatedThread = {
      ...thread,
      title,
      metadata: {
        ...thread.metadata,
        ...metadata
      }
    };
    try {
      await this.client.execute({
        sql: `UPDATE ${TABLE_THREADS} SET title = ?, metadata = ? WHERE id = ?`,
        args: [title, JSON.stringify(updatedThread.metadata), id]
      });
      return updatedThread;
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_UPDATE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to update thread ${id}`,
          details: { threadId: id }
        },
        error
      );
    }
  }
  async deleteThread({ threadId }) {
    try {
      await this.client.execute({
        sql: `DELETE FROM ${TABLE_MESSAGES} WHERE thread_id = ?`,
        args: [threadId]
      });
      await this.client.execute({
        sql: `DELETE FROM ${TABLE_THREADS} WHERE id = ?`,
        args: [threadId]
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_DELETE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
    }
  }
};
function createExecuteWriteOperationWithRetry({
  logger,
  maxRetries,
  initialBackoffMs
}) {
  return async function executeWriteOperationWithRetry(operationFn, operationDescription) {
    let retries = 0;
    while (true) {
      try {
        return await operationFn();
      } catch (error) {
        if (error.message && (error.message.includes("SQLITE_BUSY") || error.message.includes("database is locked")) && retries < maxRetries) {
          retries++;
          const backoffTime = initialBackoffMs * Math.pow(2, retries - 1);
          logger.warn(
            `LibSQLStore: Encountered SQLITE_BUSY during ${operationDescription}. Retrying (${retries}/${maxRetries}) in ${backoffTime}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, backoffTime));
        } else {
          logger.error(`LibSQLStore: Error during ${operationDescription} after ${retries} retries: ${error}`);
          throw error;
        }
      }
    }
  };
}
function prepareStatement({ tableName, record }) {
  const parsedTableName = parseSqlIdentifier(tableName, "table name");
  const columns = Object.keys(record).map((col) => parseSqlIdentifier(col, "column name"));
  const values = Object.values(record).map((v) => {
    if (typeof v === `undefined` || v === null) {
      return null;
    }
    if (v instanceof Date) {
      return v.toISOString();
    }
    return typeof v === "object" ? JSON.stringify(v) : v;
  });
  const placeholders = values.map(() => "?").join(", ");
  return {
    sql: `INSERT OR REPLACE INTO ${parsedTableName} (${columns.join(", ")}) VALUES (${placeholders})`,
    args: values
  };
}
function prepareUpdateStatement({
  tableName,
  updates,
  keys
}) {
  const parsedTableName = parseSqlIdentifier(tableName, "table name");
  const schema = TABLE_SCHEMAS[tableName];
  const updateColumns = Object.keys(updates).map((col) => parseSqlIdentifier(col, "column name"));
  const updateValues = Object.values(updates).map(transformToSqlValue);
  const setClause = updateColumns.map((col) => `${col} = ?`).join(", ");
  const whereClause = prepareWhereClause(keys, schema);
  return {
    sql: `UPDATE ${parsedTableName} SET ${setClause}${whereClause.sql}`,
    args: [...updateValues, ...whereClause.args]
  };
}
function transformToSqlValue(value) {
  if (typeof value === "undefined" || value === null) {
    return null;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return typeof value === "object" ? JSON.stringify(value) : value;
}
function prepareDeleteStatement({ tableName, keys }) {
  const parsedTableName = parseSqlIdentifier(tableName, "table name");
  const whereClause = prepareWhereClause(keys, TABLE_SCHEMAS[tableName]);
  return {
    sql: `DELETE FROM ${parsedTableName}${whereClause.sql}`,
    args: whereClause.args
  };
}
function prepareWhereClause(filters, schema) {
  const conditions = [];
  const args = [];
  for (const [columnName, filterValue] of Object.entries(filters)) {
    const column = schema[columnName];
    if (!column) {
      throw new Error(`Unknown column: ${columnName}`);
    }
    const parsedColumn = parseSqlIdentifier(columnName, "column name");
    const result = buildCondition2(parsedColumn, filterValue);
    conditions.push(result.condition);
    args.push(...result.args);
  }
  return {
    sql: conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "",
    args
  };
}
function buildCondition2(columnName, filterValue) {
  if (filterValue === null) {
    return { condition: `${columnName} IS NULL`, args: [] };
  }
  if (typeof filterValue === "object" && filterValue !== null && ("startAt" in filterValue || "endAt" in filterValue)) {
    return buildDateRangeCondition(columnName, filterValue);
  }
  return {
    condition: `${columnName} = ?`,
    args: [transformToSqlValue(filterValue)]
  };
}
function buildDateRangeCondition(columnName, range) {
  const conditions = [];
  const args = [];
  if (range.startAt !== void 0) {
    conditions.push(`${columnName} >= ?`);
    args.push(transformToSqlValue(range.startAt));
  }
  if (range.endAt !== void 0) {
    conditions.push(`${columnName} <= ?`);
    args.push(transformToSqlValue(range.endAt));
  }
  if (conditions.length === 0) {
    throw new Error("Date range must specify at least startAt or endAt");
  }
  return {
    condition: conditions.join(" AND "),
    args
  };
}
function buildDateRangeFilter(dateRange, columnName = "createdAt") {
  if (!dateRange?.start && !dateRange?.end) {
    return {};
  }
  const filter = {};
  if (dateRange.start) {
    filter.startAt = new Date(dateRange.start).toISOString();
  }
  if (dateRange.end) {
    filter.endAt = new Date(dateRange.end).toISOString();
  }
  return { [columnName]: filter };
}
function transformFromSqlRow({
  tableName,
  sqlRow
}) {
  const result = {};
  const jsonColumns = new Set(
    Object.keys(TABLE_SCHEMAS[tableName]).filter((key) => TABLE_SCHEMAS[tableName][key].type === "jsonb").map((key) => key)
  );
  const dateColumns = new Set(
    Object.keys(TABLE_SCHEMAS[tableName]).filter((key) => TABLE_SCHEMAS[tableName][key].type === "timestamp").map((key) => key)
  );
  for (const [key, value] of Object.entries(sqlRow)) {
    if (value === null || value === void 0) {
      result[key] = value;
      continue;
    }
    if (dateColumns.has(key) && typeof value === "string") {
      result[key] = new Date(value);
      continue;
    }
    if (jsonColumns.has(key) && typeof value === "string") {
      result[key] = safelyParseJSON(value);
      continue;
    }
    result[key] = value;
  }
  return result;
}

// src/storage/domains/observability/index.ts
var ObservabilityLibSQL = class extends ObservabilityStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async createAISpan(span) {
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const record = {
        ...span,
        createdAt: now,
        updatedAt: now
      };
      return this.operations.insert({ tableName: TABLE_AI_SPANS, record });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_CREATE_AI_SPAN_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER,
          details: {
            spanId: span.spanId,
            traceId: span.traceId,
            spanType: span.spanType,
            spanName: span.name
          }
        },
        error
      );
    }
  }
  async getAITrace(traceId) {
    try {
      const spans = await this.operations.loadMany({
        tableName: TABLE_AI_SPANS,
        whereClause: { sql: " WHERE traceId = ?", args: [traceId] },
        orderBy: "startedAt DESC"
      });
      if (!spans || spans.length === 0) {
        return null;
      }
      return {
        traceId,
        spans: spans.map((span) => transformFromSqlRow({ tableName: TABLE_AI_SPANS, sqlRow: span }))
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_AI_TRACE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER,
          details: {
            traceId
          }
        },
        error
      );
    }
  }
  async updateAISpan({
    spanId,
    traceId,
    updates
  }) {
    try {
      await this.operations.update({
        tableName: TABLE_AI_SPANS,
        keys: { spanId, traceId },
        data: { ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_UPDATE_AI_SPAN_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER,
          details: {
            spanId,
            traceId
          }
        },
        error
      );
    }
  }
  async getAITracesPaginated({
    filters,
    pagination
  }) {
    const page = pagination?.page ?? 0;
    const perPage = pagination?.perPage ?? 10;
    const { entityId, entityType, ...actualFilters } = filters || {};
    const filtersWithDateRange = {
      ...actualFilters,
      ...buildDateRangeFilter(pagination?.dateRange, "startedAt"),
      parentSpanId: null
    };
    const whereClause = prepareWhereClause(filtersWithDateRange, AI_SPAN_SCHEMA);
    let actualWhereClause = whereClause.sql || "";
    if (entityId && entityType) {
      const statement = `name = ?`;
      let name = "";
      if (entityType === "workflow") {
        name = `workflow run: '${entityId}'`;
      } else if (entityType === "agent") {
        name = `agent run: '${entityId}'`;
      } else {
        const error = new MastraError({
          id: "LIBSQL_STORE_GET_AI_TRACES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER,
          details: {
            entityType
          },
          text: `Cannot filter by entity type: ${entityType}`
        });
        this.logger?.trackException(error);
        throw error;
      }
      whereClause.args.push(name);
      if (actualWhereClause) {
        actualWhereClause += ` AND ${statement}`;
      } else {
        actualWhereClause += `WHERE ${statement}`;
      }
    }
    const orderBy = "startedAt DESC";
    let count = 0;
    try {
      count = await this.operations.loadTotalCount({
        tableName: TABLE_AI_SPANS,
        whereClause: { sql: actualWhereClause, args: whereClause.args }
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_AI_TRACES_PAGINATED_COUNT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
    if (count === 0) {
      return {
        pagination: {
          total: 0,
          page,
          perPage,
          hasMore: false
        },
        spans: []
      };
    }
    try {
      const spans = await this.operations.loadMany({
        tableName: TABLE_AI_SPANS,
        whereClause: {
          sql: actualWhereClause,
          args: whereClause.args
        },
        orderBy,
        offset: page * perPage,
        limit: perPage
      });
      return {
        pagination: {
          total: count,
          page,
          perPage,
          hasMore: spans.length === perPage
        },
        spans: spans.map((span) => transformFromSqlRow({ tableName: TABLE_AI_SPANS, sqlRow: span }))
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_AI_TRACES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
  }
  async batchCreateAISpans(args) {
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      return this.operations.batchInsert({
        tableName: TABLE_AI_SPANS,
        records: args.records.map((record) => ({
          ...record,
          createdAt: now,
          updatedAt: now
        }))
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_BATCH_CREATE_AI_SPANS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
  }
  async batchUpdateAISpans(args) {
    try {
      return this.operations.batchUpdate({
        tableName: TABLE_AI_SPANS,
        updates: args.records.map((record) => ({
          keys: { spanId: record.spanId, traceId: record.traceId },
          data: { ...record.updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
        }))
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_BATCH_UPDATE_AI_SPANS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
  }
  async batchDeleteAITraces(args) {
    try {
      const keys = args.traceIds.map((traceId) => ({ traceId }));
      return this.operations.batchDelete({
        tableName: TABLE_AI_SPANS,
        keys
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_BATCH_DELETE_AI_TRACES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
  }
};
var StoreOperationsLibSQL = class extends StoreOperations {
  client;
  /**
   * Maximum number of retries for write operations if an SQLITE_BUSY error occurs.
   * @default 5
   */
  maxRetries;
  /**
   * Initial backoff time in milliseconds for retrying write operations on SQLITE_BUSY.
   * The backoff time will double with each retry (exponential backoff).
   * @default 100
   */
  initialBackoffMs;
  constructor({
    client,
    maxRetries,
    initialBackoffMs
  }) {
    super();
    this.client = client;
    this.maxRetries = maxRetries ?? 5;
    this.initialBackoffMs = initialBackoffMs ?? 100;
  }
  async hasColumn(table, column) {
    const result = await this.client.execute({
      sql: `PRAGMA table_info(${table})`
    });
    return (await result.rows)?.some((row) => row.name === column);
  }
  getCreateTableSQL(tableName, schema) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    const columns = Object.entries(schema).map(([name, col]) => {
      const parsedColumnName = parseSqlIdentifier(name, "column name");
      let type = col.type.toUpperCase();
      if (type === "TEXT") type = "TEXT";
      if (type === "TIMESTAMP") type = "TEXT";
      const nullable = col.nullable ? "" : "NOT NULL";
      const primaryKey = col.primaryKey ? "PRIMARY KEY" : "";
      return `${parsedColumnName} ${type} ${nullable} ${primaryKey}`.trim();
    });
    if (tableName === TABLE_WORKFLOW_SNAPSHOT) {
      const stmnt = `CREATE TABLE IF NOT EXISTS ${parsedTableName} (
                    ${columns.join(",\n")},
                    PRIMARY KEY (workflow_name, run_id)
                )`;
      return stmnt;
    }
    if (tableName === TABLE_AI_SPANS) {
      const stmnt = `CREATE TABLE IF NOT EXISTS ${parsedTableName} (
                    ${columns.join(",\n")},
                    PRIMARY KEY (traceId, spanId)
                )`;
      return stmnt;
    }
    return `CREATE TABLE IF NOT EXISTS ${parsedTableName} (${columns.join(", ")})`;
  }
  async createTable({
    tableName,
    schema
  }) {
    try {
      this.logger.debug(`Creating database table`, { tableName, operation: "schema init" });
      const sql = this.getCreateTableSQL(tableName, schema);
      await this.client.execute(sql);
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_CREATE_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    }
  }
  getSqlType(type) {
    switch (type) {
      case "bigint":
        return "INTEGER";
      // SQLite uses INTEGER for all integer sizes
      case "jsonb":
        return "TEXT";
      // Store JSON as TEXT in SQLite
      default:
        return super.getSqlType(type);
    }
  }
  async doInsert({
    tableName,
    record
  }) {
    await this.client.execute(
      prepareStatement({
        tableName,
        record
      })
    );
  }
  insert(args) {
    const executeWriteOperationWithRetry = createExecuteWriteOperationWithRetry({
      logger: this.logger,
      maxRetries: this.maxRetries,
      initialBackoffMs: this.initialBackoffMs
    });
    return executeWriteOperationWithRetry(() => this.doInsert(args), `insert into table ${args.tableName}`);
  }
  async load({ tableName, keys }) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    const parsedKeys = Object.keys(keys).map((key) => parseSqlIdentifier(key, "column name"));
    const conditions = parsedKeys.map((key) => `${key} = ?`).join(" AND ");
    const values = Object.values(keys);
    const result = await this.client.execute({
      sql: `SELECT * FROM ${parsedTableName} WHERE ${conditions} ORDER BY createdAt DESC LIMIT 1`,
      args: values
    });
    if (!result.rows || result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    const parsed = Object.fromEntries(
      Object.entries(row || {}).map(([k, v]) => {
        try {
          return [k, typeof v === "string" ? v.startsWith("{") || v.startsWith("[") ? JSON.parse(v) : v : v];
        } catch {
          return [k, v];
        }
      })
    );
    return parsed;
  }
  async loadMany({
    tableName,
    whereClause,
    orderBy,
    offset,
    limit,
    args
  }) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    let statement = `SELECT * FROM ${parsedTableName}`;
    if (whereClause?.sql) {
      statement += `${whereClause.sql}`;
    }
    if (orderBy) {
      statement += ` ORDER BY ${orderBy}`;
    }
    if (limit) {
      statement += ` LIMIT ${limit}`;
    }
    if (offset) {
      statement += ` OFFSET ${offset}`;
    }
    const result = await this.client.execute({
      sql: statement,
      args: [...whereClause?.args ?? [], ...args ?? []]
    });
    return result.rows;
  }
  async loadTotalCount({
    tableName,
    whereClause
  }) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    const statement = `SELECT COUNT(*) as count FROM ${parsedTableName} ${whereClause ? `${whereClause.sql}` : ""}`;
    const result = await this.client.execute({
      sql: statement,
      args: whereClause?.args ?? []
    });
    if (!result.rows || result.rows.length === 0) {
      return 0;
    }
    return result.rows[0]?.count ?? 0;
  }
  update(args) {
    const executeWriteOperationWithRetry = createExecuteWriteOperationWithRetry({
      logger: this.logger,
      maxRetries: this.maxRetries,
      initialBackoffMs: this.initialBackoffMs
    });
    return executeWriteOperationWithRetry(() => this.executeUpdate(args), `update table ${args.tableName}`);
  }
  async executeUpdate({
    tableName,
    keys,
    data
  }) {
    await this.client.execute(prepareUpdateStatement({ tableName, updates: data, keys }));
  }
  async doBatchInsert({
    tableName,
    records
  }) {
    if (records.length === 0) return;
    const batchStatements = records.map((r) => prepareStatement({ tableName, record: r }));
    await this.client.batch(batchStatements, "write");
  }
  batchInsert(args) {
    const executeWriteOperationWithRetry = createExecuteWriteOperationWithRetry({
      logger: this.logger,
      maxRetries: this.maxRetries,
      initialBackoffMs: this.initialBackoffMs
    });
    return executeWriteOperationWithRetry(
      () => this.doBatchInsert(args),
      `batch insert into table ${args.tableName}`
    ).catch((error) => {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_BATCH_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName: args.tableName
          }
        },
        error
      );
    });
  }
  /**
   * Public batch update method with retry logic
   */
  batchUpdate(args) {
    const executeWriteOperationWithRetry = createExecuteWriteOperationWithRetry({
      logger: this.logger,
      maxRetries: this.maxRetries,
      initialBackoffMs: this.initialBackoffMs
    });
    return executeWriteOperationWithRetry(
      () => this.executeBatchUpdate(args),
      `batch update in table ${args.tableName}`
    ).catch((error) => {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_BATCH_UPDATE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName: args.tableName
          }
        },
        error
      );
    });
  }
  /**
   * Updates multiple records in batch. Each record can be updated based on single or composite keys.
   */
  async executeBatchUpdate({
    tableName,
    updates
  }) {
    if (updates.length === 0) return;
    const batchStatements = updates.map(
      ({ keys, data }) => prepareUpdateStatement({
        tableName,
        updates: data,
        keys
      })
    );
    await this.client.batch(batchStatements, "write");
  }
  /**
   * Public batch delete method with retry logic
   */
  batchDelete({ tableName, keys }) {
    const executeWriteOperationWithRetry = createExecuteWriteOperationWithRetry({
      logger: this.logger,
      maxRetries: this.maxRetries,
      initialBackoffMs: this.initialBackoffMs
    });
    return executeWriteOperationWithRetry(
      () => this.executeBatchDelete({ tableName, keys }),
      `batch delete from table ${tableName}`
    ).catch((error) => {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_BATCH_DELETE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    });
  }
  /**
   * Deletes multiple records in batch. Each record can be deleted based on single or composite keys.
   */
  async executeBatchDelete({
    tableName,
    keys
  }) {
    if (keys.length === 0) return;
    const batchStatements = keys.map(
      (keyObj) => prepareDeleteStatement({
        tableName,
        keys: keyObj
      })
    );
    await this.client.batch(batchStatements, "write");
  }
  /**
   * Alters table schema to add columns if they don't exist
   * @param tableName Name of the table
   * @param schema Schema of the table
   * @param ifNotExists Array of column names to add if they don't exist
   */
  async alterTable({
    tableName,
    schema,
    ifNotExists
  }) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    try {
      const pragmaQuery = `PRAGMA table_info(${parsedTableName})`;
      const result = await this.client.execute(pragmaQuery);
      const existingColumnNames = new Set(result.rows.map((row) => row.name.toLowerCase()));
      for (const columnName of ifNotExists) {
        if (!existingColumnNames.has(columnName.toLowerCase()) && schema[columnName]) {
          const columnDef = schema[columnName];
          const sqlType = this.getSqlType(columnDef.type);
          const nullable = columnDef.nullable === false ? "NOT NULL" : "";
          const defaultValue = columnDef.nullable === false ? this.getDefaultValue(columnDef.type) : "";
          const alterSql = `ALTER TABLE ${parsedTableName} ADD COLUMN "${columnName}" ${sqlType} ${nullable} ${defaultValue}`.trim();
          await this.client.execute(alterSql);
          this.logger?.debug?.(`Added column ${columnName} to table ${parsedTableName}`);
        }
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_ALTER_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    }
  }
  async clearTable({ tableName }) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    try {
      await this.client.execute(`DELETE FROM ${parsedTableName}`);
    } catch (e) {
      const mastraError = new MastraError(
        {
          id: "LIBSQL_STORE_CLEAR_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        e
      );
      this.logger?.trackException?.(mastraError);
      this.logger?.error?.(mastraError.toString());
    }
  }
  async dropTable({ tableName }) {
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    try {
      await this.client.execute(`DROP TABLE IF EXISTS ${parsedTableName}`);
    } catch (e) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_DROP_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        e
      );
    }
  }
};
var ScoresLibSQL = class extends ScoresStorage {
  operations;
  client;
  constructor({ client, operations }) {
    super();
    this.operations = operations;
    this.client = client;
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    try {
      const result = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_SCORERS} WHERE runId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
        args: [runId, pagination.perPage + 1, pagination.page * pagination.perPage]
      });
      return {
        scores: result.rows?.slice(0, pagination.perPage).map((row) => this.transformScoreRow(row)) ?? [],
        pagination: {
          total: result.rows?.length ?? 0,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: result.rows?.length > pagination.perPage
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_SCORES_BY_RUN_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getScoresByScorerId({
    scorerId,
    entityId,
    entityType,
    source,
    pagination
  }) {
    try {
      const conditions = [];
      const queryParams = [];
      if (scorerId) {
        conditions.push(`scorerId = ?`);
        queryParams.push(scorerId);
      }
      if (entityId) {
        conditions.push(`entityId = ?`);
        queryParams.push(entityId);
      }
      if (entityType) {
        conditions.push(`entityType = ?`);
        queryParams.push(entityType);
      }
      if (source) {
        conditions.push(`source = ?`);
        queryParams.push(source);
      }
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const result = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_SCORERS} ${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
        args: [...queryParams, pagination.perPage + 1, pagination.page * pagination.perPage]
      });
      return {
        scores: result.rows?.slice(0, pagination.perPage).map((row) => this.transformScoreRow(row)) ?? [],
        pagination: {
          total: result.rows?.length ?? 0,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: result.rows?.length > pagination.perPage
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_SCORES_BY_SCORER_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  transformScoreRow(row) {
    const scorerValue = safelyParseJSON(row.scorer);
    const inputValue = safelyParseJSON(row.input ?? "{}");
    const outputValue = safelyParseJSON(row.output ?? "{}");
    const additionalLLMContextValue = row.additionalLLMContext ? safelyParseJSON(row.additionalLLMContext) : null;
    const runtimeContextValue = row.runtimeContext ? safelyParseJSON(row.runtimeContext) : null;
    const metadataValue = row.metadata ? safelyParseJSON(row.metadata) : null;
    const entityValue = row.entity ? safelyParseJSON(row.entity) : null;
    const preprocessStepResultValue = row.preprocessStepResult ? safelyParseJSON(row.preprocessStepResult) : null;
    const analyzeStepResultValue = row.analyzeStepResult ? safelyParseJSON(row.analyzeStepResult) : null;
    return {
      id: row.id,
      traceId: row.traceId,
      spanId: row.spanId,
      runId: row.runId,
      scorer: scorerValue,
      score: row.score,
      reason: row.reason,
      preprocessStepResult: preprocessStepResultValue,
      analyzeStepResult: analyzeStepResultValue,
      analyzePrompt: row.analyzePrompt,
      preprocessPrompt: row.preprocessPrompt,
      generateScorePrompt: row.generateScorePrompt,
      generateReasonPrompt: row.generateReasonPrompt,
      metadata: metadataValue,
      input: inputValue,
      output: outputValue,
      additionalContext: additionalLLMContextValue,
      runtimeContext: runtimeContextValue,
      entityType: row.entityType,
      entity: entityValue,
      entityId: row.entityId,
      scorerId: row.scorerId,
      source: row.source,
      resourceId: row.resourceId,
      threadId: row.threadId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
  async getScoreById({ id }) {
    const result = await this.client.execute({
      sql: `SELECT * FROM ${TABLE_SCORERS} WHERE id = ?`,
      args: [id]
    });
    return result.rows?.[0] ? this.transformScoreRow(result.rows[0]) : null;
  }
  async saveScore(score) {
    let parsedScore;
    try {
      parsedScore = saveScorePayloadSchema.parse(score);
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_SAVE_SCORE_FAILED_INVALID_SCORE_PAYLOAD",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER,
          details: {
            scorer: score.scorer.name,
            entityId: score.entityId,
            entityType: score.entityType,
            traceId: score.traceId || "",
            spanId: score.spanId || ""
          }
        },
        error
      );
    }
    try {
      const id = crypto.randomUUID();
      await this.operations.insert({
        tableName: TABLE_SCORERS,
        record: {
          id,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          ...parsedScore
        }
      });
      const scoreFromDb = await this.getScoreById({ id });
      return { score: scoreFromDb };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_SAVE_SCORE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination
  }) {
    try {
      const result = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_SCORERS} WHERE entityId = ? AND entityType = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
        args: [entityId, entityType, pagination.perPage + 1, pagination.page * pagination.perPage]
      });
      return {
        scores: result.rows?.slice(0, pagination.perPage).map((row) => this.transformScoreRow(row)) ?? [],
        pagination: {
          total: result.rows?.length ?? 0,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: result.rows?.length > pagination.perPage
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_SCORES_BY_ENTITY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getScoresBySpan({
    traceId,
    spanId,
    pagination
  }) {
    try {
      const countSQLResult = await this.client.execute({
        sql: `SELECT COUNT(*) as count FROM ${TABLE_SCORERS} WHERE traceId = ? AND spanId = ?`,
        args: [traceId, spanId]
      });
      const total = Number(countSQLResult.rows?.[0]?.count ?? 0);
      const result = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_SCORERS} WHERE traceId = ? AND spanId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
        args: [traceId, spanId, pagination.perPage + 1, pagination.page * pagination.perPage]
      });
      const hasMore = result.rows?.length > pagination.perPage;
      const scores = result.rows?.slice(0, pagination.perPage).map((row) => this.transformScoreRow(row)) ?? [];
      return {
        scores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_SCORES_BY_SPAN_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
};
var TracesLibSQL = class extends TracesStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  async getTraces(args) {
    if (args.fromDate || args.toDate) {
      args.dateRange = {
        start: args.fromDate,
        end: args.toDate
      };
    }
    try {
      const result = await this.getTracesPaginated(args);
      return result.traces;
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_TRACES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getTracesPaginated(args) {
    const { name, scope, page = 0, perPage = 100, attributes, filters, dateRange } = args;
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const currentOffset = page * perPage;
    const queryArgs = [];
    const conditions = [];
    if (name) {
      conditions.push("name LIKE ?");
      queryArgs.push(`${name}%`);
    }
    if (scope) {
      conditions.push("scope = ?");
      queryArgs.push(scope);
    }
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        conditions.push(`json_extract(attributes, '$.${key}') = ?`);
        queryArgs.push(value);
      });
    }
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        conditions.push(`${parseSqlIdentifier(key, "filter key")} = ?`);
        queryArgs.push(value);
      });
    }
    if (fromDate) {
      conditions.push("createdAt >= ?");
      queryArgs.push(fromDate.toISOString());
    }
    if (toDate) {
      conditions.push("createdAt <= ?");
      queryArgs.push(toDate.toISOString());
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    try {
      const countResult = await this.client.execute({
        sql: `SELECT COUNT(*) as count FROM ${TABLE_TRACES} ${whereClause}`,
        args: queryArgs
      });
      const total = Number(countResult.rows?.[0]?.count ?? 0);
      if (total === 0) {
        return {
          traces: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const dataResult = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_TRACES} ${whereClause} ORDER BY "startTime" DESC LIMIT ? OFFSET ?`,
        args: [...queryArgs, perPage, currentOffset]
      });
      const traces = dataResult.rows?.map(
        (row) => ({
          id: row.id,
          parentSpanId: row.parentSpanId,
          traceId: row.traceId,
          name: row.name,
          scope: row.scope,
          kind: row.kind,
          status: safelyParseJSON(row.status),
          events: safelyParseJSON(row.events),
          links: safelyParseJSON(row.links),
          attributes: safelyParseJSON(row.attributes),
          startTime: row.startTime,
          endTime: row.endTime,
          other: safelyParseJSON(row.other),
          createdAt: row.createdAt
        })
      ) ?? [];
      return {
        traces,
        total,
        page,
        perPage,
        hasMore: currentOffset + traces.length < total
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_TRACES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async batchTraceInsert({ records }) {
    this.logger.debug("Batch inserting traces", { count: records.length });
    await this.operations.batchInsert({
      tableName: TABLE_TRACES,
      records
    });
  }
};
function parseWorkflowRun(row) {
  let parsedSnapshot = row.snapshot;
  if (typeof parsedSnapshot === "string") {
    try {
      parsedSnapshot = JSON.parse(row.snapshot);
    } catch (e) {
      console.warn(`Failed to parse snapshot for workflow ${row.workflow_name}: ${e}`);
    }
  }
  return {
    workflowName: row.workflow_name,
    runId: row.run_id,
    snapshot: parsedSnapshot,
    resourceId: row.resourceId,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt)
  };
}
var WorkflowsLibSQL = class extends WorkflowsStorage {
  operations;
  client;
  maxRetries;
  initialBackoffMs;
  constructor({
    operations,
    client,
    maxRetries = 5,
    initialBackoffMs = 500
  }) {
    super();
    this.operations = operations;
    this.client = client;
    this.maxRetries = maxRetries;
    this.initialBackoffMs = initialBackoffMs;
    this.setupPragmaSettings().catch(
      (err) => this.logger.warn("LibSQL Workflows: Failed to setup PRAGMA settings.", err)
    );
  }
  async setupPragmaSettings() {
    try {
      await this.client.execute("PRAGMA busy_timeout = 10000;");
      this.logger.debug("LibSQL Workflows: PRAGMA busy_timeout=10000 set.");
      try {
        await this.client.execute("PRAGMA journal_mode = WAL;");
        this.logger.debug("LibSQL Workflows: PRAGMA journal_mode=WAL set.");
      } catch {
        this.logger.debug("LibSQL Workflows: WAL mode not supported, using default journal mode.");
      }
      try {
        await this.client.execute("PRAGMA synchronous = NORMAL;");
        this.logger.debug("LibSQL Workflows: PRAGMA synchronous=NORMAL set.");
      } catch {
        this.logger.debug("LibSQL Workflows: Failed to set synchronous mode.");
      }
    } catch (err) {
      this.logger.warn("LibSQL Workflows: Failed to set PRAGMA settings.", err);
    }
  }
  async executeWithRetry(operation) {
    let attempts = 0;
    let backoff = this.initialBackoffMs;
    while (attempts < this.maxRetries) {
      try {
        return await operation();
      } catch (error) {
        this.logger.debug("LibSQL Workflows: Error caught in retry loop", {
          errorType: error.constructor.name,
          errorCode: error.code,
          errorMessage: error.message,
          attempts,
          maxRetries: this.maxRetries
        });
        const isLockError = error.code === "SQLITE_BUSY" || error.code === "SQLITE_LOCKED" || error.message?.toLowerCase().includes("database is locked") || error.message?.toLowerCase().includes("database table is locked") || error.message?.toLowerCase().includes("table is locked") || error.constructor.name === "SqliteError" && error.message?.toLowerCase().includes("locked");
        if (isLockError) {
          attempts++;
          if (attempts >= this.maxRetries) {
            this.logger.error(
              `LibSQL Workflows: Operation failed after ${this.maxRetries} attempts due to database lock: ${error.message}`,
              { error, attempts, maxRetries: this.maxRetries }
            );
            throw error;
          }
          this.logger.warn(
            `LibSQL Workflows: Attempt ${attempts} failed due to database lock. Retrying in ${backoff}ms...`,
            { errorMessage: error.message, attempts, backoff, maxRetries: this.maxRetries }
          );
          await new Promise((resolve) => setTimeout(resolve, backoff));
          backoff *= 2;
        } else {
          this.logger.error("LibSQL Workflows: Non-lock error occurred, not retrying", { error });
          throw error;
        }
      }
    }
    throw new Error("LibSQL Workflows: Max retries reached, but no error was re-thrown from the loop.");
  }
  async updateWorkflowResults({
    workflowName,
    runId,
    stepId,
    result,
    runtimeContext
  }) {
    return this.executeWithRetry(async () => {
      const tx = await this.client.transaction("write");
      try {
        const existingSnapshotResult = await tx.execute({
          sql: `SELECT snapshot FROM ${TABLE_WORKFLOW_SNAPSHOT} WHERE workflow_name = ? AND run_id = ?`,
          args: [workflowName, runId]
        });
        let snapshot;
        if (!existingSnapshotResult.rows?.[0]) {
          snapshot = {
            context: {},
            activePaths: [],
            timestamp: Date.now(),
            suspendedPaths: {},
            resumeLabels: {},
            serializedStepGraph: [],
            value: {},
            waitingPaths: {},
            status: "pending",
            runId,
            runtimeContext: {}
          };
        } else {
          const existingSnapshot = existingSnapshotResult.rows[0].snapshot;
          snapshot = typeof existingSnapshot === "string" ? JSON.parse(existingSnapshot) : existingSnapshot;
        }
        snapshot.context[stepId] = result;
        snapshot.runtimeContext = { ...snapshot.runtimeContext, ...runtimeContext };
        await tx.execute({
          sql: `UPDATE ${TABLE_WORKFLOW_SNAPSHOT} SET snapshot = ? WHERE workflow_name = ? AND run_id = ?`,
          args: [JSON.stringify(snapshot), workflowName, runId]
        });
        await tx.commit();
        return snapshot.context;
      } catch (error) {
        if (!tx.closed) {
          await tx.rollback();
        }
        throw error;
      }
    });
  }
  async updateWorkflowState({
    workflowName,
    runId,
    opts
  }) {
    return this.executeWithRetry(async () => {
      const tx = await this.client.transaction("write");
      try {
        const existingSnapshotResult = await tx.execute({
          sql: `SELECT snapshot FROM ${TABLE_WORKFLOW_SNAPSHOT} WHERE workflow_name = ? AND run_id = ?`,
          args: [workflowName, runId]
        });
        if (!existingSnapshotResult.rows?.[0]) {
          await tx.rollback();
          return void 0;
        }
        const existingSnapshot = existingSnapshotResult.rows[0].snapshot;
        const snapshot = typeof existingSnapshot === "string" ? JSON.parse(existingSnapshot) : existingSnapshot;
        if (!snapshot || !snapshot?.context) {
          await tx.rollback();
          throw new Error(`Snapshot not found for runId ${runId}`);
        }
        const updatedSnapshot = { ...snapshot, ...opts };
        await tx.execute({
          sql: `UPDATE ${TABLE_WORKFLOW_SNAPSHOT} SET snapshot = ? WHERE workflow_name = ? AND run_id = ?`,
          args: [JSON.stringify(updatedSnapshot), workflowName, runId]
        });
        await tx.commit();
        return updatedSnapshot;
      } catch (error) {
        if (!tx.closed) {
          await tx.rollback();
        }
        throw error;
      }
    });
  }
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    resourceId,
    snapshot
  }) {
    const data = {
      workflow_name: workflowName,
      run_id: runId,
      resourceId,
      snapshot,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.logger.debug("Persisting workflow snapshot", { workflowName, runId, data });
    await this.operations.insert({
      tableName: TABLE_WORKFLOW_SNAPSHOT,
      record: data
    });
  }
  async loadWorkflowSnapshot({
    workflowName,
    runId
  }) {
    this.logger.debug("Loading workflow snapshot", { workflowName, runId });
    const d = await this.operations.load({
      tableName: TABLE_WORKFLOW_SNAPSHOT,
      keys: { workflow_name: workflowName, run_id: runId }
    });
    return d ? d.snapshot : null;
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    const conditions = [];
    const args = [];
    if (runId) {
      conditions.push("run_id = ?");
      args.push(runId);
    }
    if (workflowName) {
      conditions.push("workflow_name = ?");
      args.push(workflowName);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    try {
      const result = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_WORKFLOW_SNAPSHOT} ${whereClause} ORDER BY createdAt DESC LIMIT 1`,
        args
      });
      if (!result.rows?.[0]) {
        return null;
      }
      return parseWorkflowRun(result.rows[0]);
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_WORKFLOW_RUN_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getWorkflowRuns({
    workflowName,
    fromDate,
    toDate,
    limit,
    offset,
    resourceId
  } = {}) {
    try {
      const conditions = [];
      const args = [];
      if (workflowName) {
        conditions.push("workflow_name = ?");
        args.push(workflowName);
      }
      if (fromDate) {
        conditions.push("createdAt >= ?");
        args.push(fromDate.toISOString());
      }
      if (toDate) {
        conditions.push("createdAt <= ?");
        args.push(toDate.toISOString());
      }
      if (resourceId) {
        const hasResourceId = await this.operations.hasColumn(TABLE_WORKFLOW_SNAPSHOT, "resourceId");
        if (hasResourceId) {
          conditions.push("resourceId = ?");
          args.push(resourceId);
        } else {
          console.warn(`[${TABLE_WORKFLOW_SNAPSHOT}] resourceId column not found. Skipping resourceId filter.`);
        }
      }
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      let total = 0;
      if (limit !== void 0 && offset !== void 0) {
        const countResult = await this.client.execute({
          sql: `SELECT COUNT(*) as count FROM ${TABLE_WORKFLOW_SNAPSHOT} ${whereClause}`,
          args
        });
        total = Number(countResult.rows?.[0]?.count ?? 0);
      }
      const result = await this.client.execute({
        sql: `SELECT * FROM ${TABLE_WORKFLOW_SNAPSHOT} ${whereClause} ORDER BY createdAt DESC${limit !== void 0 && offset !== void 0 ? ` LIMIT ? OFFSET ?` : ""}`,
        args: limit !== void 0 && offset !== void 0 ? [...args, limit, offset] : args
      });
      const runs = (result.rows || []).map((row) => parseWorkflowRun(row));
      return { runs, total: total || runs.length };
    } catch (error) {
      throw new MastraError(
        {
          id: "LIBSQL_STORE_GET_WORKFLOW_RUNS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
};

// src/storage/index.ts
var LibSQLStore = class extends MastraStorage {
  client;
  maxRetries;
  initialBackoffMs;
  stores;
  constructor(config) {
    super({ name: `LibSQLStore` });
    this.maxRetries = config.maxRetries ?? 5;
    this.initialBackoffMs = config.initialBackoffMs ?? 100;
    if ("url" in config) {
      if (config.url.endsWith(":memory:")) {
        this.shouldCacheInit = false;
      }
      this.client = createClient({
        url: config.url,
        ...config.authToken ? { authToken: config.authToken } : {}
      });
      if (config.url.startsWith("file:") || config.url.includes(":memory:")) {
        this.client.execute("PRAGMA journal_mode=WAL;").then(() => this.logger.debug("LibSQLStore: PRAGMA journal_mode=WAL set.")).catch((err) => this.logger.warn("LibSQLStore: Failed to set PRAGMA journal_mode=WAL.", err));
        this.client.execute("PRAGMA busy_timeout = 5000;").then(() => this.logger.debug("LibSQLStore: PRAGMA busy_timeout=5000 set.")).catch((err) => this.logger.warn("LibSQLStore: Failed to set PRAGMA busy_timeout.", err));
      }
    } else {
      this.client = config.client;
    }
    const operations = new StoreOperationsLibSQL({
      client: this.client,
      maxRetries: this.maxRetries,
      initialBackoffMs: this.initialBackoffMs
    });
    const scores = new ScoresLibSQL({ client: this.client, operations });
    const traces = new TracesLibSQL({ client: this.client, operations });
    const workflows = new WorkflowsLibSQL({ client: this.client, operations });
    const memory = new MemoryLibSQL({ client: this.client, operations });
    const legacyEvals = new LegacyEvalsLibSQL({ client: this.client });
    const observability = new ObservabilityLibSQL({ operations });
    this.stores = {
      operations,
      scores,
      traces,
      workflows,
      memory,
      legacyEvals,
      observability
    };
  }
  get supports() {
    return {
      selectByIncludeResourceScope: true,
      resourceWorkingMemory: true,
      hasColumn: true,
      createTable: true,
      deleteMessages: true,
      aiTracing: true,
      getScoresBySpan: true
    };
  }
  async createTable({
    tableName,
    schema
  }) {
    await this.stores.operations.createTable({ tableName, schema });
  }
  /**
   * Alters table schema to add columns if they don't exist
   * @param tableName Name of the table
   * @param schema Schema of the table
   * @param ifNotExists Array of column names to add if they don't exist
   */
  async alterTable({
    tableName,
    schema,
    ifNotExists
  }) {
    await this.stores.operations.alterTable({ tableName, schema, ifNotExists });
  }
  async clearTable({ tableName }) {
    await this.stores.operations.clearTable({ tableName });
  }
  async dropTable({ tableName }) {
    await this.stores.operations.dropTable({ tableName });
  }
  insert(args) {
    return this.stores.operations.insert(args);
  }
  batchInsert(args) {
    return this.stores.operations.batchInsert(args);
  }
  async load({ tableName, keys }) {
    return this.stores.operations.load({ tableName, keys });
  }
  async getThreadById({ threadId }) {
    return this.stores.memory.getThreadById({ threadId });
  }
  /**
   * @deprecated use getThreadsByResourceIdPaginated instead for paginated results.
   */
  async getThreadsByResourceId(args) {
    return this.stores.memory.getThreadsByResourceId(args);
  }
  async getThreadsByResourceIdPaginated(args) {
    return this.stores.memory.getThreadsByResourceIdPaginated(args);
  }
  async saveThread({ thread }) {
    return this.stores.memory.saveThread({ thread });
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    return this.stores.memory.updateThread({ id, title, metadata });
  }
  async deleteThread({ threadId }) {
    return this.stores.memory.deleteThread({ threadId });
  }
  async getMessages({
    threadId,
    selectBy,
    format
  }) {
    return this.stores.memory.getMessages({ threadId, selectBy, format });
  }
  async getMessagesById({
    messageIds,
    format
  }) {
    return this.stores.memory.getMessagesById({ messageIds, format });
  }
  async getMessagesPaginated(args) {
    return this.stores.memory.getMessagesPaginated(args);
  }
  async saveMessages(args) {
    return this.stores.memory.saveMessages(args);
  }
  async updateMessages({
    messages
  }) {
    return this.stores.memory.updateMessages({ messages });
  }
  async deleteMessages(messageIds) {
    return this.stores.memory.deleteMessages(messageIds);
  }
  /** @deprecated use getEvals instead */
  async getEvalsByAgentName(agentName, type) {
    return this.stores.legacyEvals.getEvalsByAgentName(agentName, type);
  }
  async getEvals(options = {}) {
    return this.stores.legacyEvals.getEvals(options);
  }
  async getScoreById({ id }) {
    return this.stores.scores.getScoreById({ id });
  }
  async saveScore(score) {
    return this.stores.scores.saveScore(score);
  }
  async getScoresByScorerId({
    scorerId,
    entityId,
    entityType,
    source,
    pagination
  }) {
    return this.stores.scores.getScoresByScorerId({ scorerId, entityId, entityType, source, pagination });
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    return this.stores.scores.getScoresByRunId({ runId, pagination });
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination
  }) {
    return this.stores.scores.getScoresByEntityId({ entityId, entityType, pagination });
  }
  /**
   * TRACES
   */
  /**
   * @deprecated use getTracesPaginated instead.
   */
  async getTraces(args) {
    return this.stores.traces.getTraces(args);
  }
  async getTracesPaginated(args) {
    return this.stores.traces.getTracesPaginated(args);
  }
  async batchTraceInsert(args) {
    return this.stores.traces.batchTraceInsert(args);
  }
  /**
   * WORKFLOWS
   */
  async updateWorkflowResults({
    workflowName,
    runId,
    stepId,
    result,
    runtimeContext
  }) {
    return this.stores.workflows.updateWorkflowResults({ workflowName, runId, stepId, result, runtimeContext });
  }
  async updateWorkflowState({
    workflowName,
    runId,
    opts
  }) {
    return this.stores.workflows.updateWorkflowState({ workflowName, runId, opts });
  }
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    resourceId,
    snapshot
  }) {
    return this.stores.workflows.persistWorkflowSnapshot({ workflowName, runId, resourceId, snapshot });
  }
  async loadWorkflowSnapshot({
    workflowName,
    runId
  }) {
    return this.stores.workflows.loadWorkflowSnapshot({ workflowName, runId });
  }
  async getWorkflowRuns({
    workflowName,
    fromDate,
    toDate,
    limit,
    offset,
    resourceId
  } = {}) {
    return this.stores.workflows.getWorkflowRuns({ workflowName, fromDate, toDate, limit, offset, resourceId });
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    return this.stores.workflows.getWorkflowRunById({ runId, workflowName });
  }
  async getResourceById({ resourceId }) {
    return this.stores.memory.getResourceById({ resourceId });
  }
  async saveResource({ resource }) {
    return this.stores.memory.saveResource({ resource });
  }
  async updateResource({
    resourceId,
    workingMemory,
    metadata
  }) {
    return this.stores.memory.updateResource({ resourceId, workingMemory, metadata });
  }
  async createAISpan(span) {
    return this.stores.observability.createAISpan(span);
  }
  async updateAISpan(params) {
    return this.stores.observability.updateAISpan(params);
  }
  async getAITrace(traceId) {
    return this.stores.observability.getAITrace(traceId);
  }
  async getAITracesPaginated(args) {
    return this.stores.observability.getAITracesPaginated(args);
  }
  async getScoresBySpan({
    traceId,
    spanId,
    pagination
  }) {
    return this.stores.scores.getScoresBySpan({ traceId, spanId, pagination });
  }
  async batchCreateAISpans(args) {
    return this.stores.observability.batchCreateAISpans(args);
  }
  async batchUpdateAISpans(args) {
    return this.stores.observability.batchUpdateAISpans(args);
  }
};

export { LibSQLStore };
