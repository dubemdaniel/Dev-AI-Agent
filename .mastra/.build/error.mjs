// src/error/utils.ts
function safeParseErrorObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return String(obj);
  }
  try {
    const stringified = JSON.stringify(obj);
    if (stringified === "{}") {
      return String(obj);
    }
    return stringified;
  } catch {
    return String(obj);
  }
}
function getErrorFromUnknown(unknown, options = {}) {
  const defaultOptions = {
    fallbackMessage: "Unknown error",
    maxDepth: 5,
    supportSerialization: true,
    includeStack: true
  };
  const mergedOptions = options ? { ...defaultOptions, ...options } : defaultOptions;
  const { fallbackMessage, maxDepth, supportSerialization, includeStack } = mergedOptions;
  if (unknown && unknown instanceof Error) {
    if (includeStack === false) {
      unknown.stack = void 0;
    }
    if (supportSerialization) {
      addErrorToJSON(unknown);
    }
    return unknown;
  }
  let error;
  if (unknown && typeof unknown === "object") {
    const errorMessage = unknown && "message" in unknown && typeof unknown.message === "string" ? unknown.message : safeParseErrorObject(unknown);
    const errorCause = "cause" in unknown && unknown.cause !== void 0 ? unknown.cause instanceof Error ? unknown.cause : maxDepth > 0 ? getErrorFromUnknown(unknown.cause, { ...mergedOptions, maxDepth: maxDepth - 1 }) : void 0 : void 0;
    error = new Error(errorMessage, errorCause ? { cause: errorCause } : void 0);
    const { stack: _, ...propsWithoutStack } = unknown;
    Object.assign(error, propsWithoutStack);
    if (includeStack) {
      error.stack = "stack" in unknown && typeof unknown.stack === "string" ? unknown.stack : void 0;
    }
  } else if (unknown && typeof unknown === "string") {
    error = new Error(unknown);
    error.stack = void 0;
  } else {
    error = new Error(fallbackMessage);
    error.stack = void 0;
  }
  if (supportSerialization) {
    addErrorToJSON(error);
  }
  return error;
}
function addErrorToJSON(error) {
  if (error.toJSON) {
    return;
  }
  Object.defineProperty(error, "toJSON", {
    value: function() {
      const json = {
        message: this.message,
        name: this.name
      };
      if (this.stack !== void 0) {
        json.stack = this.stack;
      }
      if (this.cause !== void 0) {
        json.cause = this.cause;
      }
      const errorAsAny = this;
      for (const key in errorAsAny) {
        if (errorAsAny.hasOwnProperty(key) && !(key in json) && key !== "toJSON") {
          json[key] = errorAsAny[key];
        }
      }
      return json;
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
}

// src/error/index.ts
var ErrorDomain = /* @__PURE__ */ ((ErrorDomain2) => {
  ErrorDomain2["TOOL"] = "TOOL";
  ErrorDomain2["AGENT"] = "AGENT";
  ErrorDomain2["MCP"] = "MCP";
  ErrorDomain2["AGENT_NETWORK"] = "AGENT_NETWORK";
  ErrorDomain2["MASTRA_SERVER"] = "MASTRA_SERVER";
  ErrorDomain2["MASTRA_TELEMETRY"] = "MASTRA_TELEMETRY";
  ErrorDomain2["MASTRA_OBSERVABILITY"] = "MASTRA_OBSERVABILITY";
  ErrorDomain2["MASTRA_WORKFLOW"] = "MASTRA_WORKFLOW";
  ErrorDomain2["MASTRA_VOICE"] = "MASTRA_VOICE";
  ErrorDomain2["MASTRA_VECTOR"] = "MASTRA_VECTOR";
  ErrorDomain2["LLM"] = "LLM";
  ErrorDomain2["EVAL"] = "EVAL";
  ErrorDomain2["SCORER"] = "SCORER";
  ErrorDomain2["A2A"] = "A2A";
  ErrorDomain2["MASTRA_INSTANCE"] = "MASTRA_INSTANCE";
  ErrorDomain2["MASTRA"] = "MASTRA";
  ErrorDomain2["DEPLOYER"] = "DEPLOYER";
  ErrorDomain2["STORAGE"] = "STORAGE";
  ErrorDomain2["MODEL_ROUTER"] = "MODEL_ROUTER";
  return ErrorDomain2;
})(ErrorDomain || {});
var ErrorCategory = /* @__PURE__ */ ((ErrorCategory2) => {
  ErrorCategory2["UNKNOWN"] = "UNKNOWN";
  ErrorCategory2["USER"] = "USER";
  ErrorCategory2["SYSTEM"] = "SYSTEM";
  ErrorCategory2["THIRD_PARTY"] = "THIRD_PARTY";
  return ErrorCategory2;
})(ErrorCategory || {});
var MastraBaseError = class extends Error {
  id;
  domain;
  category;
  details = {};
  message;
  constructor(errorDefinition, originalError) {
    let error;
    if (originalError instanceof Error) {
      error = originalError;
    } else if (originalError) {
      const errorMessage = safeParseErrorObject(originalError);
      error = new Error(errorMessage);
    }
    const message = errorDefinition.text ?? error?.message ?? "Unknown error";
    super(message, { cause: error });
    this.id = errorDefinition.id;
    this.domain = errorDefinition.domain;
    this.category = errorDefinition.category;
    this.details = errorDefinition.details ?? {};
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
  }
  /**
   * Returns a structured representation of the error, useful for logging or API responses.
   */
  toJSONDetails() {
    return {
      message: this.message,
      domain: this.domain,
      category: this.category,
      details: this.details
    };
  }
  toJSON() {
    return {
      message: this.message,
      details: this.toJSONDetails(),
      code: this.id
    };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
};
var MastraError = class extends MastraBaseError {
};

export { ErrorCategory as E, MastraError as M, ErrorDomain as a, getErrorFromUnknown as g, safeParseErrorObject as s };
