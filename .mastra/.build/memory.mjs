import { d as customAlphabet, I as InvalidArgumentError$3, S as SecureJSON, J as JSONParseError$1, T as TypeValidationError$1, e as AISDKError$3, h as APICallError$3, i as convertJsonSchemaToZod, j as generateEmptyFromSchema } from './ai-tracing.mjs';
import { ZodFirstPartyTypeKind, z } from './zod.mjs';
import { t as trace, S as SpanStatusCode } from './trace-api.mjs';
import { s as string, u as union, c as _instanceof, d as custom, l as lazy, e as _null, n as number, f as boolean, r as record, g as array, o as object$2, h as literal, i as unknown, m as optional, t as toJSONSchema, b as safeParseAsync, a as any, _ as _enum, j as discriminatedUnion, q as strictObject, k as looseObject, p as base64, v as never, Z as ZodObject } from './coerce.mjs';
import { E as EventSourceParserStream } from './netlify-VJXBII33.mjs';
import { ZodFirstPartyTypeKind as ZodFirstPartyTypeKind$1 } from './zod-v3.mjs';
import { MastraMemory } from './@mastra-core-memory.mjs';
import { M as MessageList } from './chunk-E3PG7G6E.mjs';
import { c as createTool } from './tools.mjs';

var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$3 = Object.getOwnPropertyNames;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __export$5 = (target, all) => {
  for (var name in all)
    __defProp$5(target, name, { get: all[name], enumerable: true });
};
var __copyProps$3 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames$3(from))
      if (!__hasOwnProp$3.call(to, key) && key !== except)
        __defProp$5(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$3(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS$3 = (mod) => __copyProps$3(__defProp$5({}, "__esModule", { value: true }), mod);
var get_context_exports = {};
__export$5(get_context_exports, {
  SYMBOL_FOR_REQ_CONTEXT: () => SYMBOL_FOR_REQ_CONTEXT,
  getContext: () => getContext
});
var getContext_1 = __toCommonJS$3(get_context_exports);
const SYMBOL_FOR_REQ_CONTEXT = Symbol.for("@vercel/request-context");
function getContext() {
  const fromSymbol = globalThis;
  return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
}

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$2 = Object.getOwnPropertyNames;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __export$4 = (target, all) => {
  for (var name in all)
    __defProp$4(target, name, { get: all[name], enumerable: true });
};
var __copyProps$2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames$2(from))
      if (!__hasOwnProp$2.call(to, key) && key !== except)
        __defProp$4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS$2 = (mod) => __copyProps$2(__defProp$4({}, "__esModule", { value: true }), mod);
var token_error_exports = {};
__export$4(token_error_exports, {
  VercelOidcTokenError: () => VercelOidcTokenError
});
var tokenError = __toCommonJS$2(token_error_exports);
class VercelOidcTokenError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "VercelOidcTokenError";
    this.cause = cause;
  }
  toString() {
    if (this.cause) {
      return `${this.name}: ${this.message}: ${this.cause}`;
    }
    return `${this.name}: ${this.message}`;
  }
}

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __export$3 = (target, all) => {
  for (var name in all)
    __defProp$3(target, name, { get: all[name], enumerable: true });
};
var __copyProps$1 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames$1(from))
      if (!__hasOwnProp$1.call(to, key) && key !== except)
        __defProp$3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS$1 = (mod) => __copyProps$1(__defProp$3({}, "__esModule", { value: true }), mod);
var get_vercel_oidc_token_exports = {};
__export$3(get_vercel_oidc_token_exports, {
  getVercelOidcToken: () => getVercelOidcToken,
  getVercelOidcTokenSync: () => getVercelOidcTokenSync
});
var getVercelOidcToken_1 = __toCommonJS$1(get_vercel_oidc_token_exports);
var import_get_context$1 = getContext_1;
var import_token_error = tokenError;
async function getVercelOidcToken() {
  let token = "";
  let err;
  try {
    token = getVercelOidcTokenSync();
  } catch (error) {
    err = error;
  }
  try {
    const [{ getTokenPayload, isExpired }, { refreshToken }] = await Promise.all([
      await import('./token-util.mjs').then(function (n) { return n.t; }),
      await import('./token.mjs').then(function (n) { return n.t; })
    ]);
    if (!token || isExpired(getTokenPayload(token))) {
      await refreshToken();
      token = getVercelOidcTokenSync();
    }
  } catch (error) {
    if (err?.message && error instanceof Error) {
      error.message = `${err.message}
${error.message}`;
    }
    throw new import_token_error.VercelOidcTokenError(`Failed to refresh OIDC token`, error);
  }
  return token;
}
function getVercelOidcTokenSync() {
  const token = (0, import_get_context$1.getContext)().headers?.["x-vercel-oidc-token"] ?? process.env.VERCEL_OIDC_TOKEN;
  if (!token) {
    throw new Error(
      `The 'x-vercel-oidc-token' header is missing from the request. Do you have the OIDC option enabled in the Vercel project settings?`
    );
  }
  return token;
}

var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export$2 = (target, all) => {
  for (var name in all)
    __defProp$2(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp$2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp$2({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export$2(src_exports, {
  getContext: () => import_get_context.getContext,
  getVercelOidcToken: () => import_get_vercel_oidc_token.getVercelOidcToken,
  getVercelOidcTokenSync: () => import_get_vercel_oidc_token.getVercelOidcTokenSync
});
var dist = __toCommonJS(src_exports);
var import_get_vercel_oidc_token = getVercelOidcToken_1;
var import_get_context = getContext_1;

const ignoreOverride$1 = Symbol("Let zodToJsonSchema decide on which parser to use");
const defaultOptions$1 = {
    name: undefined,
    $refStrategy: "root",
    basePath: ["#"],
    effectStrategy: "input",
    pipeStrategy: "all",
    dateStrategy: "format:date-time",
    mapStrategy: "entries",
    removeAdditionalStrategy: "passthrough",
    allowedAdditionalProperties: true,
    rejectedAdditionalProperties: false,
    definitionPath: "definitions",
    target: "jsonSchema7",
    strictUnions: false,
    definitions: {},
    errorMessages: false,
    markdownDescription: false,
    patternStrategy: "escape",
    applyRegexFlags: false,
    emailStrategy: "format:email",
    base64Strategy: "contentEncoding:base64",
    nameStrategy: "ref",
    openAiAnyTypeName: "OpenAiAnyType"
};
const getDefaultOptions$1 = (options) => (typeof options === "string"
    ? {
        ...defaultOptions$1,
        name: options,
    }
    : {
        ...defaultOptions$1,
        ...options,
    });

const getRefs$1 = (options) => {
    const _options = getDefaultOptions$1(options);
    const currentPath = _options.name !== undefined
        ? [..._options.basePath, _options.definitionPath, _options.name]
        : _options.basePath;
    return {
        ..._options,
        flags: { hasReferencedOpenAiAnyType: false },
        currentPath: currentPath,
        propertyPath: undefined,
        seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
            def._def,
            {
                def: def._def,
                path: [..._options.basePath, _options.definitionPath, name],
                // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
                jsonSchema: undefined,
            },
        ])),
    };
};

function addErrorMessage(res, key, errorMessage, refs) {
    if (!refs?.errorMessages)
        return;
    if (errorMessage) {
        res.errorMessage = {
            ...res.errorMessage,
            [key]: errorMessage,
        };
    }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
    res[key] = value;
    addErrorMessage(res, key, errorMessage, refs);
}

const getRelativePath$1 = (pathA, pathB) => {
    let i = 0;
    for (; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] !== pathB[i])
            break;
    }
    return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};

function parseAnyDef$1(refs) {
    if (refs.target !== "openAi") {
        return {};
    }
    const anyDefinitionPath = [
        ...refs.basePath,
        refs.definitionPath,
        refs.openAiAnyTypeName,
    ];
    refs.flags.hasReferencedOpenAiAnyType = true;
    return {
        $ref: refs.$refStrategy === "relative"
            ? getRelativePath$1(anyDefinitionPath, refs.currentPath)
            : anyDefinitionPath.join("/"),
    };
}

function parseArrayDef$1(def, refs) {
    const res = {
        type: "array",
    };
    if (def.type?._def &&
        def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
        res.items = parseDef$1(def.type._def, {
            ...refs,
            currentPath: [...refs.currentPath, "items"],
        });
    }
    if (def.minLength) {
        setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
    }
    if (def.maxLength) {
        setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
    }
    if (def.exactLength) {
        setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
        setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
    }
    return res;
}

function parseBigintDef$1(def, refs) {
    const res = {
        type: "integer",
        format: "int64",
    };
    if (!def.checks)
        return res;
    for (const check of def.checks) {
        switch (check.kind) {
            case "min":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                }
                break;
            case "multipleOf":
                setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
                break;
        }
    }
    return res;
}

function parseBooleanDef$1() {
    return {
        type: "boolean",
    };
}

function parseBrandedDef$1(_def, refs) {
    return parseDef$1(_def.type._def, refs);
}

const parseCatchDef$1 = (def, refs) => {
    return parseDef$1(def.innerType._def, refs);
};

function parseDateDef$1(def, refs, overrideDateStrategy) {
    const strategy = overrideDateStrategy ?? refs.dateStrategy;
    if (Array.isArray(strategy)) {
        return {
            anyOf: strategy.map((item, i) => parseDateDef$1(def, refs, item)),
        };
    }
    switch (strategy) {
        case "string":
        case "format:date-time":
            return {
                type: "string",
                format: "date-time",
            };
        case "format:date":
            return {
                type: "string",
                format: "date",
            };
        case "integer":
            return integerDateParser$1(def, refs);
    }
}
const integerDateParser$1 = (def, refs) => {
    const res = {
        type: "integer",
        format: "unix-time",
    };
    if (refs.target === "openApi3") {
        return res;
    }
    for (const check of def.checks) {
        switch (check.kind) {
            case "min":
                setResponseValueAndErrors(res, "minimum", check.value, // This is in milliseconds
                check.message, refs);
                break;
            case "max":
                setResponseValueAndErrors(res, "maximum", check.value, // This is in milliseconds
                check.message, refs);
                break;
        }
    }
    return res;
};

function parseDefaultDef$1(_def, refs) {
    return {
        ...parseDef$1(_def.innerType._def, refs),
        default: _def.defaultValue(),
    };
}

function parseEffectsDef$1(_def, refs) {
    return refs.effectStrategy === "input"
        ? parseDef$1(_def.schema._def, refs)
        : parseAnyDef$1(refs);
}

function parseEnumDef$1(def) {
    return {
        type: "string",
        enum: Array.from(def.values),
    };
}

const isJsonSchema7AllOfType$1 = (type) => {
    if ("type" in type && type.type === "string")
        return false;
    return "allOf" in type;
};
function parseIntersectionDef$1(def, refs) {
    const allOf = [
        parseDef$1(def.left._def, {
            ...refs,
            currentPath: [...refs.currentPath, "allOf", "0"],
        }),
        parseDef$1(def.right._def, {
            ...refs,
            currentPath: [...refs.currentPath, "allOf", "1"],
        }),
    ].filter((x) => !!x);
    let unevaluatedProperties = refs.target === "jsonSchema2019-09"
        ? { unevaluatedProperties: false }
        : undefined;
    const mergedAllOf = [];
    // If either of the schemas is an allOf, merge them into a single allOf
    allOf.forEach((schema) => {
        if (isJsonSchema7AllOfType$1(schema)) {
            mergedAllOf.push(...schema.allOf);
            if (schema.unevaluatedProperties === undefined) {
                // If one of the schemas has no unevaluatedProperties set,
                // the merged schema should also have no unevaluatedProperties set
                unevaluatedProperties = undefined;
            }
        }
        else {
            let nestedSchema = schema;
            if ("additionalProperties" in schema &&
                schema.additionalProperties === false) {
                const { additionalProperties, ...rest } = schema;
                nestedSchema = rest;
            }
            else {
                // As soon as one of the schemas has additionalProperties set not to false, we allow unevaluatedProperties
                unevaluatedProperties = undefined;
            }
            mergedAllOf.push(nestedSchema);
        }
    });
    return mergedAllOf.length
        ? {
            allOf: mergedAllOf,
            ...unevaluatedProperties,
        }
        : undefined;
}

function parseLiteralDef$1(def, refs) {
    const parsedType = typeof def.value;
    if (parsedType !== "bigint" &&
        parsedType !== "number" &&
        parsedType !== "boolean" &&
        parsedType !== "string") {
        return {
            type: Array.isArray(def.value) ? "array" : "object",
        };
    }
    if (refs.target === "openApi3") {
        return {
            type: parsedType === "bigint" ? "integer" : parsedType,
            enum: [def.value],
        };
    }
    return {
        type: parsedType === "bigint" ? "integer" : parsedType,
        const: def.value,
    };
}

let emojiRegex$1 = undefined;
/**
 * Generated from the regular expressions found here as of 2024-05-22:
 * https://github.com/colinhacks/zod/blob/master/src/types.ts.
 *
 * Expressions with /i flag have been changed accordingly.
 */
const zodPatterns$1 = {
    /**
     * `c` was changed to `[cC]` to replicate /i flag
     */
    cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    /**
     * `a-z` was added to replicate /i flag
     */
    email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    /**
     * Constructed a valid Unicode RegExp
     *
     * Lazily instantiate since this type of regex isn't supported
     * in all envs (e.g. React Native).
     *
     * See:
     * https://github.com/colinhacks/zod/issues/2433
     * Fix in Zod:
     * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
     */
    emoji: () => {
        if (emojiRegex$1 === undefined) {
            emojiRegex$1 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
        }
        return emojiRegex$1;
    },
    /**
     * Unused
     */
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    /**
     * Unused
     */
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    /**
     * Unused
     */
    ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/,
    jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
};
function parseStringDef$1(def, refs) {
    const res = {
        type: "string",
    };
    if (def.checks) {
        for (const check of def.checks) {
            switch (check.kind) {
                case "min":
                    setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number"
                        ? Math.max(res.minLength, check.value)
                        : check.value, check.message, refs);
                    break;
                case "max":
                    setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number"
                        ? Math.min(res.maxLength, check.value)
                        : check.value, check.message, refs);
                    break;
                case "email":
                    switch (refs.emailStrategy) {
                        case "format:email":
                            addFormat$1(res, "email", check.message, refs);
                            break;
                        case "format:idn-email":
                            addFormat$1(res, "idn-email", check.message, refs);
                            break;
                        case "pattern:zod":
                            addPattern$1(res, zodPatterns$1.email, check.message, refs);
                            break;
                    }
                    break;
                case "url":
                    addFormat$1(res, "uri", check.message, refs);
                    break;
                case "uuid":
                    addFormat$1(res, "uuid", check.message, refs);
                    break;
                case "regex":
                    addPattern$1(res, check.regex, check.message, refs);
                    break;
                case "cuid":
                    addPattern$1(res, zodPatterns$1.cuid, check.message, refs);
                    break;
                case "cuid2":
                    addPattern$1(res, zodPatterns$1.cuid2, check.message, refs);
                    break;
                case "startsWith":
                    addPattern$1(res, RegExp(`^${escapeLiteralCheckValue$1(check.value, refs)}`), check.message, refs);
                    break;
                case "endsWith":
                    addPattern$1(res, RegExp(`${escapeLiteralCheckValue$1(check.value, refs)}$`), check.message, refs);
                    break;
                case "datetime":
                    addFormat$1(res, "date-time", check.message, refs);
                    break;
                case "date":
                    addFormat$1(res, "date", check.message, refs);
                    break;
                case "time":
                    addFormat$1(res, "time", check.message, refs);
                    break;
                case "duration":
                    addFormat$1(res, "duration", check.message, refs);
                    break;
                case "length":
                    setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number"
                        ? Math.max(res.minLength, check.value)
                        : check.value, check.message, refs);
                    setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number"
                        ? Math.min(res.maxLength, check.value)
                        : check.value, check.message, refs);
                    break;
                case "includes": {
                    addPattern$1(res, RegExp(escapeLiteralCheckValue$1(check.value, refs)), check.message, refs);
                    break;
                }
                case "ip": {
                    if (check.version !== "v6") {
                        addFormat$1(res, "ipv4", check.message, refs);
                    }
                    if (check.version !== "v4") {
                        addFormat$1(res, "ipv6", check.message, refs);
                    }
                    break;
                }
                case "base64url":
                    addPattern$1(res, zodPatterns$1.base64url, check.message, refs);
                    break;
                case "jwt":
                    addPattern$1(res, zodPatterns$1.jwt, check.message, refs);
                    break;
                case "cidr": {
                    if (check.version !== "v6") {
                        addPattern$1(res, zodPatterns$1.ipv4Cidr, check.message, refs);
                    }
                    if (check.version !== "v4") {
                        addPattern$1(res, zodPatterns$1.ipv6Cidr, check.message, refs);
                    }
                    break;
                }
                case "emoji":
                    addPattern$1(res, zodPatterns$1.emoji(), check.message, refs);
                    break;
                case "ulid": {
                    addPattern$1(res, zodPatterns$1.ulid, check.message, refs);
                    break;
                }
                case "base64": {
                    switch (refs.base64Strategy) {
                        case "format:binary": {
                            addFormat$1(res, "binary", check.message, refs);
                            break;
                        }
                        case "contentEncoding:base64": {
                            setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
                            break;
                        }
                        case "pattern:zod": {
                            addPattern$1(res, zodPatterns$1.base64, check.message, refs);
                            break;
                        }
                    }
                    break;
                }
                case "nanoid": {
                    addPattern$1(res, zodPatterns$1.nanoid, check.message, refs);
                }
            }
        }
    }
    return res;
}
function escapeLiteralCheckValue$1(literal, refs) {
    return refs.patternStrategy === "escape"
        ? escapeNonAlphaNumeric$1(literal)
        : literal;
}
const ALPHA_NUMERIC$1 = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric$1(source) {
    let result = "";
    for (let i = 0; i < source.length; i++) {
        if (!ALPHA_NUMERIC$1.has(source[i])) {
            result += "\\";
        }
        result += source[i];
    }
    return result;
}
// Adds a "format" keyword to the schema. If a format exists, both formats will be joined in an allOf-node, along with subsequent ones.
function addFormat$1(schema, value, message, refs) {
    if (schema.format || schema.anyOf?.some((x) => x.format)) {
        if (!schema.anyOf) {
            schema.anyOf = [];
        }
        if (schema.format) {
            schema.anyOf.push({
                format: schema.format,
                ...(schema.errorMessage &&
                    refs.errorMessages && {
                    errorMessage: { format: schema.errorMessage.format },
                }),
            });
            delete schema.format;
            if (schema.errorMessage) {
                delete schema.errorMessage.format;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.anyOf.push({
            format: value,
            ...(message &&
                refs.errorMessages && { errorMessage: { format: message } }),
        });
    }
    else {
        setResponseValueAndErrors(schema, "format", value, message, refs);
    }
}
// Adds a "pattern" keyword to the schema. If a pattern exists, both patterns will be joined in an allOf-node, along with subsequent ones.
function addPattern$1(schema, regex, message, refs) {
    if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
        if (!schema.allOf) {
            schema.allOf = [];
        }
        if (schema.pattern) {
            schema.allOf.push({
                pattern: schema.pattern,
                ...(schema.errorMessage &&
                    refs.errorMessages && {
                    errorMessage: { pattern: schema.errorMessage.pattern },
                }),
            });
            delete schema.pattern;
            if (schema.errorMessage) {
                delete schema.errorMessage.pattern;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.allOf.push({
            pattern: stringifyRegExpWithFlags$1(regex, refs),
            ...(message &&
                refs.errorMessages && { errorMessage: { pattern: message } }),
        });
    }
    else {
        setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags$1(regex, refs), message, refs);
    }
}
// Mutate z.string.regex() in a best attempt to accommodate for regex flags when applyRegexFlags is true
function stringifyRegExpWithFlags$1(regex, refs) {
    if (!refs.applyRegexFlags || !regex.flags) {
        return regex.source;
    }
    // Currently handled flags
    const flags = {
        i: regex.flags.includes("i"),
        m: regex.flags.includes("m"),
        s: regex.flags.includes("s"), // `.` matches newlines
    };
    // The general principle here is to step through each character, one at a time, applying mutations as flags require. We keep track when the current character is escaped, and when it's inside a group /like [this]/ or (also) a range like /[a-z]/. The following is fairly brittle imperative code; edit at your peril!
    const source = flags.i ? regex.source.toLowerCase() : regex.source;
    let pattern = "";
    let isEscaped = false;
    let inCharGroup = false;
    let inCharRange = false;
    for (let i = 0; i < source.length; i++) {
        if (isEscaped) {
            pattern += source[i];
            isEscaped = false;
            continue;
        }
        if (flags.i) {
            if (inCharGroup) {
                if (source[i].match(/[a-z]/)) {
                    if (inCharRange) {
                        pattern += source[i];
                        pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
                        inCharRange = false;
                    }
                    else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
                        pattern += source[i];
                        inCharRange = true;
                    }
                    else {
                        pattern += `${source[i]}${source[i].toUpperCase()}`;
                    }
                    continue;
                }
            }
            else if (source[i].match(/[a-z]/)) {
                pattern += `[${source[i]}${source[i].toUpperCase()}]`;
                continue;
            }
        }
        if (flags.m) {
            if (source[i] === "^") {
                pattern += `(^|(?<=[\r\n]))`;
                continue;
            }
            else if (source[i] === "$") {
                pattern += `($|(?=[\r\n]))`;
                continue;
            }
        }
        if (flags.s && source[i] === ".") {
            pattern += inCharGroup ? `${source[i]}\r\n` : `[${source[i]}\r\n]`;
            continue;
        }
        pattern += source[i];
        if (source[i] === "\\") {
            isEscaped = true;
        }
        else if (inCharGroup && source[i] === "]") {
            inCharGroup = false;
        }
        else if (!inCharGroup && source[i] === "[") {
            inCharGroup = true;
        }
    }
    return pattern;
}

function parseRecordDef$1(def, refs) {
    if (refs.target === "openAi") {
        console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
    }
    if (refs.target === "openApi3" &&
        def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
        return {
            type: "object",
            required: def.keyType._def.values,
            properties: def.keyType._def.values.reduce((acc, key) => ({
                ...acc,
                [key]: parseDef$1(def.valueType._def, {
                    ...refs,
                    currentPath: [...refs.currentPath, "properties", key],
                }) ?? parseAnyDef$1(refs),
            }), {}),
            additionalProperties: refs.rejectedAdditionalProperties,
        };
    }
    const schema = {
        type: "object",
        additionalProperties: parseDef$1(def.valueType._def, {
            ...refs,
            currentPath: [...refs.currentPath, "additionalProperties"],
        }) ?? refs.allowedAdditionalProperties,
    };
    if (refs.target === "openApi3") {
        return schema;
    }
    if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString &&
        def.keyType._def.checks?.length) {
        const { type, ...keyType } = parseStringDef$1(def.keyType._def, refs);
        return {
            ...schema,
            propertyNames: keyType,
        };
    }
    else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
        return {
            ...schema,
            propertyNames: {
                enum: def.keyType._def.values,
            },
        };
    }
    else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded &&
        def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString &&
        def.keyType._def.type._def.checks?.length) {
        const { type, ...keyType } = parseBrandedDef$1(def.keyType._def, refs);
        return {
            ...schema,
            propertyNames: keyType,
        };
    }
    return schema;
}

function parseMapDef$1(def, refs) {
    if (refs.mapStrategy === "record") {
        return parseRecordDef$1(def, refs);
    }
    const keys = parseDef$1(def.keyType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", "items", "0"],
    }) || parseAnyDef$1(refs);
    const values = parseDef$1(def.valueType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", "items", "1"],
    }) || parseAnyDef$1(refs);
    return {
        type: "array",
        maxItems: 125,
        items: {
            type: "array",
            items: [keys, values],
            minItems: 2,
            maxItems: 2,
        },
    };
}

function parseNativeEnumDef$1(def) {
    const object = def.values;
    const actualKeys = Object.keys(def.values).filter((key) => {
        return typeof object[object[key]] !== "number";
    });
    const actualValues = actualKeys.map((key) => object[key]);
    const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
    return {
        type: parsedTypes.length === 1
            ? parsedTypes[0] === "string"
                ? "string"
                : "number"
            : ["string", "number"],
        enum: actualValues,
    };
}

function parseNeverDef$1(refs) {
    return refs.target === "openAi"
        ? undefined
        : {
            not: parseAnyDef$1({
                ...refs,
                currentPath: [...refs.currentPath, "not"],
            }),
        };
}

function parseNullDef$1(refs) {
    return refs.target === "openApi3"
        ? {
            enum: ["null"],
            nullable: true,
        }
        : {
            type: "null",
        };
}

const primitiveMappings$1 = {
    ZodString: "string",
    ZodNumber: "number",
    ZodBigInt: "integer",
    ZodBoolean: "boolean",
    ZodNull: "null",
};
function parseUnionDef$1(def, refs) {
    if (refs.target === "openApi3")
        return asAnyOf$1(def, refs);
    const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
    // This blocks tries to look ahead a bit to produce nicer looking schemas with type array instead of anyOf.
    if (options.every((x) => x._def.typeName in primitiveMappings$1 &&
        (!x._def.checks || !x._def.checks.length))) {
        // all types in union are primitive and lack checks, so might as well squash into {type: [...]}
        const types = options.reduce((types, x) => {
            const type = primitiveMappings$1[x._def.typeName]; //Can be safely casted due to row 43
            return type && !types.includes(type) ? [...types, type] : types;
        }, []);
        return {
            type: types.length > 1 ? types : types[0],
        };
    }
    else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
        // all options literals
        const types = options.reduce((acc, x) => {
            const type = typeof x._def.value;
            switch (type) {
                case "string":
                case "number":
                case "boolean":
                    return [...acc, type];
                case "bigint":
                    return [...acc, "integer"];
                case "object":
                    if (x._def.value === null)
                        return [...acc, "null"];
                case "symbol":
                case "undefined":
                case "function":
                default:
                    return acc;
            }
        }, []);
        if (types.length === options.length) {
            // all the literals are primitive, as far as null can be considered primitive
            const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
            return {
                type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
                enum: options.reduce((acc, x) => {
                    return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
                }, []),
            };
        }
    }
    else if (options.every((x) => x._def.typeName === "ZodEnum")) {
        return {
            type: "string",
            enum: options.reduce((acc, x) => [
                ...acc,
                ...x._def.values.filter((x) => !acc.includes(x)),
            ], []),
        };
    }
    return asAnyOf$1(def, refs);
}
const asAnyOf$1 = (def, refs) => {
    const anyOf = (def.options instanceof Map
        ? Array.from(def.options.values())
        : def.options)
        .map((x, i) => parseDef$1(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", `${i}`],
    }))
        .filter((x) => !!x &&
        (!refs.strictUnions ||
            (typeof x === "object" && Object.keys(x).length > 0)));
    return anyOf.length ? { anyOf } : undefined;
};

function parseNullableDef$1(def, refs) {
    if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) &&
        (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
        if (refs.target === "openApi3") {
            return {
                type: primitiveMappings$1[def.innerType._def.typeName],
                nullable: true,
            };
        }
        return {
            type: [
                primitiveMappings$1[def.innerType._def.typeName],
                "null",
            ],
        };
    }
    if (refs.target === "openApi3") {
        const base = parseDef$1(def.innerType._def, {
            ...refs,
            currentPath: [...refs.currentPath],
        });
        if (base && "$ref" in base)
            return { allOf: [base], nullable: true };
        return base && { ...base, nullable: true };
    }
    const base = parseDef$1(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "0"],
    });
    return base && { anyOf: [base, { type: "null" }] };
}

function parseNumberDef$1(def, refs) {
    const res = {
        type: "number",
    };
    if (!def.checks)
        return res;
    for (const check of def.checks) {
        switch (check.kind) {
            case "int":
                res.type = "integer";
                addErrorMessage(res, "type", check.message, refs);
                break;
            case "min":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                    }
                    else {
                        setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
                    }
                }
                else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
                }
                break;
            case "multipleOf":
                setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
                break;
        }
    }
    return res;
}

function parseObjectDef$1(def, refs) {
    const forceOptionalIntoNullable = refs.target === "openAi";
    const result = {
        type: "object",
        properties: {},
    };
    const required = [];
    const shape = def.shape();
    for (const propName in shape) {
        let propDef = shape[propName];
        if (propDef === undefined || propDef._def === undefined) {
            continue;
        }
        let propOptional = safeIsOptional$1(propDef);
        if (propOptional && forceOptionalIntoNullable) {
            if (propDef._def.typeName === "ZodOptional") {
                propDef = propDef._def.innerType;
            }
            if (!propDef.isNullable()) {
                propDef = propDef.nullable();
            }
            propOptional = false;
        }
        const parsedDef = parseDef$1(propDef._def, {
            ...refs,
            currentPath: [...refs.currentPath, "properties", propName],
            propertyPath: [...refs.currentPath, "properties", propName],
        });
        if (parsedDef === undefined) {
            continue;
        }
        result.properties[propName] = parsedDef;
        if (!propOptional) {
            required.push(propName);
        }
    }
    if (required.length) {
        result.required = required;
    }
    const additionalProperties = decideAdditionalProperties$1(def, refs);
    if (additionalProperties !== undefined) {
        result.additionalProperties = additionalProperties;
    }
    return result;
}
function decideAdditionalProperties$1(def, refs) {
    if (def.catchall._def.typeName !== "ZodNever") {
        return parseDef$1(def.catchall._def, {
            ...refs,
            currentPath: [...refs.currentPath, "additionalProperties"],
        });
    }
    switch (def.unknownKeys) {
        case "passthrough":
            return refs.allowedAdditionalProperties;
        case "strict":
            return refs.rejectedAdditionalProperties;
        case "strip":
            return refs.removeAdditionalStrategy === "strict"
                ? refs.allowedAdditionalProperties
                : refs.rejectedAdditionalProperties;
    }
}
function safeIsOptional$1(schema) {
    try {
        return schema.isOptional();
    }
    catch {
        return true;
    }
}

const parseOptionalDef$1 = (def, refs) => {
    if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
        return parseDef$1(def.innerType._def, refs);
    }
    const innerSchema = parseDef$1(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "1"],
    });
    return innerSchema
        ? {
            anyOf: [
                {
                    not: parseAnyDef$1(refs),
                },
                innerSchema,
            ],
        }
        : parseAnyDef$1(refs);
};

const parsePipelineDef$1 = (def, refs) => {
    if (refs.pipeStrategy === "input") {
        return parseDef$1(def.in._def, refs);
    }
    else if (refs.pipeStrategy === "output") {
        return parseDef$1(def.out._def, refs);
    }
    const a = parseDef$1(def.in._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", "0"],
    });
    const b = parseDef$1(def.out._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"],
    });
    return {
        allOf: [a, b].filter((x) => x !== undefined),
    };
};

function parsePromiseDef$1(def, refs) {
    return parseDef$1(def.type._def, refs);
}

function parseSetDef$1(def, refs) {
    const items = parseDef$1(def.valueType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items"],
    });
    const schema = {
        type: "array",
        uniqueItems: true,
        items,
    };
    if (def.minSize) {
        setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
    }
    if (def.maxSize) {
        setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
    }
    return schema;
}

function parseTupleDef$1(def, refs) {
    if (def.rest) {
        return {
            type: "array",
            minItems: def.items.length,
            items: def.items
                .map((x, i) => parseDef$1(x._def, {
                ...refs,
                currentPath: [...refs.currentPath, "items", `${i}`],
            }))
                .reduce((acc, x) => (x === undefined ? acc : [...acc, x]), []),
            additionalItems: parseDef$1(def.rest._def, {
                ...refs,
                currentPath: [...refs.currentPath, "additionalItems"],
            }),
        };
    }
    else {
        return {
            type: "array",
            minItems: def.items.length,
            maxItems: def.items.length,
            items: def.items
                .map((x, i) => parseDef$1(x._def, {
                ...refs,
                currentPath: [...refs.currentPath, "items", `${i}`],
            }))
                .reduce((acc, x) => (x === undefined ? acc : [...acc, x]), []),
        };
    }
}

function parseUndefinedDef$1(refs) {
    return {
        not: parseAnyDef$1(refs),
    };
}

function parseUnknownDef$1(refs) {
    return parseAnyDef$1(refs);
}

const parseReadonlyDef$1 = (def, refs) => {
    return parseDef$1(def.innerType._def, refs);
};

const selectParser$1 = (def, typeName, refs) => {
    switch (typeName) {
        case ZodFirstPartyTypeKind.ZodString:
            return parseStringDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodNumber:
            return parseNumberDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodObject:
            return parseObjectDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodBigInt:
            return parseBigintDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodBoolean:
            return parseBooleanDef$1();
        case ZodFirstPartyTypeKind.ZodDate:
            return parseDateDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodUndefined:
            return parseUndefinedDef$1(refs);
        case ZodFirstPartyTypeKind.ZodNull:
            return parseNullDef$1(refs);
        case ZodFirstPartyTypeKind.ZodArray:
            return parseArrayDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodUnion:
        case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
            return parseUnionDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodIntersection:
            return parseIntersectionDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodTuple:
            return parseTupleDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodRecord:
            return parseRecordDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodLiteral:
            return parseLiteralDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodEnum:
            return parseEnumDef$1(def);
        case ZodFirstPartyTypeKind.ZodNativeEnum:
            return parseNativeEnumDef$1(def);
        case ZodFirstPartyTypeKind.ZodNullable:
            return parseNullableDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodOptional:
            return parseOptionalDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodMap:
            return parseMapDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodSet:
            return parseSetDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodLazy:
            return () => def.getter()._def;
        case ZodFirstPartyTypeKind.ZodPromise:
            return parsePromiseDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodNaN:
        case ZodFirstPartyTypeKind.ZodNever:
            return parseNeverDef$1(refs);
        case ZodFirstPartyTypeKind.ZodEffects:
            return parseEffectsDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodAny:
            return parseAnyDef$1(refs);
        case ZodFirstPartyTypeKind.ZodUnknown:
            return parseUnknownDef$1(refs);
        case ZodFirstPartyTypeKind.ZodDefault:
            return parseDefaultDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodBranded:
            return parseBrandedDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodReadonly:
            return parseReadonlyDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodCatch:
            return parseCatchDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodPipeline:
            return parsePipelineDef$1(def, refs);
        case ZodFirstPartyTypeKind.ZodFunction:
        case ZodFirstPartyTypeKind.ZodVoid:
        case ZodFirstPartyTypeKind.ZodSymbol:
            return undefined;
        default:
            /* c8 ignore next */
            return ((_) => undefined)();
    }
};

function parseDef$1(def, refs, forceResolution = false) {
    const seenItem = refs.seen.get(def);
    if (refs.override) {
        const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
        if (overrideResult !== ignoreOverride$1) {
            return overrideResult;
        }
    }
    if (seenItem && !forceResolution) {
        const seenSchema = get$ref$1(seenItem, refs);
        if (seenSchema !== undefined) {
            return seenSchema;
        }
    }
    const newItem = { def, path: refs.currentPath, jsonSchema: undefined };
    refs.seen.set(def, newItem);
    const jsonSchemaOrGetter = selectParser$1(def, def.typeName, refs);
    // If the return was a function, then the inner definition needs to be extracted before a call to parseDef (recursive)
    const jsonSchema = typeof jsonSchemaOrGetter === "function"
        ? parseDef$1(jsonSchemaOrGetter(), refs)
        : jsonSchemaOrGetter;
    if (jsonSchema) {
        addMeta$1(def, refs, jsonSchema);
    }
    if (refs.postProcess) {
        const postProcessResult = refs.postProcess(jsonSchema, def, refs);
        newItem.jsonSchema = jsonSchema;
        return postProcessResult;
    }
    newItem.jsonSchema = jsonSchema;
    return jsonSchema;
}
const get$ref$1 = (item, refs) => {
    switch (refs.$refStrategy) {
        case "root":
            return { $ref: item.path.join("/") };
        case "relative":
            return { $ref: getRelativePath$1(refs.currentPath, item.path) };
        case "none":
        case "seen": {
            if (item.path.length < refs.currentPath.length &&
                item.path.every((value, index) => refs.currentPath[index] === value)) {
                console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
                return parseAnyDef$1(refs);
            }
            return refs.$refStrategy === "seen" ? parseAnyDef$1(refs) : undefined;
        }
    }
};
const addMeta$1 = (def, refs, jsonSchema) => {
    if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
            jsonSchema.markdownDescription = def.description;
        }
    }
    return jsonSchema;
};

const zodToJsonSchema$2 = (schema, options) => {
    const refs = getRefs$1(options);
    let definitions = typeof options === "object" && options.definitions
        ? Object.entries(options.definitions).reduce((acc, [name, schema]) => ({
            ...acc,
            [name]: parseDef$1(schema._def, {
                ...refs,
                currentPath: [...refs.basePath, refs.definitionPath, name],
            }, true) ?? parseAnyDef$1(refs),
        }), {})
        : undefined;
    const name = typeof options === "string"
        ? options
        : options?.nameStrategy === "title"
            ? undefined
            : options?.name;
    const main = parseDef$1(schema._def, name === undefined
        ? refs
        : {
            ...refs,
            currentPath: [...refs.basePath, refs.definitionPath, name],
        }, false) ?? parseAnyDef$1(refs);
    const title = typeof options === "object" &&
        options.name !== undefined &&
        options.nameStrategy === "title"
        ? options.name
        : undefined;
    if (title !== undefined) {
        main.title = title;
    }
    if (refs.flags.hasReferencedOpenAiAnyType) {
        if (!definitions) {
            definitions = {};
        }
        if (!definitions[refs.openAiAnyTypeName]) {
            definitions[refs.openAiAnyTypeName] = {
                // Skipping "object" as no properties can be defined and additionalProperties must be "false"
                type: ["string", "number", "integer", "boolean", "array", "null"],
                items: {
                    $ref: refs.$refStrategy === "relative"
                        ? "1"
                        : [
                            ...refs.basePath,
                            refs.definitionPath,
                            refs.openAiAnyTypeName,
                        ].join("/"),
                },
            };
        }
    }
    const combined = name === undefined
        ? definitions
            ? {
                ...main,
                [refs.definitionPath]: definitions,
            }
            : main
        : {
            $ref: [
                ...(refs.$refStrategy === "relative" ? [] : refs.basePath),
                refs.definitionPath,
                name,
            ].join("/"),
            [refs.definitionPath]: {
                ...definitions,
                [name]: main,
            },
        };
    if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
    }
    else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
    }
    if (refs.target === "openAi" &&
        ("anyOf" in combined ||
            "oneOf" in combined ||
            "allOf" in combined ||
            ("type" in combined && Array.isArray(combined.type)))) {
        console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
    }
    return combined;
};

// src/zod-to-json.ts
var PATCHED = Symbol("__mastra_patched__");
function patchRecordSchemas(schema) {
  if (!schema || typeof schema !== "object") return schema;
  if (schema[PATCHED]) return schema;
  schema[PATCHED] = true;
  const def = schema._zod?.def;
  if (def?.type === "record" && def.keyType && !def.valueType) {
    def.valueType = def.keyType;
    def.keyType = string();
  }
  if (!def) return schema;
  if (def.type === "object" && def.shape) {
    const shape = typeof def.shape === "function" ? def.shape() : def.shape;
    for (const key of Object.keys(shape)) {
      patchRecordSchemas(shape[key]);
    }
  }
  if (def.type === "array" && def.element) {
    patchRecordSchemas(def.element);
  }
  if (def.type === "union" && def.options) {
    def.options.forEach(patchRecordSchemas);
  }
  if (def.type === "record") {
    if (def.keyType) patchRecordSchemas(def.keyType);
    if (def.valueType) patchRecordSchemas(def.valueType);
  }
  if (def.type === "intersection") {
    if (def.left) patchRecordSchemas(def.left);
    if (def.right) patchRecordSchemas(def.right);
  }
  if (def.type === "lazy") {
    if (def.getter && typeof def.getter === "function") {
      const originalGetter = def.getter;
      def.getter = function() {
        const innerSchema = originalGetter();
        if (innerSchema) {
          patchRecordSchemas(innerSchema);
        }
        return innerSchema;
      };
    }
  }
  if (def.innerType) {
    patchRecordSchemas(def.innerType);
  }
  return schema;
}
function zodToJsonSchema$1(zodSchema, target = "jsonSchema7", strategy = "relative") {
  const fn = "toJSONSchema";
  {
    patchRecordSchemas(zodSchema);
    return z[fn](zodSchema, {
      unrepresentable: "any",
      override: (ctx) => {
        const def = ctx.zodSchema?._def || ctx.zodSchema?._zod?.def;
        if (def && (def.typeName === "ZodDate" || def.type === "date")) {
          ctx.jsonSchema.type = "string";
          ctx.jsonSchema.format = "date-time";
        }
      }
    });
  }
}

// src/combine-headers.ts

// src/convert-async-iterator-to-readable-stream.ts
function convertAsyncIteratorToReadableStream(iterator) {
  return new ReadableStream({
    /**
     * Called when the consumer wants to pull more data from the stream.
     *
     * @param {ReadableStreamDefaultController<T>} controller - The controller to enqueue data into the stream.
     * @returns {Promise<void>}
     */
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        controller.error(error);
      }
    },
    /**
     * Called when the consumer cancels the stream.
     */
    cancel() {
    }
  });
}

// src/delay.ts
async function delay$1(delayInMs) {
  return delayInMs == null ? Promise.resolve() : new Promise((resolve2) => setTimeout(resolve2, delayInMs));
}
var createIdGenerator$1 = ({
  prefix,
  size: defaultSize = 16,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = customAlphabet(alphabet, defaultSize);
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError$3({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return (size) => `${prefix}${separator}${generator(size)}`;
};
createIdGenerator$1();

// src/get-error-message.ts
function getErrorMessage$2(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

// src/is-abort-error.ts
function isAbortError$1(error) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}

// src/validator.ts
var validatorSymbol$1 = Symbol.for("vercel.ai.validator");
function validator$1(validate) {
  return { [validatorSymbol$1]: true, validate };
}
function isValidator$1(value) {
  return typeof value === "object" && value !== null && validatorSymbol$1 in value && value[validatorSymbol$1] === true && "validate" in value;
}
function asValidator$1(value) {
  return isValidator$1(value) ? value : zodValidator(value);
}
function zodValidator(zodSchema) {
  return validator$1((value) => {
    const result = zodSchema.safeParse(value);
    return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
  });
}
function safeValidateTypes$1({
  value,
  schema
}) {
  const validator2 = asValidator$1(schema);
  try {
    if (validator2.validate == null) {
      return { success: true, value };
    }
    const result = validator2.validate(value);
    if (result.success) {
      return result;
    }
    return {
      success: false,
      error: TypeValidationError$1.wrap({ value, cause: result.error })
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError$1.wrap({ value, cause: error })
    };
  }
}
function safeParseJSON$1({
  text,
  schema
}) {
  try {
    const value = SecureJSON.parse(text);
    if (schema == null) {
      return { success: true, value, rawValue: value };
    }
    const validationResult = safeValidateTypes$1({ value, schema });
    return validationResult.success ? { ...validationResult, rawValue: value } : validationResult;
  } catch (error) {
    return {
      success: false,
      error: JSONParseError$1.isInstance(error) ? error : new JSONParseError$1({ text, cause: error })
    };
  }
}

// src/index.ts

// src/fix-json.ts
function fixJson$1(input) {
  const stack = ["ROOT"];
  let lastValidIndex = -1;
  let literalStart = null;
  function processValueStart(char, i, swapState) {
    {
      switch (char) {
        case '"': {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_STRING");
          break;
        }
        case "f":
        case "t":
        case "n": {
          lastValidIndex = i;
          literalStart = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_LITERAL");
          break;
        }
        case "-": {
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "{": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_OBJECT_START");
          break;
        }
        case "[": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_ARRAY_START");
          break;
        }
      }
    }
  }
  function processAfterObjectValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  function processAfterArrayValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const currentState = stack[stack.length - 1];
    switch (currentState) {
      case "ROOT":
        processValueStart(char, i, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (char) {
          case ":": {
            stack.pop();
            stack.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        processAfterObjectValue(char, i);
        break;
      }
      case "INSIDE_STRING": {
        switch (char) {
          case '"': {
            stack.pop();
            lastValidIndex = i;
            break;
          }
          case "\\": {
            stack.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default: {
            lastValidIndex = i;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (char) {
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (char) {
          case ",": {
            stack.pop();
            stack.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        stack.pop();
        lastValidIndex = i;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (char) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            lastValidIndex = i;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".": {
            break;
          }
          case ",": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "}": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "]": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            break;
          }
          default: {
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, i + 1);
        if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
          stack.pop();
          if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
            processAfterObjectValue(char, i);
          } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
            processAfterArrayValue(char, i);
          }
        } else {
          lastValidIndex = i;
        }
        break;
      }
    }
  }
  let result = input.slice(0, lastValidIndex + 1);
  for (let i = stack.length - 1; i >= 0; i--) {
    const state = stack[i];
    switch (state) {
      case "INSIDE_STRING": {
        result += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        result += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        result += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, input.length);
        if ("true".startsWith(partialLiteral)) {
          result += "true".slice(partialLiteral.length);
        } else if ("false".startsWith(partialLiteral)) {
          result += "false".slice(partialLiteral.length);
        } else if ("null".startsWith(partialLiteral)) {
          result += "null".slice(partialLiteral.length);
        }
      }
    }
  }
  return result;
}

// src/parse-partial-json.ts
function parsePartialJson$1(jsonText) {
  if (jsonText === void 0) {
    return { value: void 0, state: "undefined-input" };
  }
  let result = safeParseJSON$1({ text: jsonText });
  if (result.success) {
    return { value: result.value, state: "successful-parse" };
  }
  result = safeParseJSON$1({ text: fixJson$1(jsonText) });
  if (result.success) {
    return { value: result.value, state: "repaired-parse" };
  }
  return { value: void 0, state: "failed-parse" };
}

// src/data-stream-parts.ts
var textStreamPart2 = {
  code: "0",
  name: "text",
  parse: (value) => {
    if (typeof value !== "string") {
      throw new Error('"text" parts expect a string value.');
    }
    return { type: "text", value };
  }
};
var dataStreamPart = {
  code: "2",
  name: "data",
  parse: (value) => {
    if (!Array.isArray(value)) {
      throw new Error('"data" parts expect an array value.');
    }
    return { type: "data", value };
  }
};
var errorStreamPart2 = {
  code: "3",
  name: "error",
  parse: (value) => {
    if (typeof value !== "string") {
      throw new Error('"error" parts expect a string value.');
    }
    return { type: "error", value };
  }
};
var messageAnnotationsStreamPart = {
  code: "8",
  name: "message_annotations",
  parse: (value) => {
    if (!Array.isArray(value)) {
      throw new Error('"message_annotations" parts expect an array value.');
    }
    return { type: "message_annotations", value };
  }
};
var toolCallStreamPart = {
  code: "9",
  name: "tool_call",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string" || !("args" in value) || typeof value.args !== "object") {
      throw new Error(
        '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.'
      );
    }
    return {
      type: "tool_call",
      value
    };
  }
};
var toolResultStreamPart = {
  code: "a",
  name: "tool_result",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("result" in value)) {
      throw new Error(
        '"tool_result" parts expect an object with a "toolCallId" and a "result" property.'
      );
    }
    return {
      type: "tool_result",
      value
    };
  }
};
var toolCallStreamingStartStreamPart = {
  code: "b",
  name: "tool_call_streaming_start",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string") {
      throw new Error(
        '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.'
      );
    }
    return {
      type: "tool_call_streaming_start",
      value
    };
  }
};
var toolCallDeltaStreamPart = {
  code: "c",
  name: "tool_call_delta",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("argsTextDelta" in value) || typeof value.argsTextDelta !== "string") {
      throw new Error(
        '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.'
      );
    }
    return {
      type: "tool_call_delta",
      value
    };
  }
};
var finishMessageStreamPart = {
  code: "d",
  name: "finish_message",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
      throw new Error(
        '"finish_message" parts expect an object with a "finishReason" property.'
      );
    }
    const result = {
      finishReason: value.finishReason
    };
    if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
      result.usage = {
        promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
        completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
      };
    }
    return {
      type: "finish_message",
      value: result
    };
  }
};
var finishStepStreamPart = {
  code: "e",
  name: "finish_step",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
      throw new Error(
        '"finish_step" parts expect an object with a "finishReason" property.'
      );
    }
    const result = {
      finishReason: value.finishReason,
      isContinued: false
    };
    if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
      result.usage = {
        promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
        completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
      };
    }
    if ("isContinued" in value && typeof value.isContinued === "boolean") {
      result.isContinued = value.isContinued;
    }
    return {
      type: "finish_step",
      value: result
    };
  }
};
var startStepStreamPart = {
  code: "f",
  name: "start_step",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("messageId" in value) || typeof value.messageId !== "string") {
      throw new Error(
        '"start_step" parts expect an object with an "id" property.'
      );
    }
    return {
      type: "start_step",
      value: {
        messageId: value.messageId
      }
    };
  }
};
var reasoningStreamPart = {
  code: "g",
  name: "reasoning",
  parse: (value) => {
    if (typeof value !== "string") {
      throw new Error('"reasoning" parts expect a string value.');
    }
    return { type: "reasoning", value };
  }
};
var sourcePart = {
  code: "h",
  name: "source",
  parse: (value) => {
    if (value == null || typeof value !== "object") {
      throw new Error('"source" parts expect a Source object.');
    }
    return {
      type: "source",
      value
    };
  }
};
var redactedReasoningStreamPart = {
  code: "i",
  name: "redacted_reasoning",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("data" in value) || typeof value.data !== "string") {
      throw new Error(
        '"redacted_reasoning" parts expect an object with a "data" property.'
      );
    }
    return { type: "redacted_reasoning", value: { data: value.data } };
  }
};
var reasoningSignatureStreamPart = {
  code: "j",
  name: "reasoning_signature",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("signature" in value) || typeof value.signature !== "string") {
      throw new Error(
        '"reasoning_signature" parts expect an object with a "signature" property.'
      );
    }
    return {
      type: "reasoning_signature",
      value: { signature: value.signature }
    };
  }
};
var fileStreamPart = {
  code: "k",
  name: "file",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("data" in value) || typeof value.data !== "string" || !("mimeType" in value) || typeof value.mimeType !== "string") {
      throw new Error(
        '"file" parts expect an object with a "data" and "mimeType" property.'
      );
    }
    return { type: "file", value };
  }
};
var dataStreamParts = [
  textStreamPart2,
  dataStreamPart,
  errorStreamPart2,
  messageAnnotationsStreamPart,
  toolCallStreamPart,
  toolResultStreamPart,
  toolCallStreamingStartStreamPart,
  toolCallDeltaStreamPart,
  finishMessageStreamPart,
  finishStepStreamPart,
  startStepStreamPart,
  reasoningStreamPart,
  sourcePart,
  redactedReasoningStreamPart,
  reasoningSignatureStreamPart,
  fileStreamPart
];
Object.fromEntries(
  dataStreamParts.map((part) => [part.code, part])
);
Object.fromEntries(
  dataStreamParts.map((part) => [part.name, part.code])
);
function formatDataStreamPart(type, value) {
  const streamPart = dataStreamParts.find((part) => part.name === type);
  if (!streamPart) {
    throw new Error(`Invalid stream part type: ${type}`);
  }
  return `${streamPart.code}:${JSON.stringify(value)}
`;
}
function zodSchema$1(zodSchema2, options) {
  var _a;
  const useReferences = (_a = void 0 ) != null ? _a : false;
  return jsonSchema$1(
    zodToJsonSchema$2(zodSchema2, {
      $refStrategy: useReferences ? "root" : "none",
      target: "jsonSchema7"
      // note: openai mode breaks various gemini conversions
    }),
    {
      validate: (value) => {
        const result = zodSchema2.safeParse(value);
        return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
      }
    }
  );
}

// src/schema.ts
var schemaSymbol$1 = Symbol.for("vercel.ai.schema");
function jsonSchema$1(jsonSchema2, {
  validate
} = {}) {
  return {
    [schemaSymbol$1]: true,
    _type: void 0,
    // should never be used directly
    [validatorSymbol$1]: true,
    jsonSchema: jsonSchema2,
    validate
  };
}
function isSchema$1(value) {
  return typeof value === "object" && value !== null && schemaSymbol$1 in value && value[schemaSymbol$1] === true && "jsonSchema" in value && "validate" in value;
}
function asSchema$1(schema) {
  return isSchema$1(schema) ? schema : zodSchema$1(schema);
}

var __defProp$1 = Object.defineProperty;
var __export$1 = (target, all) => {
  for (var name17 in all)
    __defProp$1(target, name17, { get: all[name17], enumerable: true });
};

// core/util/prepare-response-headers.ts
function prepareResponseHeaders(headers, {
  contentType,
  dataStreamVersion
}) {
  const responseHeaders = new Headers(headers != null ? headers : {});
  if (!responseHeaders.has("Content-Type")) {
    responseHeaders.set("Content-Type", contentType);
  }
  {
    responseHeaders.set("X-Vercel-AI-Data-Stream", dataStreamVersion);
  }
  return responseHeaders;
}
var UnsupportedModelVersionError$1 = class UnsupportedModelVersionError extends AISDKError$3 {
  constructor() {
    super({
      name: "AI_UnsupportedModelVersionError",
      message: `Unsupported model version. AI SDK 4 only supports models that implement specification version "v1". Please upgrade to AI SDK 5 to use this model.`
    });
  }
};
var name$4 = "AI_InvalidArgumentError";
var marker$4 = `vercel.ai.error.${name$4}`;
var symbol$4 = Symbol.for(marker$4);
var _a$4;
var InvalidArgumentError$2 = class InvalidArgumentError extends AISDKError$3 {
  constructor({
    parameter,
    value,
    message
  }) {
    super({
      name: name$4,
      message: `Invalid argument for parameter ${parameter}: ${message}`
    });
    this[_a$4] = true;
    this.parameter = parameter;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError$3.hasMarker(error, marker$4);
  }
};
_a$4 = symbol$4;
var name2$3 = "AI_RetryError";
var marker2$5 = `vercel.ai.error.${name2$3}`;
var symbol2$5 = Symbol.for(marker2$5);
var _a2$5;
var RetryError$1 = class RetryError extends AISDKError$3 {
  constructor({
    message,
    reason,
    errors
  }) {
    super({ name: name2$3, message });
    this[_a2$5] = true;
    this.reason = reason;
    this.errors = errors;
    this.lastError = errors[errors.length - 1];
  }
  static isInstance(error) {
    return AISDKError$3.hasMarker(error, marker2$5);
  }
};
_a2$5 = symbol2$5;

// util/retry-with-exponential-backoff.ts
var retryWithExponentialBackoff = ({
  maxRetries = 2,
  initialDelayInMs = 2e3,
  backoffFactor = 2
} = {}) => async (f) => _retryWithExponentialBackoff$1(f, {
  maxRetries,
  delayInMs: initialDelayInMs,
  backoffFactor
});
async function _retryWithExponentialBackoff$1(f, {
  maxRetries,
  delayInMs,
  backoffFactor
}, errors = []) {
  try {
    return await f();
  } catch (error) {
    if (isAbortError$1(error)) {
      throw error;
    }
    if (maxRetries === 0) {
      throw error;
    }
    const errorMessage = getErrorMessage$2(error);
    const newErrors = [...errors, error];
    const tryNumber = newErrors.length;
    if (tryNumber > maxRetries) {
      throw new RetryError$1({
        message: `Failed after ${tryNumber} attempts. Last error: ${errorMessage}`,
        reason: "maxRetriesExceeded",
        errors: newErrors
      });
    }
    if (error instanceof Error && APICallError$3.isInstance(error) && error.isRetryable === true && tryNumber <= maxRetries) {
      await delay$1(delayInMs);
      return _retryWithExponentialBackoff$1(
        f,
        { maxRetries, delayInMs: backoffFactor * delayInMs, backoffFactor },
        newErrors
      );
    }
    if (tryNumber === 1) {
      throw error;
    }
    throw new RetryError$1({
      message: `Failed after ${tryNumber} attempts with non-retryable error: '${errorMessage}'`,
      reason: "errorNotRetryable",
      errors: newErrors
    });
  }
}

// core/prompt/prepare-retries.ts
function prepareRetries$1({
  maxRetries
}) {
  if (maxRetries != null) {
    if (!Number.isInteger(maxRetries)) {
      throw new InvalidArgumentError$2({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be an integer"
      });
    }
    if (maxRetries < 0) {
      throw new InvalidArgumentError$2({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be >= 0"
      });
    }
  }
  const maxRetriesResult = maxRetries != null ? maxRetries : 2;
  return {
    maxRetries: maxRetriesResult,
    retry: retryWithExponentialBackoff({ maxRetries: maxRetriesResult })
  };
}

// core/telemetry/assemble-operation-name.ts
function assembleOperationName$1({
  operationId,
  telemetry
}) {
  return {
    // standardized operation and resource name:
    "operation.name": `${operationId}${(telemetry == null ? void 0 : telemetry.functionId) != null ? ` ${telemetry.functionId}` : ""}`,
    "resource.name": telemetry == null ? void 0 : telemetry.functionId,
    // detailed, AI SDK specific data:
    "ai.operationId": operationId,
    "ai.telemetry.functionId": telemetry == null ? void 0 : telemetry.functionId
  };
}

// core/telemetry/get-base-telemetry-attributes.ts
function getBaseTelemetryAttributes$1({
  model,
  settings,
  telemetry,
  headers
}) {
  var _a17;
  return {
    "ai.model.provider": model.provider,
    "ai.model.id": model.modelId,
    // settings:
    ...Object.entries(settings).reduce((attributes, [key, value]) => {
      attributes[`ai.settings.${key}`] = value;
      return attributes;
    }, {}),
    // add metadata as attributes:
    ...Object.entries((_a17 = telemetry == null ? void 0 : telemetry.metadata) != null ? _a17 : {}).reduce(
      (attributes, [key, value]) => {
        attributes[`ai.telemetry.metadata.${key}`] = value;
        return attributes;
      },
      {}
    ),
    // request headers
    ...Object.entries(headers != null ? headers : {}).reduce((attributes, [key, value]) => {
      if (value !== void 0) {
        attributes[`ai.request.headers.${key}`] = value;
      }
      return attributes;
    }, {})
  };
}

// core/telemetry/noop-tracer.ts
var noopTracer$1 = {
  startSpan() {
    return noopSpan$1;
  },
  startActiveSpan(name17, arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
      return arg1(noopSpan$1);
    }
    if (typeof arg2 === "function") {
      return arg2(noopSpan$1);
    }
    if (typeof arg3 === "function") {
      return arg3(noopSpan$1);
    }
  }
};
var noopSpan$1 = {
  spanContext() {
    return noopSpanContext$1;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return false;
  },
  recordException() {
    return this;
  }
};
var noopSpanContext$1 = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};

// core/telemetry/get-tracer.ts
function getTracer$1({
  isEnabled = false,
  tracer
} = {}) {
  if (!isEnabled) {
    return noopTracer$1;
  }
  if (tracer) {
    return tracer;
  }
  return trace.getTracer("ai");
}
function recordSpan$1({
  name: name17,
  tracer,
  attributes,
  fn,
  endWhenDone = true
}) {
  return tracer.startActiveSpan(name17, { attributes }, async (span) => {
    try {
      const result = await fn(span);
      if (endWhenDone) {
        span.end();
      }
      return result;
    } catch (error) {
      try {
        recordErrorOnSpan$1(span, error);
      } finally {
        span.end();
      }
      throw error;
    }
  });
}
function recordErrorOnSpan$1(span, error) {
  if (error instanceof Error) {
    span.recordException({
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
  } else {
    span.setStatus({ code: SpanStatusCode.ERROR });
  }
}

// core/telemetry/select-telemetry-attributes.ts
function selectTelemetryAttributes$1({
  telemetry,
  attributes
}) {
  if ((telemetry == null ? void 0 : telemetry.isEnabled) !== true) {
    return {};
  }
  return Object.entries(attributes).reduce((attributes2, [key, value]) => {
    if (value === void 0) {
      return attributes2;
    }
    if (typeof value === "object" && "input" in value && typeof value.input === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordInputs) === false) {
        return attributes2;
      }
      const result = value.input();
      return result === void 0 ? attributes2 : { ...attributes2, [key]: result };
    }
    if (typeof value === "object" && "output" in value && typeof value.output === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordOutputs) === false) {
        return attributes2;
      }
      const result = value.output();
      return result === void 0 ? attributes2 : { ...attributes2, [key]: result };
    }
    return { ...attributes2, [key]: value };
  }, {});
}

// core/util/split-array.ts
function splitArray$1(array, chunkSize) {
  if (chunkSize <= 0) {
    throw new Error("chunkSize must be greater than 0");
  }
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// core/embed/embed-many.ts
async function embedMany$1({
  model,
  values,
  maxRetries: maxRetriesArg,
  abortSignal,
  headers,
  experimental_telemetry: telemetry
}) {
  if (typeof model === "string" || model.specificationVersion !== "v1") {
    throw new UnsupportedModelVersionError$1();
  }
  const { maxRetries, retry } = prepareRetries$1({ maxRetries: maxRetriesArg });
  const baseTelemetryAttributes = getBaseTelemetryAttributes$1({
    model,
    telemetry,
    headers,
    settings: { maxRetries }
  });
  const tracer = getTracer$1(telemetry);
  return recordSpan$1({
    name: "ai.embedMany",
    attributes: selectTelemetryAttributes$1({
      telemetry,
      attributes: {
        ...assembleOperationName$1({ operationId: "ai.embedMany", telemetry }),
        ...baseTelemetryAttributes,
        // specific settings that only make sense on the outer level:
        "ai.values": {
          input: () => values.map((value) => JSON.stringify(value))
        }
      }
    }),
    tracer,
    fn: async (span) => {
      const maxEmbeddingsPerCall = model.maxEmbeddingsPerCall;
      if (maxEmbeddingsPerCall == null) {
        const { embeddings: embeddings2, usage } = await retry(() => {
          return recordSpan$1({
            name: "ai.embedMany.doEmbed",
            attributes: selectTelemetryAttributes$1({
              telemetry,
              attributes: {
                ...assembleOperationName$1({
                  operationId: "ai.embedMany.doEmbed",
                  telemetry
                }),
                ...baseTelemetryAttributes,
                // specific settings that only make sense on the outer level:
                "ai.values": {
                  input: () => values.map((value) => JSON.stringify(value))
                }
              }
            }),
            tracer,
            fn: async (doEmbedSpan) => {
              var _a17;
              const modelResponse = await model.doEmbed({
                values,
                abortSignal,
                headers
              });
              const embeddings3 = modelResponse.embeddings;
              const usage2 = (_a17 = modelResponse.usage) != null ? _a17 : { tokens: NaN };
              doEmbedSpan.setAttributes(
                selectTelemetryAttributes$1({
                  telemetry,
                  attributes: {
                    "ai.embeddings": {
                      output: () => embeddings3.map((embedding) => JSON.stringify(embedding))
                    },
                    "ai.usage.tokens": usage2.tokens
                  }
                })
              );
              return { embeddings: embeddings3, usage: usage2 };
            }
          });
        });
        span.setAttributes(
          selectTelemetryAttributes$1({
            telemetry,
            attributes: {
              "ai.embeddings": {
                output: () => embeddings2.map((embedding) => JSON.stringify(embedding))
              },
              "ai.usage.tokens": usage.tokens
            }
          })
        );
        return new DefaultEmbedManyResult$1({ values, embeddings: embeddings2, usage });
      }
      const valueChunks = splitArray$1(values, maxEmbeddingsPerCall);
      const embeddings = [];
      let tokens = 0;
      for (const chunk of valueChunks) {
        const { embeddings: responseEmbeddings, usage } = await retry(() => {
          return recordSpan$1({
            name: "ai.embedMany.doEmbed",
            attributes: selectTelemetryAttributes$1({
              telemetry,
              attributes: {
                ...assembleOperationName$1({
                  operationId: "ai.embedMany.doEmbed",
                  telemetry
                }),
                ...baseTelemetryAttributes,
                // specific settings that only make sense on the outer level:
                "ai.values": {
                  input: () => chunk.map((value) => JSON.stringify(value))
                }
              }
            }),
            tracer,
            fn: async (doEmbedSpan) => {
              var _a17;
              const modelResponse = await model.doEmbed({
                values: chunk,
                abortSignal,
                headers
              });
              const embeddings2 = modelResponse.embeddings;
              const usage2 = (_a17 = modelResponse.usage) != null ? _a17 : { tokens: NaN };
              doEmbedSpan.setAttributes(
                selectTelemetryAttributes$1({
                  telemetry,
                  attributes: {
                    "ai.embeddings": {
                      output: () => embeddings2.map((embedding) => JSON.stringify(embedding))
                    },
                    "ai.usage.tokens": usage2.tokens
                  }
                })
              );
              return { embeddings: embeddings2, usage: usage2 };
            }
          });
        });
        embeddings.push(...responseEmbeddings);
        tokens += usage.tokens;
      }
      span.setAttributes(
        selectTelemetryAttributes$1({
          telemetry,
          attributes: {
            "ai.embeddings": {
              output: () => embeddings.map((embedding) => JSON.stringify(embedding))
            },
            "ai.usage.tokens": tokens
          }
        })
      );
      return new DefaultEmbedManyResult$1({
        values,
        embeddings,
        usage: { tokens }
      });
    }
  });
}
var DefaultEmbedManyResult$1 = class DefaultEmbedManyResult {
  constructor(options) {
    this.values = options.values;
    this.embeddings = options.embeddings;
    this.usage = options.usage;
  }
};
var name4$1 = "AI_NoObjectGeneratedError";
var marker4$2 = `vercel.ai.error.${name4$1}`;
var symbol4$2 = Symbol.for(marker4$2);
var _a4$2;
var NoObjectGeneratedError$1 = class NoObjectGeneratedError extends AISDKError$3 {
  constructor({
    message = "No object generated.",
    cause,
    text: text2,
    response,
    usage,
    finishReason
  }) {
    super({ name: name4$1, message, cause });
    this[_a4$2] = true;
    this.text = text2;
    this.response = response;
    this.usage = usage;
    this.finishReason = finishReason;
  }
  static isInstance(error) {
    return AISDKError$3.hasMarker(error, marker4$2);
  }
};
_a4$2 = symbol4$2;
var dataContentSchema$1 = union([
  string(),
  _instanceof(Uint8Array),
  _instanceof(ArrayBuffer),
  custom(
    // Buffer might not be available in some environments such as CloudFlare:
    (value) => {
      var _a17, _b;
      return (_b = (_a17 = globalThis.Buffer) == null ? void 0 : _a17.isBuffer(value)) != null ? _b : false;
    },
    { message: "Must be a Buffer" }
  )
]);
var jsonValueSchema$1 = lazy(
  () => union([
    _null(),
    string(),
    number(),
    boolean(),
    record(string(), jsonValueSchema$1),
    array(jsonValueSchema$1)
  ])
);

// core/types/provider-metadata.ts
var providerMetadataSchema$1 = record(
  string(),
  record(string(), jsonValueSchema$1)
);
var toolResultContentSchema = array(
  union([
    object$2({ type: literal("text"), text: string() }),
    object$2({
      type: literal("image"),
      data: string(),
      mimeType: string().optional()
    })
  ])
);

// core/prompt/content-part.ts
var textPartSchema$1 = object$2({
  type: literal("text"),
  text: string(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var imagePartSchema$1 = object$2({
  type: literal("image"),
  image: union([dataContentSchema$1, _instanceof(URL)]),
  mimeType: string().optional(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var filePartSchema$1 = object$2({
  type: literal("file"),
  data: union([dataContentSchema$1, _instanceof(URL)]),
  filename: string().optional(),
  mimeType: string(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var reasoningPartSchema$1 = object$2({
  type: literal("reasoning"),
  text: string(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var redactedReasoningPartSchema = object$2({
  type: literal("redacted-reasoning"),
  data: string(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var toolCallPartSchema$1 = object$2({
  type: literal("tool-call"),
  toolCallId: string(),
  toolName: string(),
  args: unknown(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var toolResultPartSchema$1 = object$2({
  type: literal("tool-result"),
  toolCallId: string(),
  toolName: string(),
  result: unknown(),
  content: toolResultContentSchema.optional(),
  isError: boolean().optional(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});

// core/prompt/message.ts
var coreSystemMessageSchema = object$2({
  role: literal("system"),
  content: string(),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var coreUserMessageSchema = object$2({
  role: literal("user"),
  content: union([
    string(),
    array(union([textPartSchema$1, imagePartSchema$1, filePartSchema$1]))
  ]),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var coreAssistantMessageSchema = object$2({
  role: literal("assistant"),
  content: union([
    string(),
    array(
      union([
        textPartSchema$1,
        filePartSchema$1,
        reasoningPartSchema$1,
        redactedReasoningPartSchema,
        toolCallPartSchema$1
      ])
    )
  ]),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
var coreToolMessageSchema = object$2({
  role: literal("tool"),
  content: array(toolResultPartSchema$1),
  providerOptions: providerMetadataSchema$1.optional(),
  experimental_providerMetadata: providerMetadataSchema$1.optional()
});
union([
  coreSystemMessageSchema,
  coreUserMessageSchema,
  coreAssistantMessageSchema,
  coreToolMessageSchema
]);

// core/generate-object/inject-json-instruction.ts
var DEFAULT_SCHEMA_PREFIX = "JSON schema:";
var DEFAULT_SCHEMA_SUFFIX = "You MUST answer with a JSON object that matches the JSON schema above.";
var DEFAULT_GENERIC_SUFFIX = "You MUST answer with JSON.";
function injectJsonInstruction({
  prompt,
  schema,
  schemaPrefix = schema != null ? DEFAULT_SCHEMA_PREFIX : void 0,
  schemaSuffix = schema != null ? DEFAULT_SCHEMA_SUFFIX : DEFAULT_GENERIC_SUFFIX
}) {
  return [
    prompt != null && prompt.length > 0 ? prompt : void 0,
    prompt != null && prompt.length > 0 ? "" : void 0,
    // add a newline if prompt is not null
    schemaPrefix,
    schema != null ? JSON.stringify(schema) : void 0,
    schemaSuffix
  ].filter((line) => line != null).join("\n");
}

// core/generate-object/generate-object.ts
createIdGenerator$1({ prefix: "aiobj", size: 24 });

// core/generate-object/stream-object.ts
createIdGenerator$1({ prefix: "aiobj", size: 24 });

// core/generate-text/generate-text.ts
createIdGenerator$1({
  prefix: "aitxt",
  size: 24
});
createIdGenerator$1({
  prefix: "msg",
  size: 24
});

// core/generate-text/output.ts
var output_exports$1 = {};
__export$1(output_exports$1, {
  object: () => object$1,
  text: () => text$1
});

// core/generate-text/output.ts
var text$1 = () => ({
  type: "text",
  responseFormat: () => ({ type: "text" }),
  injectIntoSystemPrompt({ system }) {
    return system;
  },
  parsePartial({ text: text2 }) {
    return { partial: text2 };
  },
  parseOutput({ text: text2 }) {
    return text2;
  }
});
var object$1 = ({
  schema: inputSchema
}) => {
  const schema = asSchema$1(inputSchema);
  return {
    type: "object",
    responseFormat: ({ model }) => ({
      type: "json",
      schema: model.supportsStructuredOutputs ? schema.jsonSchema : void 0
    }),
    injectIntoSystemPrompt({ system, model }) {
      return model.supportsStructuredOutputs ? system : injectJsonInstruction({
        prompt: system,
        schema: schema.jsonSchema
      });
    },
    parsePartial({ text: text2 }) {
      const result = parsePartialJson$1(text2);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input":
          return void 0;
        case "repaired-parse":
        case "successful-parse":
          return {
            // Note: currently no validation of partial results:
            partial: result.value
          };
        default: {
          const _exhaustiveCheck = result.state;
          throw new Error(`Unsupported parse state: ${_exhaustiveCheck}`);
        }
      }
    },
    parseOutput({ text: text2 }, context) {
      const parseResult = safeParseJSON$1({ text: text2 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError$1({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text2,
          response: context.response,
          usage: context.usage,
          finishReason: context.finishReason
        });
      }
      const validationResult = safeValidateTypes$1({
        value: parseResult.value,
        schema
      });
      if (!validationResult.success) {
        throw new NoObjectGeneratedError$1({
          message: "No object generated: response did not match schema.",
          cause: validationResult.error,
          text: text2,
          response: context.response,
          usage: context.usage,
          finishReason: context.finishReason
        });
      }
      return validationResult.value;
    }
  };
};

// core/util/merge-streams.ts
function mergeStreams(stream1, stream2) {
  const reader1 = stream1.getReader();
  const reader2 = stream2.getReader();
  let lastRead1 = void 0;
  let lastRead2 = void 0;
  let stream1Done = false;
  let stream2Done = false;
  async function readStream1(controller) {
    try {
      if (lastRead1 == null) {
        lastRead1 = reader1.read();
      }
      const result = await lastRead1;
      lastRead1 = void 0;
      if (!result.done) {
        controller.enqueue(result.value);
      } else {
        controller.close();
      }
    } catch (error) {
      controller.error(error);
    }
  }
  async function readStream2(controller) {
    try {
      if (lastRead2 == null) {
        lastRead2 = reader2.read();
      }
      const result = await lastRead2;
      lastRead2 = void 0;
      if (!result.done) {
        controller.enqueue(result.value);
      } else {
        controller.close();
      }
    } catch (error) {
      controller.error(error);
    }
  }
  return new ReadableStream({
    async pull(controller) {
      try {
        if (stream1Done) {
          await readStream2(controller);
          return;
        }
        if (stream2Done) {
          await readStream1(controller);
          return;
        }
        if (lastRead1 == null) {
          lastRead1 = reader1.read();
        }
        if (lastRead2 == null) {
          lastRead2 = reader2.read();
        }
        const { result, reader } = await Promise.race([
          lastRead1.then((result2) => ({ result: result2, reader: reader1 })),
          lastRead2.then((result2) => ({ result: result2, reader: reader2 }))
        ]);
        if (!result.done) {
          controller.enqueue(result.value);
        }
        if (reader === reader1) {
          lastRead1 = void 0;
          if (result.done) {
            await readStream2(controller);
            stream1Done = true;
          }
        } else {
          lastRead2 = void 0;
          if (result.done) {
            stream2Done = true;
            await readStream1(controller);
          }
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      reader1.cancel();
      reader2.cancel();
    }
  });
}

// core/generate-text/stream-text.ts
createIdGenerator$1({
  prefix: "aitxt",
  size: 24
});
createIdGenerator$1({
  prefix: "msg",
  size: 24
});
var ClientOrServerImplementationSchema$1 = object$2({
  name: string(),
  version: string()
}).passthrough();
var BaseParamsSchema$1 = object$2({
  _meta: optional(object$2({}).passthrough())
}).passthrough();
var ResultSchema$1 = BaseParamsSchema$1;
var RequestSchema$1 = object$2({
  method: string(),
  params: optional(BaseParamsSchema$1)
});
var ServerCapabilitiesSchema$1 = object$2({
  experimental: optional(object$2({}).passthrough()),
  logging: optional(object$2({}).passthrough()),
  prompts: optional(
    object$2({
      listChanged: optional(boolean())
    }).passthrough()
  ),
  resources: optional(
    object$2({
      subscribe: optional(boolean()),
      listChanged: optional(boolean())
    }).passthrough()
  ),
  tools: optional(
    object$2({
      listChanged: optional(boolean())
    }).passthrough()
  )
}).passthrough();
ResultSchema$1.extend({
  protocolVersion: string(),
  capabilities: ServerCapabilitiesSchema$1,
  serverInfo: ClientOrServerImplementationSchema$1,
  instructions: optional(string())
});
var PaginatedResultSchema$1 = ResultSchema$1.extend({
  nextCursor: optional(string())
});
var ToolSchema$1 = object$2({
  name: string(),
  description: optional(string()),
  inputSchema: object$2({
    type: literal("object"),
    properties: optional(object$2({}).passthrough())
  }).passthrough()
}).passthrough();
PaginatedResultSchema$1.extend({
  tools: array(ToolSchema$1)
});
var TextContentSchema$1 = object$2({
  type: literal("text"),
  text: string()
}).passthrough();
var ImageContentSchema$1 = object$2({
  type: literal("image"),
  data: string().base64(),
  mimeType: string()
}).passthrough();
var ResourceContentsSchema$1 = object$2({
  /**
   * The URI of this resource.
   */
  uri: string(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: optional(string())
}).passthrough();
var TextResourceContentsSchema$1 = ResourceContentsSchema$1.extend({
  text: string()
});
var BlobResourceContentsSchema$1 = ResourceContentsSchema$1.extend({
  blob: string().base64()
});
var EmbeddedResourceSchema$1 = object$2({
  type: literal("resource"),
  resource: union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1])
}).passthrough();
ResultSchema$1.extend({
  content: array(
    union([TextContentSchema$1, ImageContentSchema$1, EmbeddedResourceSchema$1])
  ),
  isError: boolean().default(false).optional()
}).or(
  ResultSchema$1.extend({
    toolResult: unknown()
  })
);

// core/tool/mcp/json-rpc-message.ts
var JSONRPC_VERSION$1 = "2.0";
var JSONRPCRequestSchema$1 = object$2({
  jsonrpc: literal(JSONRPC_VERSION$1),
  id: union([string(), number().int()])
}).merge(RequestSchema$1).strict();
var JSONRPCResponseSchema$1 = object$2({
  jsonrpc: literal(JSONRPC_VERSION$1),
  id: union([string(), number().int()]),
  result: ResultSchema$1
}).strict();
var JSONRPCErrorSchema$1 = object$2({
  jsonrpc: literal(JSONRPC_VERSION$1),
  id: union([string(), number().int()]),
  error: object$2({
    code: number().int(),
    message: string(),
    data: optional(unknown())
  })
}).strict();
var JSONRPCNotificationSchema$1 = object$2({
  jsonrpc: literal(JSONRPC_VERSION$1)
}).merge(
  object$2({
    method: string(),
    params: optional(BaseParamsSchema$1)
  })
).strict();
union([
  JSONRPCRequestSchema$1,
  JSONRPCNotificationSchema$1,
  JSONRPCResponseSchema$1,
  JSONRPCErrorSchema$1
]);

// streams/langchain-adapter.ts
var langchain_adapter_exports = {};
__export$1(langchain_adapter_exports, {
  mergeIntoDataStream: () => mergeIntoDataStream,
  toDataStream: () => toDataStream,
  toDataStreamResponse: () => toDataStreamResponse
});

// streams/stream-callbacks.ts
function createCallbacksTransformer(callbacks = {}) {
  const textEncoder = new TextEncoder();
  let aggregatedResponse = "";
  return new TransformStream({
    async start() {
      if (callbacks.onStart)
        await callbacks.onStart();
    },
    async transform(message, controller) {
      controller.enqueue(textEncoder.encode(message));
      aggregatedResponse += message;
      if (callbacks.onToken)
        await callbacks.onToken(message);
      if (callbacks.onText && typeof message === "string") {
        await callbacks.onText(message);
      }
    },
    async flush() {
      if (callbacks.onCompletion) {
        await callbacks.onCompletion(aggregatedResponse);
      }
      if (callbacks.onFinal) {
        await callbacks.onFinal(aggregatedResponse);
      }
    }
  });
}

// streams/langchain-adapter.ts
function toDataStreamInternal(stream, callbacks) {
  return stream.pipeThrough(
    new TransformStream({
      transform: async (value, controller) => {
        var _a17;
        if (typeof value === "string") {
          controller.enqueue(value);
          return;
        }
        if ("event" in value) {
          if (value.event === "on_chat_model_stream") {
            forwardAIMessageChunk(
              (_a17 = value.data) == null ? void 0 : _a17.chunk,
              controller
            );
          }
          return;
        }
        forwardAIMessageChunk(value, controller);
      }
    })
  ).pipeThrough(createCallbacksTransformer(callbacks)).pipeThrough(new TextDecoderStream()).pipeThrough(
    new TransformStream({
      transform: async (chunk, controller) => {
        controller.enqueue(formatDataStreamPart("text", chunk));
      }
    })
  );
}
function toDataStream(stream, callbacks) {
  return toDataStreamInternal(stream, callbacks).pipeThrough(
    new TextEncoderStream()
  );
}
function toDataStreamResponse(stream, options) {
  var _a17;
  const dataStream = toDataStreamInternal(
    stream,
    options == null ? void 0 : options.callbacks
  ).pipeThrough(new TextEncoderStream());
  const data = options == null ? void 0 : options.data;
  const init = options == null ? void 0 : options.init;
  const responseStream = data ? mergeStreams(data.stream, dataStream) : dataStream;
  return new Response(responseStream, {
    status: (_a17 = init == null ? void 0 : init.status) != null ? _a17 : 200,
    statusText: init == null ? void 0 : init.statusText,
    headers: prepareResponseHeaders(init == null ? void 0 : init.headers, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
function mergeIntoDataStream(stream, options) {
  options.dataStream.merge(toDataStreamInternal(stream, options.callbacks));
}
function forwardAIMessageChunk(chunk, controller) {
  if (typeof chunk.content === "string") {
    controller.enqueue(chunk.content);
  } else {
    const content = chunk.content;
    for (const item of content) {
      if (item.type === "text") {
        controller.enqueue(item.text);
      }
    }
  }
}

// streams/llamaindex-adapter.ts
var llamaindex_adapter_exports = {};
__export$1(llamaindex_adapter_exports, {
  mergeIntoDataStream: () => mergeIntoDataStream2,
  toDataStream: () => toDataStream2,
  toDataStreamResponse: () => toDataStreamResponse2
});
function toDataStreamInternal2(stream, callbacks) {
  const trimStart = trimStartOfStream();
  return convertAsyncIteratorToReadableStream(stream[Symbol.asyncIterator]()).pipeThrough(
    new TransformStream({
      async transform(message, controller) {
        controller.enqueue(trimStart(message.delta));
      }
    })
  ).pipeThrough(createCallbacksTransformer(callbacks)).pipeThrough(new TextDecoderStream()).pipeThrough(
    new TransformStream({
      transform: async (chunk, controller) => {
        controller.enqueue(formatDataStreamPart("text", chunk));
      }
    })
  );
}
function toDataStream2(stream, callbacks) {
  return toDataStreamInternal2(stream, callbacks).pipeThrough(
    new TextEncoderStream()
  );
}
function toDataStreamResponse2(stream, options = {}) {
  var _a17;
  const { init, data, callbacks } = options;
  const dataStream = toDataStreamInternal2(stream, callbacks).pipeThrough(
    new TextEncoderStream()
  );
  const responseStream = data ? mergeStreams(data.stream, dataStream) : dataStream;
  return new Response(responseStream, {
    status: (_a17 = init == null ? void 0 : init.status) != null ? _a17 : 200,
    statusText: init == null ? void 0 : init.statusText,
    headers: prepareResponseHeaders(init == null ? void 0 : init.headers, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
function mergeIntoDataStream2(stream, options) {
  options.dataStream.merge(toDataStreamInternal2(stream, options.callbacks));
}
function trimStartOfStream() {
  let isStreamStart = true;
  return (text2) => {
    if (isStreamStart) {
      text2 = text2.trimStart();
      if (text2)
        isStreamStart = false;
    }
    return text2;
  };
}

// src/errors/ai-sdk-error.ts
var marker$3 = "vercel.ai.error";
var symbol$3 = Symbol.for(marker$3);
var _a$3;
var _AISDKError$2 = class _AISDKError extends Error {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name14,
    message,
    cause
  }) {
    super(message);
    this[_a$3] = true;
    this.name = name14;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError.hasMarker(error, marker$3);
  }
  static hasMarker(error, marker15) {
    const markerSymbol = Symbol.for(marker15);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
_a$3 = symbol$3;
var AISDKError$2 = _AISDKError$2;

// src/errors/api-call-error.ts
var name$3 = "AI_APICallError";
var marker2$4 = `vercel.ai.error.${name$3}`;
var symbol2$4 = Symbol.for(marker2$4);
var _a2$4;
var APICallError$2 = class APICallError extends AISDKError$2 {
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name: name$3, message, cause });
    this[_a2$4] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError$2.hasMarker(error, marker2$4);
  }
};
_a2$4 = symbol2$4;

// src/errors/no-such-model-error.ts
var name10 = "AI_NoSuchModelError";
var marker11 = `vercel.ai.error.${name10}`;
var symbol11 = Symbol.for(marker11);
var _a11;
var NoSuchModelError = class extends AISDKError$2 {
  constructor({
    errorName = name10,
    modelId,
    modelType,
    message = `No such ${modelType}: ${modelId}`
  }) {
    super({ name: errorName, message });
    this[_a11] = true;
    this.modelId = modelId;
    this.modelType = modelType;
  }
  static isInstance(error) {
    return AISDKError$2.hasMarker(error, marker11);
  }
};
_a11 = symbol11;

// src/errors/ai-sdk-error.ts
var marker$2 = "vercel.ai.error";
var symbol$2 = Symbol.for(marker$2);
var _a$2;
var _AISDKError$1 = class _AISDKError extends Error {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name14,
    message,
    cause
  }) {
    super(message);
    this[_a$2] = true;
    this.name = name14;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError.hasMarker(error, marker$2);
  }
  static hasMarker(error, marker15) {
    const markerSymbol = Symbol.for(marker15);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
_a$2 = symbol$2;
var AISDKError$1 = _AISDKError$1;

// src/errors/api-call-error.ts
var name$2 = "AI_APICallError";
var marker2$3 = `vercel.ai.error.${name$2}`;
var symbol2$3 = Symbol.for(marker2$3);
var _a2$3;
var APICallError$1 = class APICallError extends AISDKError$1 {
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name: name$2, message, cause });
    this[_a2$3] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError$1.hasMarker(error, marker2$3);
  }
};
_a2$3 = symbol2$3;

// src/errors/empty-response-body-error.ts
var name2$2 = "AI_EmptyResponseBodyError";
var marker3$1 = `vercel.ai.error.${name2$2}`;
var symbol3$1 = Symbol.for(marker3$1);
var _a3$1;
var EmptyResponseBodyError = class extends AISDKError$1 {
  // used in isInstance
  constructor({ message = "Empty response body" } = {}) {
    super({ name: name2$2, message });
    this[_a3$1] = true;
  }
  static isInstance(error) {
    return AISDKError$1.hasMarker(error, marker3$1);
  }
};
_a3$1 = symbol3$1;

// src/errors/get-error-message.ts
function getErrorMessage$1(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

// src/errors/invalid-argument-error.ts
var name3$1 = "AI_InvalidArgumentError";
var marker4$1 = `vercel.ai.error.${name3$1}`;
var symbol4$1 = Symbol.for(marker4$1);
var _a4$1;
var InvalidArgumentError$1 = class InvalidArgumentError extends AISDKError$1 {
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name3$1, message, cause });
    this[_a4$1] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError$1.hasMarker(error, marker4$1);
  }
};
_a4$1 = symbol4$1;

// src/errors/json-parse-error.ts
var name6$1 = "AI_JSONParseError";
var marker7$2 = `vercel.ai.error.${name6$1}`;
var symbol7$2 = Symbol.for(marker7$2);
var _a7$2;
var JSONParseError = class extends AISDKError$1 {
  constructor({ text, cause }) {
    super({
      name: name6$1,
      message: `JSON parsing failed: Text: ${text}.
Error message: ${getErrorMessage$1(cause)}`,
      cause
    });
    this[_a7$2] = true;
    this.text = text;
  }
  static isInstance(error) {
    return AISDKError$1.hasMarker(error, marker7$2);
  }
};
_a7$2 = symbol7$2;

// src/errors/type-validation-error.ts
var name12 = "AI_TypeValidationError";
var marker13 = `vercel.ai.error.${name12}`;
var symbol13 = Symbol.for(marker13);
var _a13;
var _TypeValidationError = class _TypeValidationError extends AISDKError$1 {
  constructor({ value, cause }) {
    super({
      name: name12,
      message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage$1(cause)}`,
      cause
    });
    this[_a13] = true;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError$1.hasMarker(error, marker13);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause
  }) {
    return _TypeValidationError.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError({ value, cause });
  }
};
_a13 = symbol13;
var TypeValidationError = _TypeValidationError;

// src/combine-headers.ts
function combineHeaders(...headers) {
  return headers.reduce(
    (combinedHeaders, currentHeaders) => ({
      ...combinedHeaders,
      ...currentHeaders != null ? currentHeaders : {}
    }),
    {}
  );
}

// src/delay.ts
async function delay(delayInMs, options) {
  if (delayInMs == null) {
    return Promise.resolve();
  }
  const signal = options == null ? void 0 : options.abortSignal;
  return new Promise((resolve2, reject) => {
    if (signal == null ? void 0 : signal.aborted) {
      reject(createAbortError());
      return;
    }
    const timeoutId = setTimeout(() => {
      cleanup();
      resolve2();
    }, delayInMs);
    const cleanup = () => {
      clearTimeout(timeoutId);
      signal == null ? void 0 : signal.removeEventListener("abort", onAbort);
    };
    const onAbort = () => {
      cleanup();
      reject(createAbortError());
    };
    signal == null ? void 0 : signal.addEventListener("abort", onAbort);
  });
}
function createAbortError() {
  return new DOMException("Delay was aborted", "AbortError");
}

// src/extract-response-headers.ts
function extractResponseHeaders(response) {
  return Object.fromEntries([...response.headers]);
}

// src/get-runtime-environment-user-agent.ts
function getRuntimeEnvironmentUserAgent(globalThisAny = globalThis) {
  var _a, _b, _c;
  if (globalThisAny.window) {
    return `runtime/browser`;
  }
  if ((_a = globalThisAny.navigator) == null ? void 0 : _a.userAgent) {
    return `runtime/${globalThisAny.navigator.userAgent.toLowerCase()}`;
  }
  if ((_c = (_b = globalThisAny.process) == null ? void 0 : _b.versions) == null ? void 0 : _c.node) {
    return `runtime/node.js/${globalThisAny.process.version.substring(0)}`;
  }
  if (globalThisAny.EdgeRuntime) {
    return `runtime/vercel-edge`;
  }
  return "runtime/unknown";
}

// src/remove-undefined-entries.ts
function removeUndefinedEntries(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([_key, value]) => value != null)
  );
}

// src/with-user-agent-suffix.ts
function withUserAgentSuffix(headers, ...userAgentSuffixParts) {
  const cleanedHeaders = removeUndefinedEntries(
    headers != null ? headers : {}
  );
  const normalizedHeaders = new Headers(cleanedHeaders);
  const currentUserAgentHeader = normalizedHeaders.get("user-agent") || "";
  normalizedHeaders.set(
    "user-agent",
    [currentUserAgentHeader, ...userAgentSuffixParts].filter(Boolean).join(" ")
  );
  return Object.fromEntries(normalizedHeaders);
}
var createIdGenerator = ({
  prefix,
  size = 16,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = () => {
    const alphabetLength = alphabet.length;
    const chars = new Array(size);
    for (let i = 0; i < size; i++) {
      chars[i] = alphabet[Math.random() * alphabetLength | 0];
    }
    return chars.join("");
  };
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError$1({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return () => `${prefix}${separator}${generator()}`;
};
createIdGenerator();

// src/get-error-message.ts
function getErrorMessage(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

// src/is-abort-error.ts
function isAbortError(error) {
  return (error instanceof Error || error instanceof DOMException) && (error.name === "AbortError" || error.name === "ResponseAborted" || // Next.js
  error.name === "TimeoutError");
}

// src/handle-fetch-error.ts
var FETCH_FAILED_ERROR_MESSAGES = ["fetch failed", "failed to fetch"];
function handleFetchError({
  error,
  url,
  requestBodyValues
}) {
  if (isAbortError(error)) {
    return error;
  }
  if (error instanceof TypeError && FETCH_FAILED_ERROR_MESSAGES.includes(error.message.toLowerCase())) {
    const cause = error.cause;
    if (cause != null) {
      return new APICallError$1({
        message: `Cannot connect to API: ${cause.message}`,
        cause,
        url,
        requestBodyValues,
        isRetryable: true
        // retry when network error
      });
    }
  }
  return error;
}

// src/version.ts
var VERSION$2 = "3.0.10" ;

// src/get-from-api.ts
var getOriginalFetch = () => globalThis.fetch;
var getFromApi = async ({
  url,
  headers = {},
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch = getOriginalFetch()
}) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: withUserAgentSuffix(
        headers,
        `ai-sdk/provider-utils/${VERSION$2}`,
        getRuntimeEnvironmentUserAgent()
      ),
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: {}
        });
      } catch (error) {
        if (isAbortError(error) || APICallError$1.isInstance(error)) {
          throw error;
        }
        throw new APICallError$1({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: {}
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: {}
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError(error) || APICallError$1.isInstance(error)) {
          throw error;
        }
      }
      throw new APICallError$1({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: {}
      });
    }
  } catch (error) {
    throw handleFetchError({ error, url, requestBodyValues: {} });
  }
};

// src/load-optional-setting.ts
function loadOptionalSetting({
  settingValue,
  environmentVariableName
}) {
  if (typeof settingValue === "string") {
    return settingValue;
  }
  if (settingValue != null || typeof process === "undefined") {
    return void 0;
  }
  settingValue = process.env[environmentVariableName];
  if (settingValue == null || typeof settingValue !== "string") {
    return void 0;
  }
  return settingValue;
}

// src/secure-json-parse.ts
var suspectProtoRx = /"__proto__"\s*:/;
var suspectConstructorRx = /"constructor"\s*:/;
function _parse(text) {
  const obj = JSON.parse(text);
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
    return obj;
  }
  return filter(obj);
}
function filter(obj) {
  let next = [obj];
  while (next.length) {
    const nodes = next;
    next = [];
    for (const node of nodes) {
      if (Object.prototype.hasOwnProperty.call(node, "__proto__")) {
        throw new SyntaxError("Object contains forbidden prototype property");
      }
      if (Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
        throw new SyntaxError("Object contains forbidden prototype property");
      }
      for (const key in node) {
        const value = node[key];
        if (value && typeof value === "object") {
          next.push(value);
        }
      }
    }
  }
  return obj;
}
function secureJsonParse(text) {
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  try {
    return _parse(text);
  } finally {
    Error.stackTraceLimit = stackTraceLimit;
  }
}
var validatorSymbol = Symbol.for("vercel.ai.validator");
function validator(validate) {
  return { [validatorSymbol]: true, validate };
}
function isValidator(value) {
  return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
}
function asValidator(value) {
  return isValidator(value) ? value : standardSchemaValidator(value);
}
function standardSchemaValidator(standardSchema) {
  return validator(async (value) => {
    const result = await standardSchema["~standard"].validate(value);
    return result.issues == null ? { success: true, value: result.value } : {
      success: false,
      error: new TypeValidationError({
        value,
        cause: result.issues
      })
    };
  });
}

// src/validate-types.ts
async function validateTypes({
  value,
  schema
}) {
  const result = await safeValidateTypes({ value, schema });
  if (!result.success) {
    throw TypeValidationError.wrap({ value, cause: result.error });
  }
  return result.value;
}
async function safeValidateTypes({
  value,
  schema
}) {
  const validator2 = asValidator(schema);
  try {
    if (validator2.validate == null) {
      return { success: true, value, rawValue: value };
    }
    const result = await validator2.validate(value);
    if (result.success) {
      return { success: true, value: result.value, rawValue: value };
    }
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: result.error }),
      rawValue: value
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: error }),
      rawValue: value
    };
  }
}

// src/parse-json.ts
async function parseJSON({
  text,
  schema
}) {
  try {
    const value = secureJsonParse(text);
    if (schema == null) {
      return value;
    }
    return validateTypes({ value, schema });
  } catch (error) {
    if (JSONParseError.isInstance(error) || TypeValidationError.isInstance(error)) {
      throw error;
    }
    throw new JSONParseError({ text, cause: error });
  }
}
async function safeParseJSON({
  text,
  schema
}) {
  try {
    const value = secureJsonParse(text);
    if (schema == null) {
      return { success: true, value, rawValue: value };
    }
    return await safeValidateTypes({ value, schema });
  } catch (error) {
    return {
      success: false,
      error: JSONParseError.isInstance(error) ? error : new JSONParseError({ text, cause: error }),
      rawValue: void 0
    };
  }
}
function parseJsonEventStream({
  stream,
  schema
}) {
  return stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(
    new TransformStream({
      async transform({ data }, controller) {
        if (data === "[DONE]") {
          return;
        }
        controller.enqueue(await safeParseJSON({ text: data, schema }));
      }
    })
  );
}
var getOriginalFetch2 = () => globalThis.fetch;
var postJsonToApi = async ({
  url,
  headers,
  body,
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch
}) => postToApi({
  url,
  headers: {
    "Content-Type": "application/json",
    ...headers
  },
  body: {
    content: JSON.stringify(body),
    values: body
  },
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch
});
var postToApi = async ({
  url,
  headers = {},
  body,
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch = getOriginalFetch2()
}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: withUserAgentSuffix(
        headers,
        `ai-sdk/provider-utils/${VERSION$2}`,
        getRuntimeEnvironmentUserAgent()
      ),
      body: body.content,
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: body.values
        });
      } catch (error) {
        if (isAbortError(error) || APICallError$1.isInstance(error)) {
          throw error;
        }
        throw new APICallError$1({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: body.values
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: body.values
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError(error) || APICallError$1.isInstance(error)) {
          throw error;
        }
      }
      throw new APICallError$1({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: body.values
      });
    }
  } catch (error) {
    throw handleFetchError({ error, url, requestBodyValues: body.values });
  }
};

// src/resolve.ts
async function resolve(value) {
  if (typeof value === "function") {
    value = value();
  }
  return Promise.resolve(value);
}
var createJsonErrorResponseHandler = ({
  errorSchema,
  errorToMessage,
  isRetryable
}) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const responseHeaders = extractResponseHeaders(response);
  if (responseBody.trim() === "") {
    return {
      responseHeaders,
      value: new APICallError$1({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
  try {
    const parsedError = await parseJSON({
      text: responseBody,
      schema: errorSchema
    });
    return {
      responseHeaders,
      value: new APICallError$1({
        message: errorToMessage(parsedError),
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        data: parsedError,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
      })
    };
  } catch (parseError) {
    return {
      responseHeaders,
      value: new APICallError$1({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
};
var createEventSourceResponseHandler = (chunkSchema) => async ({ response }) => {
  const responseHeaders = extractResponseHeaders(response);
  if (response.body == null) {
    throw new EmptyResponseBodyError({});
  }
  return {
    responseHeaders,
    value: parseJsonEventStream({
      stream: response.body,
      schema: chunkSchema
    })
  };
};
var createJsonResponseHandler = (responseSchema) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const parsedResult = await safeParseJSON({
    text: responseBody,
    schema: responseSchema
  });
  const responseHeaders = extractResponseHeaders(response);
  if (!parsedResult.success) {
    throw new APICallError$1({
      message: "Invalid JSON response",
      cause: parsedResult.error,
      statusCode: response.status,
      responseHeaders,
      responseBody,
      url,
      requestBodyValues
    });
  }
  return {
    responseHeaders,
    value: parsedResult.value,
    rawValue: parsedResult.rawValue
  };
};

// src/zod-to-json-schema/get-relative-path.ts
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};

// src/zod-to-json-schema/options.ts
var ignoreOverride = Symbol(
  "Let zodToJsonSchema decide on which parser to use"
);
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};

// src/zod-to-json-schema/parsers/any.ts
function parseAnyDef() {
  return {};
}
function parseArrayDef(def, refs) {
  var _a, _b, _c;
  const res = {
    type: "array"
  };
  if (((_a = def.type) == null ? void 0 : _a._def) && ((_c = (_b = def.type) == null ? void 0 : _b._def) == null ? void 0 : _c.typeName) !== ZodFirstPartyTypeKind$1.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    res.minItems = def.minLength.value;
  }
  if (def.maxLength) {
    res.maxItems = def.maxLength.value;
  }
  if (def.exactLength) {
    res.minItems = def.exactLength.value;
    res.maxItems = def.exactLength.value;
  }
  return res;
}

// src/zod-to-json-schema/parsers/bigint.ts
function parseBigintDef(def) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (check.inclusive) {
          res.minimum = check.value;
        } else {
          res.exclusiveMinimum = check.value;
        }
        break;
      case "max":
        if (check.inclusive) {
          res.maximum = check.value;
        } else {
          res.exclusiveMaximum = check.value;
        }
        break;
      case "multipleOf":
        res.multipleOf = check.value;
        break;
    }
  }
  return res;
}

// src/zod-to-json-schema/parsers/boolean.ts
function parseBooleanDef() {
  return { type: "boolean" };
}

// src/zod-to-json-schema/parsers/branded.ts
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// src/zod-to-json-schema/parsers/catch.ts
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// src/zod-to-json-schema/parsers/date.ts
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy != null ? overrideDateStrategy : refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def);
  }
}
var integerDateParser = (def) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        res.minimum = check.value;
        break;
      case "max":
        res.maximum = check.value;
        break;
    }
  }
  return res;
};

// src/zod-to-json-schema/parsers/default.ts
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// src/zod-to-json-schema/parsers/effects.ts
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef();
}

// src/zod-to-json-schema/parsers/enum.ts
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}

// src/zod-to-json-schema/parsers/intersection.ts
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? { allOf: mergedAllOf } : void 0;
}

// src/zod-to-json-schema/parsers/literal.ts
function parseLiteralDef(def) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// src/zod-to-json-schema/parsers/string.ts
var emojiRegex = void 0;
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => {
    if (emojiRegex === void 0) {
      emojiRegex = RegExp(
        "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
        "u"
      );
    }
    return emojiRegex;
  },
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value;
          break;
        case "max":
          res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value;
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(
            res,
            RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`),
            check.message,
            refs
          );
          break;
        case "endsWith":
          addPattern(
            res,
            RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`),
            check.message,
            refs
          );
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value;
          res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value;
          break;
        case "includes": {
          addPattern(
            res,
            RegExp(escapeLiteralCheckValue(check.value, refs)),
            check.message,
            refs
          );
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              res.contentEncoding = "base64";
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = new Set(
  "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789"
);
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  var _a;
  if (schema.format || ((_a = schema.anyOf) == null ? void 0 : _a.some((x) => x.format))) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format
      });
      delete schema.format;
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    schema.format = value;
  }
}
function addPattern(schema, regex, message, refs) {
  var _a;
  if (schema.pattern || ((_a = schema.allOf) == null ? void 0 : _a.some((x) => x.pattern))) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern
      });
      delete schema.pattern;
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    schema.pattern = stringifyRegExpWithFlags(regex, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  var _a;
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    // Case-insensitive
    m: regex.flags.includes("m"),
    // `^` and `$` matches adjacent to newline characters
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && ((_a = source[i + 2]) == null ? void 0 : _a.match(/[a-z]/))) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  return pattern;
}

// src/zod-to-json-schema/parsers/record.ts
function parseRecordDef(def, refs) {
  var _a, _b, _c, _d, _e, _f;
  const schema = {
    type: "object",
    additionalProperties: (_a = parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    })) != null ? _a : refs.allowedAdditionalProperties
  };
  if (((_b = def.keyType) == null ? void 0 : _b._def.typeName) === ZodFirstPartyTypeKind$1.ZodString && ((_c = def.keyType._def.checks) == null ? void 0 : _c.length)) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (((_d = def.keyType) == null ? void 0 : _d._def.typeName) === ZodFirstPartyTypeKind$1.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (((_e = def.keyType) == null ? void 0 : _e._def.typeName) === ZodFirstPartyTypeKind$1.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind$1.ZodString && ((_f = def.keyType._def.type._def.checks) == null ? void 0 : _f.length)) {
    const { type, ...keyType } = parseBrandedDef(
      def.keyType._def,
      refs
    );
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}

// src/zod-to-json-schema/parsers/map.ts
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || parseAnyDef();
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || parseAnyDef();
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// src/zod-to-json-schema/parsers/native-enum.ts
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(
    new Set(actualValues.map((values) => typeof values))
  );
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// src/zod-to-json-schema/parsers/never.ts
function parseNeverDef() {
  return { not: parseAnyDef() };
}

// src/zod-to-json-schema/parsers/null.ts
function parseNullDef() {
  return {
    type: "null"
  };
}

// src/zod-to-json-schema/parsers/union.ts
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every(
    (x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length)
  )) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce(
      (acc, x) => {
        const type = typeof x._def.value;
        switch (type) {
          case "string":
          case "number":
          case "boolean":
            return [...acc, type];
          case "bigint":
            return [...acc, "integer"];
          case "object":
            if (x._def.value === null)
              return [...acc, "null"];
          case "symbol":
          case "undefined":
          case "function":
          default:
            return acc;
        }
      },
      []
    );
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce(
          (acc, x) => {
            return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
          },
          []
        )
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce(
        (acc, x) => [
          ...acc,
          ...x._def.values.filter((x2) => !acc.includes(x2))
        ],
        []
      )
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map(
    (x, i) => parseDef(x._def, {
      ...refs,
      currentPath: [...refs.currentPath, "anyOf", `${i}`]
    })
  ).filter(
    (x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0)
  );
  return anyOf.length ? { anyOf } : void 0;
};

// src/zod-to-json-schema/parsers/nullable.ts
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(
    def.innerType._def.typeName
  ) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// src/zod-to-json-schema/parsers/number.ts
function parseNumberDef(def) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        break;
      case "min":
        if (check.inclusive) {
          res.minimum = check.value;
        } else {
          res.exclusiveMinimum = check.value;
        }
        break;
      case "max":
        if (check.inclusive) {
          res.maximum = check.value;
        } else {
          res.exclusiveMaximum = check.value;
        }
        break;
      case "multipleOf":
        res.multipleOf = check.value;
        break;
    }
  }
  return res;
}

// src/zod-to-json-schema/parsers/object.ts
function parseObjectDef(def, refs) {
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    const propOptional = safeIsOptional(propDef);
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch (e) {
    return true;
  }
}

// src/zod-to-json-schema/parsers/optional.ts
var parseOptionalDef = (def, refs) => {
  var _a;
  if (refs.currentPath.toString() === ((_a = refs.propertyPath) == null ? void 0 : _a.toString())) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? { anyOf: [{ not: parseAnyDef() }, innerSchema] } : parseAnyDef();
};

// src/zod-to-json-schema/parsers/pipeline.ts
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};

// src/zod-to-json-schema/parsers/promise.ts
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// src/zod-to-json-schema/parsers/set.ts
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    schema.minItems = def.minSize.value;
  }
  if (def.maxSize) {
    schema.maxItems = def.maxSize.value;
  }
  return schema;
}

// src/zod-to-json-schema/parsers/tuple.ts
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map(
        (x, i) => parseDef(x._def, {
          ...refs,
          currentPath: [...refs.currentPath, "items", `${i}`]
        })
      ).reduce(
        (acc, x) => x === void 0 ? acc : [...acc, x],
        []
      ),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map(
        (x, i) => parseDef(x._def, {
          ...refs,
          currentPath: [...refs.currentPath, "items", `${i}`]
        })
      ).reduce(
        (acc, x) => x === void 0 ? acc : [...acc, x],
        []
      )
    };
  }
}

// src/zod-to-json-schema/parsers/undefined.ts
function parseUndefinedDef() {
  return {
    not: parseAnyDef()
  };
}

// src/zod-to-json-schema/parsers/unknown.ts
function parseUnknownDef() {
  return parseAnyDef();
}

// src/zod-to-json-schema/parsers/readonly.ts
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// src/zod-to-json-schema/select-parser.ts
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind$1.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodNumber:
      return parseNumberDef(def);
    case ZodFirstPartyTypeKind$1.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodBigInt:
      return parseBigintDef(def);
    case ZodFirstPartyTypeKind$1.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind$1.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind$1.ZodNull:
      return parseNullDef();
    case ZodFirstPartyTypeKind$1.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodUnion:
    case ZodFirstPartyTypeKind$1.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodLiteral:
      return parseLiteralDef(def);
    case ZodFirstPartyTypeKind$1.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind$1.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind$1.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind$1.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodNaN:
    case ZodFirstPartyTypeKind$1.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind$1.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind$1.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind$1.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind$1.ZodFunction:
    case ZodFirstPartyTypeKind$1.ZodVoid:
    case ZodFirstPartyTypeKind$1.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)();
  }
};

// src/zod-to-json-schema/parse-def.ts
function parseDef(def, refs, forceResolution = false) {
  var _a;
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = (_a = refs.override) == null ? void 0 : _a.call(
      refs,
      def,
      refs,
      seenItem,
      forceResolution
    );
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema2 = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema2) {
    addMeta(def, refs, jsonSchema2);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema2, def, refs);
    newItem.jsonSchema = jsonSchema2;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema2;
  return jsonSchema2;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(
          `Recursive reference detected at ${refs.currentPath.join(
            "/"
          )}! Defaulting to any`
        );
        return parseAnyDef();
      }
      return refs.$refStrategy === "seen" ? parseAnyDef() : void 0;
    }
  }
};
var addMeta = (def, refs, jsonSchema2) => {
  if (def.description) {
    jsonSchema2.description = def.description;
  }
  return jsonSchema2;
};

// src/zod-to-json-schema/refs.ts
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(
      Object.entries(_options.definitions).map(([name, def]) => [
        def._def,
        {
          def: def._def,
          path: [..._options.basePath, _options.definitionPath, name],
          // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
          jsonSchema: void 0
        }
      ])
    )
  };
};

// src/zod-to-json-schema/zod-to-json-schema.ts
var zodToJsonSchema = (schema, options) => {
  var _a;
  const refs = getRefs(options);
  let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce(
    (acc, [name2, schema2]) => {
      var _a2;
      return {
        ...acc,
        [name2]: (_a2 = parseDef(
          schema2._def,
          {
            ...refs,
            currentPath: [...refs.basePath, refs.definitionPath, name2]
          },
          true
        )) != null ? _a2 : parseAnyDef()
      };
    },
    {}
  ) : void 0;
  const name = typeof options === "string" ? options : (options == null ? void 0 : options.nameStrategy) === "title" ? void 0 : options == null ? void 0 : options.name;
  const main = (_a = parseDef(
    schema._def,
    name === void 0 ? refs : {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name]
    },
    false
  )) != null ? _a : parseAnyDef();
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  combined.$schema = "http://json-schema.org/draft-07/schema#";
  return combined;
};

// src/zod-to-json-schema/index.ts
var zod_to_json_schema_default = zodToJsonSchema;

// src/zod-schema.ts
function zod3Schema(zodSchema2, options) {
  var _a;
  const useReferences = (_a = void 0 ) != null ? _a : false;
  return jsonSchema(
    zod_to_json_schema_default(zodSchema2, {
      $refStrategy: useReferences ? "root" : "none"
    }),
    {
      validate: async (value) => {
        const result = await zodSchema2.safeParseAsync(value);
        return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
      }
    }
  );
}
function zod4Schema(zodSchema2, options) {
  var _a;
  const useReferences = (_a = void 0 ) != null ? _a : false;
  const z4JSONSchema = toJSONSchema(zodSchema2, {
    target: "draft-7",
    io: "output",
    reused: useReferences ? "ref" : "inline"
  });
  return jsonSchema(z4JSONSchema, {
    validate: async (value) => {
      const result = await safeParseAsync(zodSchema2, value);
      return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
    }
  });
}
function isZod4Schema(zodSchema2) {
  return "_zod" in zodSchema2;
}
function zodSchema(zodSchema2, options) {
  if (isZod4Schema(zodSchema2)) {
    return zod4Schema(zodSchema2);
  } else {
    return zod3Schema(zodSchema2);
  }
}

// src/schema.ts
var schemaSymbol = Symbol.for("vercel.ai.schema");
function jsonSchema(jsonSchema2, {
  validate
} = {}) {
  return {
    [schemaSymbol]: true,
    _type: void 0,
    // should never be used directly
    [validatorSymbol]: true,
    jsonSchema: jsonSchema2,
    validate
  };
}
function isSchema(value) {
  return typeof value === "object" && value !== null && schemaSymbol in value && value[schemaSymbol] === true && "jsonSchema" in value && "validate" in value;
}
function asSchema(schema) {
  return schema == null ? jsonSchema({
    properties: {},
    additionalProperties: false
  }) : isSchema(schema) ? schema : zodSchema(schema);
}

// src/without-trailing-slash.ts
function withoutTrailingSlash(url) {
  return url == null ? void 0 : url.replace(/\/$/, "");
}

// src/gateway-provider.ts

// src/errors/gateway-error.ts
var marker$1 = "vercel.ai.gateway.error";
var symbol$1 = Symbol.for(marker$1);
var _a$1, _b;
var GatewayError = class _GatewayError extends (_b = Error, _a$1 = symbol$1, _b) {
  constructor({
    message,
    statusCode = 500,
    cause
  }) {
    super(message);
    this[_a$1] = true;
    this.statusCode = statusCode;
    this.cause = cause;
  }
  /**
   * Checks if the given error is a Gateway Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is a Gateway Error, false otherwise.
   */
  static isInstance(error) {
    return _GatewayError.hasMarker(error);
  }
  static hasMarker(error) {
    return typeof error === "object" && error !== null && symbol$1 in error && error[symbol$1] === true;
  }
};

// src/errors/gateway-authentication-error.ts
var name$1 = "GatewayAuthenticationError";
var marker2$2 = `vercel.ai.gateway.error.${name$1}`;
var symbol2$2 = Symbol.for(marker2$2);
var _a2$2, _b2;
var GatewayAuthenticationError = class _GatewayAuthenticationError extends (_b2 = GatewayError, _a2$2 = symbol2$2, _b2) {
  constructor({
    message = "Authentication failed",
    statusCode = 401,
    cause
  } = {}) {
    super({ message, statusCode, cause });
    this[_a2$2] = true;
    // used in isInstance
    this.name = name$1;
    this.type = "authentication_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol2$2 in error;
  }
  /**
   * Creates a contextual error message when authentication fails
   */
  static createContextualError({
    apiKeyProvided,
    oidcTokenProvided,
    message = "Authentication failed",
    statusCode = 401,
    cause
  }) {
    let contextualMessage;
    if (apiKeyProvided) {
      contextualMessage = `AI Gateway authentication failed: Invalid API key provided.

The token is expected to be provided via the 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.`;
    } else if (oidcTokenProvided) {
      contextualMessage = `AI Gateway authentication failed: Invalid OIDC token provided.

The token is expected to be provided via the 'VERCEL_OIDC_TOKEN' environment variable. It expires every 12 hours.
- make sure your Vercel project settings have OIDC enabled
- if running locally with 'vercel dev', the token is automatically obtained and refreshed
- if running locally with your own dev server, run 'vercel env pull' to fetch the token
- in production/preview, the token is automatically obtained and refreshed

Alternative: Provide an API key via 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.`;
    } else {
      contextualMessage = `AI Gateway authentication failed: No authentication provided.

Provide either an API key or OIDC token.

API key instructions:

The token is expected to be provided via the 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.

OIDC token instructions:

The token is expected to be provided via the 'VERCEL_OIDC_TOKEN' environment variable. It expires every 12 hours.
- make sure your Vercel project settings have OIDC enabled
- if running locally with 'vercel dev', the token is automatically obtained and refreshed
- if running locally with your own dev server, run 'vercel env pull' to fetch the token
- in production/preview, the token is automatically obtained and refreshed`;
    }
    return new _GatewayAuthenticationError({
      message: contextualMessage,
      statusCode,
      cause
    });
  }
};

// src/errors/gateway-invalid-request-error.ts
var name2$1 = "GatewayInvalidRequestError";
var marker3 = `vercel.ai.gateway.error.${name2$1}`;
var symbol3 = Symbol.for(marker3);
var _a3, _b3;
var GatewayInvalidRequestError = class extends (_b3 = GatewayError, _a3 = symbol3, _b3) {
  constructor({
    message = "Invalid request",
    statusCode = 400,
    cause
  } = {}) {
    super({ message, statusCode, cause });
    this[_a3] = true;
    // used in isInstance
    this.name = name2$1;
    this.type = "invalid_request_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol3 in error;
  }
};

// src/errors/gateway-rate-limit-error.ts
var name3 = "GatewayRateLimitError";
var marker4 = `vercel.ai.gateway.error.${name3}`;
var symbol4 = Symbol.for(marker4);
var _a4, _b4;
var GatewayRateLimitError = class extends (_b4 = GatewayError, _a4 = symbol4, _b4) {
  constructor({
    message = "Rate limit exceeded",
    statusCode = 429,
    cause
  } = {}) {
    super({ message, statusCode, cause });
    this[_a4] = true;
    // used in isInstance
    this.name = name3;
    this.type = "rate_limit_exceeded";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol4 in error;
  }
};
var name4 = "GatewayModelNotFoundError";
var marker5 = `vercel.ai.gateway.error.${name4}`;
var symbol5 = Symbol.for(marker5);
var modelNotFoundParamSchema = object$2({
  modelId: string()
});
var _a5, _b5;
var GatewayModelNotFoundError = class extends (_b5 = GatewayError, _a5 = symbol5, _b5) {
  constructor({
    message = "Model not found",
    statusCode = 404,
    modelId,
    cause
  } = {}) {
    super({ message, statusCode, cause });
    this[_a5] = true;
    // used in isInstance
    this.name = name4;
    this.type = "model_not_found";
    this.modelId = modelId;
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol5 in error;
  }
};

// src/errors/gateway-internal-server-error.ts
var name5 = "GatewayInternalServerError";
var marker6 = `vercel.ai.gateway.error.${name5}`;
var symbol6 = Symbol.for(marker6);
var _a6, _b6;
var GatewayInternalServerError = class extends (_b6 = GatewayError, _a6 = symbol6, _b6) {
  constructor({
    message = "Internal server error",
    statusCode = 500,
    cause
  } = {}) {
    super({ message, statusCode, cause });
    this[_a6] = true;
    // used in isInstance
    this.name = name5;
    this.type = "internal_server_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol6 in error;
  }
};

// src/errors/gateway-response-error.ts
var name6 = "GatewayResponseError";
var marker7$1 = `vercel.ai.gateway.error.${name6}`;
var symbol7$1 = Symbol.for(marker7$1);
var _a7$1, _b7;
var GatewayResponseError = class extends (_b7 = GatewayError, _a7$1 = symbol7$1, _b7) {
  constructor({
    message = "Invalid response from Gateway",
    statusCode = 502,
    response,
    validationError,
    cause
  } = {}) {
    super({ message, statusCode, cause });
    this[_a7$1] = true;
    // used in isInstance
    this.name = name6;
    this.type = "response_error";
    this.response = response;
    this.validationError = validationError;
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol7$1 in error;
  }
};

// src/errors/create-gateway-error.ts
function createGatewayErrorFromResponse({
  response,
  statusCode,
  defaultMessage = "Gateway request failed",
  cause,
  authMethod
}) {
  const parseResult = gatewayErrorResponseSchema.safeParse(response);
  if (!parseResult.success) {
    return new GatewayResponseError({
      message: `Invalid error response format: ${defaultMessage}`,
      statusCode,
      response,
      validationError: parseResult.error,
      cause
    });
  }
  const validatedResponse = parseResult.data;
  const errorType = validatedResponse.error.type;
  const message = validatedResponse.error.message;
  switch (errorType) {
    case "authentication_error":
      return GatewayAuthenticationError.createContextualError({
        apiKeyProvided: authMethod === "api-key",
        oidcTokenProvided: authMethod === "oidc",
        statusCode,
        cause
      });
    case "invalid_request_error":
      return new GatewayInvalidRequestError({ message, statusCode, cause });
    case "rate_limit_exceeded":
      return new GatewayRateLimitError({ message, statusCode, cause });
    case "model_not_found": {
      const modelResult = modelNotFoundParamSchema.safeParse(
        validatedResponse.error.param
      );
      return new GatewayModelNotFoundError({
        message,
        statusCode,
        modelId: modelResult.success ? modelResult.data.modelId : void 0,
        cause
      });
    }
    case "internal_server_error":
      return new GatewayInternalServerError({ message, statusCode, cause });
    default:
      return new GatewayInternalServerError({ message, statusCode, cause });
  }
}
var gatewayErrorResponseSchema = object$2({
  error: object$2({
    message: string(),
    type: string().nullish(),
    param: unknown().nullish(),
    code: union([string(), number()]).nullish()
  })
});

// src/errors/as-gateway-error.ts
function asGatewayError(error, authMethod) {
  var _a8;
  if (GatewayError.isInstance(error)) {
    return error;
  }
  if (APICallError$2.isInstance(error)) {
    return createGatewayErrorFromResponse({
      response: extractApiCallResponse(error),
      statusCode: (_a8 = error.statusCode) != null ? _a8 : 500,
      defaultMessage: "Gateway request failed",
      cause: error,
      authMethod
    });
  }
  return createGatewayErrorFromResponse({
    response: {},
    statusCode: 500,
    defaultMessage: error instanceof Error ? `Gateway request failed: ${error.message}` : "Unknown Gateway error",
    cause: error,
    authMethod
  });
}

// src/errors/extract-api-call-response.ts
function extractApiCallResponse(error) {
  if (error.data !== void 0) {
    return error.data;
  }
  if (error.responseBody != null) {
    try {
      return JSON.parse(error.responseBody);
    } catch (e) {
      return error.responseBody;
    }
  }
  return {};
}
var GATEWAY_AUTH_METHOD_HEADER = "ai-gateway-auth-method";
function parseAuthMethod(headers) {
  const result = gatewayAuthMethodSchema.safeParse(
    headers[GATEWAY_AUTH_METHOD_HEADER]
  );
  return result.success ? result.data : void 0;
}
var gatewayAuthMethodSchema = union([
  literal("api-key"),
  literal("oidc")
]);
var GatewayFetchMetadata = class {
  constructor(config) {
    this.config = config;
  }
  async getAvailableModels() {
    try {
      const { value } = await getFromApi({
        url: `${this.config.baseURL}/config`,
        headers: await resolve(this.config.headers()),
        successfulResponseHandler: createJsonResponseHandler(
          gatewayFetchMetadataSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        fetch: this.config.fetch
      });
      return value;
    } catch (error) {
      throw asGatewayError(error);
    }
  }
  async getCredits() {
    try {
      const baseUrl = new URL(this.config.baseURL);
      const { value } = await getFromApi({
        url: `${baseUrl.origin}/v1/credits`,
        headers: await resolve(this.config.headers()),
        successfulResponseHandler: createJsonResponseHandler(gatewayCreditsSchema),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        fetch: this.config.fetch
      });
      return value;
    } catch (error) {
      throw asGatewayError(error);
    }
  }
};
var gatewayLanguageModelSpecificationSchema = object$2({
  specificationVersion: literal("v2"),
  provider: string(),
  modelId: string()
});
var gatewayLanguageModelPricingSchema = object$2({
  input: string(),
  output: string(),
  input_cache_read: string().nullish(),
  input_cache_write: string().nullish()
}).transform(({ input, output, input_cache_read, input_cache_write }) => ({
  input,
  output,
  ...input_cache_read ? { cachedInputTokens: input_cache_read } : {},
  ...input_cache_write ? { cacheCreationInputTokens: input_cache_write } : {}
}));
var gatewayLanguageModelEntrySchema = object$2({
  id: string(),
  name: string(),
  description: string().nullish(),
  pricing: gatewayLanguageModelPricingSchema.nullish(),
  specification: gatewayLanguageModelSpecificationSchema,
  modelType: _enum(["language", "embedding", "image"]).nullish()
});
var gatewayFetchMetadataSchema = object$2({
  models: array(gatewayLanguageModelEntrySchema)
});
var gatewayCreditsSchema = object$2({
  balance: string(),
  total_used: string()
}).transform(({ balance, total_used }) => ({
  balance,
  totalUsed: total_used
}));
var GatewayLanguageModel = class {
  constructor(modelId, config) {
    this.modelId = modelId;
    this.config = config;
    this.specificationVersion = "v2";
    this.supportedUrls = { "*/*": [/.*/] };
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs(options) {
    const { abortSignal: _abortSignal, ...optionsWithoutSignal } = options;
    return {
      args: this.maybeEncodeFileParts(optionsWithoutSignal),
      warnings: []
    };
  }
  async doGenerate(options) {
    const { args, warnings } = await this.getArgs(options);
    const { abortSignal } = options;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const {
        responseHeaders,
        value: responseBody,
        rawValue: rawResponse
      } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          options.headers,
          this.getModelConfigHeaders(this.modelId, false),
          await resolve(this.config.o11yHeaders)
        ),
        body: args,
        successfulResponseHandler: createJsonResponseHandler(any()),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        ...responseBody,
        request: { body: args },
        response: { headers: responseHeaders, body: rawResponse },
        warnings
      };
    } catch (error) {
      throw asGatewayError(error, parseAuthMethod(resolvedHeaders));
    }
  }
  async doStream(options) {
    const { args, warnings } = await this.getArgs(options);
    const { abortSignal } = options;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const { value: response, responseHeaders } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          options.headers,
          this.getModelConfigHeaders(this.modelId, true),
          await resolve(this.config.o11yHeaders)
        ),
        body: args,
        successfulResponseHandler: createEventSourceResponseHandler(any()),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        stream: response.pipeThrough(
          new TransformStream({
            start(controller) {
              if (warnings.length > 0) {
                controller.enqueue({ type: "stream-start", warnings });
              }
            },
            transform(chunk, controller) {
              if (chunk.success) {
                const streamPart = chunk.value;
                if (streamPart.type === "raw" && !options.includeRawChunks) {
                  return;
                }
                if (streamPart.type === "response-metadata" && streamPart.timestamp && typeof streamPart.timestamp === "string") {
                  streamPart.timestamp = new Date(streamPart.timestamp);
                }
                controller.enqueue(streamPart);
              } else {
                controller.error(
                  chunk.error
                );
              }
            }
          })
        ),
        request: { body: args },
        response: { headers: responseHeaders }
      };
    } catch (error) {
      throw asGatewayError(error, parseAuthMethod(resolvedHeaders));
    }
  }
  isFilePart(part) {
    return part && typeof part === "object" && "type" in part && part.type === "file";
  }
  /**
   * Encodes file parts in the prompt to base64. Mutates the passed options
   * instance directly to avoid copying the file data.
   * @param options - The options to encode.
   * @returns The options with the file parts encoded.
   */
  maybeEncodeFileParts(options) {
    for (const message of options.prompt) {
      for (const part of message.content) {
        if (this.isFilePart(part)) {
          const filePart = part;
          if (filePart.data instanceof Uint8Array) {
            const buffer = Uint8Array.from(filePart.data);
            const base64Data = Buffer.from(buffer).toString("base64");
            filePart.data = new URL(
              `data:${filePart.mediaType || "application/octet-stream"};base64,${base64Data}`
            );
          }
        }
      }
    }
    return options;
  }
  getUrl() {
    return `${this.config.baseURL}/language-model`;
  }
  getModelConfigHeaders(modelId, streaming) {
    return {
      "ai-language-model-specification-version": "2",
      "ai-language-model-id": modelId,
      "ai-language-model-streaming": String(streaming)
    };
  }
};
var GatewayEmbeddingModel = class {
  constructor(modelId, config) {
    this.modelId = modelId;
    this.config = config;
    this.specificationVersion = "v2";
    this.maxEmbeddingsPerCall = 2048;
    this.supportsParallelCalls = true;
  }
  get provider() {
    return this.config.provider;
  }
  async doEmbed({
    values,
    headers,
    abortSignal,
    providerOptions
  }) {
    var _a8;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const {
        responseHeaders,
        value: responseBody,
        rawValue
      } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          headers != null ? headers : {},
          this.getModelConfigHeaders(),
          await resolve(this.config.o11yHeaders)
        ),
        body: {
          input: values.length === 1 ? values[0] : values,
          ...providerOptions ? { providerOptions } : {}
        },
        successfulResponseHandler: createJsonResponseHandler(
          gatewayEmbeddingResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        embeddings: responseBody.embeddings,
        usage: (_a8 = responseBody.usage) != null ? _a8 : void 0,
        providerMetadata: responseBody.providerMetadata,
        response: { headers: responseHeaders, body: rawValue }
      };
    } catch (error) {
      throw asGatewayError(error, parseAuthMethod(resolvedHeaders));
    }
  }
  getUrl() {
    return `${this.config.baseURL}/embedding-model`;
  }
  getModelConfigHeaders() {
    return {
      "ai-embedding-model-specification-version": "2",
      "ai-model-id": this.modelId
    };
  }
};
var gatewayEmbeddingResponseSchema = object$2({
  embeddings: array(array(number())),
  usage: object$2({ tokens: number() }).nullish(),
  providerMetadata: record(string(), record(string(), unknown())).optional()
});
async function getVercelRequestId() {
  var _a8;
  return (_a8 = dist.getContext().headers) == null ? void 0 : _a8["x-vercel-id"];
}

// src/version.ts
var VERSION$1 = "1.0.33" ;

// src/gateway-provider.ts
var AI_GATEWAY_PROTOCOL_VERSION = "0.0.1";
function createGatewayProvider(options = {}) {
  var _a8, _b8;
  let pendingMetadata = null;
  let metadataCache = null;
  const cacheRefreshMillis = (_a8 = options.metadataCacheRefreshMillis) != null ? _a8 : 1e3 * 60 * 5;
  let lastFetchTime = 0;
  const baseURL = (_b8 = withoutTrailingSlash(options.baseURL)) != null ? _b8 : "https://ai-gateway.vercel.sh/v1/ai";
  const getHeaders = async () => {
    const auth = await getGatewayAuthToken(options);
    if (auth) {
      return withUserAgentSuffix(
        {
          Authorization: `Bearer ${auth.token}`,
          "ai-gateway-protocol-version": AI_GATEWAY_PROTOCOL_VERSION,
          [GATEWAY_AUTH_METHOD_HEADER]: auth.authMethod,
          ...options.headers
        },
        `ai-sdk/gateway/${VERSION$1}`
      );
    }
    throw GatewayAuthenticationError.createContextualError({
      apiKeyProvided: false,
      oidcTokenProvided: false,
      statusCode: 401
    });
  };
  const createO11yHeaders = () => {
    const deploymentId = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_DEPLOYMENT_ID"
    });
    const environment = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_ENV"
    });
    const region = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_REGION"
    });
    return async () => {
      const requestId = await getVercelRequestId();
      return {
        ...deploymentId && { "ai-o11y-deployment-id": deploymentId },
        ...environment && { "ai-o11y-environment": environment },
        ...region && { "ai-o11y-region": region },
        ...requestId && { "ai-o11y-request-id": requestId }
      };
    };
  };
  const createLanguageModel = (modelId) => {
    return new GatewayLanguageModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  const getAvailableModels = async () => {
    var _a9, _b9, _c;
    const now = (_c = (_b9 = (_a9 = options._internal) == null ? void 0 : _a9.currentDate) == null ? void 0 : _b9.call(_a9).getTime()) != null ? _c : Date.now();
    if (!pendingMetadata || now - lastFetchTime > cacheRefreshMillis) {
      lastFetchTime = now;
      pendingMetadata = new GatewayFetchMetadata({
        baseURL,
        headers: getHeaders,
        fetch: options.fetch
      }).getAvailableModels().then((metadata) => {
        metadataCache = metadata;
        return metadata;
      }).catch(async (error) => {
        throw asGatewayError(error, parseAuthMethod(await getHeaders()));
      });
    }
    return metadataCache ? Promise.resolve(metadataCache) : pendingMetadata;
  };
  const getCredits = async () => {
    return new GatewayFetchMetadata({
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    }).getCredits().catch(async (error) => {
      throw asGatewayError(error, parseAuthMethod(await getHeaders()));
    });
  };
  const provider = function(modelId) {
    if (new.target) {
      throw new Error(
        "The Gateway Provider model function cannot be called with the new keyword."
      );
    }
    return createLanguageModel(modelId);
  };
  provider.getAvailableModels = getAvailableModels;
  provider.getCredits = getCredits;
  provider.imageModel = (modelId) => {
    throw new NoSuchModelError({ modelId, modelType: "imageModel" });
  };
  provider.languageModel = createLanguageModel;
  provider.textEmbeddingModel = (modelId) => {
    return new GatewayEmbeddingModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  return provider;
}
var gateway = createGatewayProvider();
async function getGatewayAuthToken(options) {
  const apiKey = loadOptionalSetting({
    settingValue: options.apiKey,
    environmentVariableName: "AI_GATEWAY_API_KEY"
  });
  if (apiKey) {
    return {
      token: apiKey,
      authMethod: "api-key"
    };
  }
  try {
    const oidcToken = await dist.getVercelOidcToken();
    return {
      token: oidcToken,
      authMethod: "oidc"
    };
  } catch (e) {
    return null;
  }
}

// src/errors/ai-sdk-error.ts
var marker = "vercel.ai.error";
var symbol = Symbol.for(marker);
var _a;
var _AISDKError = class _AISDKError extends Error {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name14,
    message,
    cause
  }) {
    super(message);
    this[_a] = true;
    this.name = name14;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError.hasMarker(error, marker);
  }
  static hasMarker(error, marker15) {
    const markerSymbol = Symbol.for(marker15);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
_a = symbol;
var AISDKError = _AISDKError;

// src/errors/api-call-error.ts
var name = "AI_APICallError";
var marker2$1 = `vercel.ai.error.${name}`;
var symbol2$1 = Symbol.for(marker2$1);
var _a2$1;
var APICallError = class extends AISDKError {
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name, message, cause });
    this[_a2$1] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2$1);
  }
};
_a2$1 = symbol2$1;

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name17 in all)
    __defProp(target, name17, { get: all[name17], enumerable: true });
};
var name2 = "AI_InvalidArgumentError";
var marker2 = `vercel.ai.error.${name2}`;
var symbol2 = Symbol.for(marker2);
var _a2;
var InvalidArgumentError = class extends AISDKError {
  constructor({
    parameter,
    value,
    message
  }) {
    super({
      name: name2,
      message: `Invalid argument for parameter ${parameter}: ${message}`
    });
    this[_a2] = true;
    this.parameter = parameter;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2);
  }
};
_a2 = symbol2;
var name7 = "AI_NoObjectGeneratedError";
var marker7 = `vercel.ai.error.${name7}`;
var symbol7 = Symbol.for(marker7);
var _a7;
var NoObjectGeneratedError = class extends AISDKError {
  constructor({
    message = "No object generated.",
    cause,
    text: text2,
    response,
    usage,
    finishReason
  }) {
    super({ name: name7, message, cause });
    this[_a7] = true;
    this.text = text2;
    this.response = response;
    this.usage = usage;
    this.finishReason = finishReason;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker7);
  }
};
_a7 = symbol7;
var UnsupportedModelVersionError = class extends AISDKError {
  constructor(options) {
    super({
      name: "AI_UnsupportedModelVersionError",
      message: `Unsupported model version ${options.version} for provider "${options.provider}" and model "${options.modelId}". AI SDK 5 only supports models that implement specification version "v2".`
    });
    this.version = options.version;
    this.provider = options.provider;
    this.modelId = options.modelId;
  }
};
var name15 = "AI_RetryError";
var marker15 = `vercel.ai.error.${name15}`;
var symbol15 = Symbol.for(marker15);
var _a15;
var RetryError = class extends AISDKError {
  constructor({
    message,
    reason,
    errors
  }) {
    super({ name: name15, message });
    this[_a15] = true;
    this.reason = reason;
    this.errors = errors;
    this.lastError = errors[errors.length - 1];
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker15);
  }
};
_a15 = symbol15;
function resolveEmbeddingModel(model) {
  if (typeof model !== "string") {
    if (model.specificationVersion !== "v2") {
      throw new UnsupportedModelVersionError({
        version: model.specificationVersion,
        provider: model.provider,
        modelId: model.modelId
      });
    }
    return model;
  }
  return getGlobalProvider().textEmbeddingModel(
    model
  );
}
function getGlobalProvider() {
  var _a17;
  return (_a17 = globalThis.AI_SDK_DEFAULT_PROVIDER) != null ? _a17 : gateway;
}

// src/version.ts
var VERSION = "5.0.60" ;

// src/prompt/data-content.ts
var dataContentSchema = union([
  string(),
  _instanceof(Uint8Array),
  _instanceof(ArrayBuffer),
  custom(
    // Buffer might not be available in some environments such as CloudFlare:
    (value) => {
      var _a17, _b;
      return (_b = (_a17 = globalThis.Buffer) == null ? void 0 : _a17.isBuffer(value)) != null ? _b : false;
    },
    { message: "Must be a Buffer" }
  )
]);
var jsonValueSchema = lazy(
  () => union([
    _null(),
    string(),
    number(),
    boolean(),
    record(string(), jsonValueSchema),
    array(jsonValueSchema)
  ])
);

// src/types/provider-metadata.ts
var providerMetadataSchema = record(
  string(),
  record(string(), jsonValueSchema)
);
var textPartSchema = object$2({
  type: literal("text"),
  text: string(),
  providerOptions: providerMetadataSchema.optional()
});
var imagePartSchema = object$2({
  type: literal("image"),
  image: union([dataContentSchema, _instanceof(URL)]),
  mediaType: string().optional(),
  providerOptions: providerMetadataSchema.optional()
});
var filePartSchema = object$2({
  type: literal("file"),
  data: union([dataContentSchema, _instanceof(URL)]),
  filename: string().optional(),
  mediaType: string(),
  providerOptions: providerMetadataSchema.optional()
});
var reasoningPartSchema = object$2({
  type: literal("reasoning"),
  text: string(),
  providerOptions: providerMetadataSchema.optional()
});
var toolCallPartSchema = object$2({
  type: literal("tool-call"),
  toolCallId: string(),
  toolName: string(),
  input: unknown(),
  providerOptions: providerMetadataSchema.optional(),
  providerExecuted: boolean().optional()
});
var outputSchema = discriminatedUnion("type", [
  object$2({
    type: literal("text"),
    value: string()
  }),
  object$2({
    type: literal("json"),
    value: jsonValueSchema
  }),
  object$2({
    type: literal("error-text"),
    value: string()
  }),
  object$2({
    type: literal("error-json"),
    value: jsonValueSchema
  }),
  object$2({
    type: literal("content"),
    value: array(
      union([
        object$2({
          type: literal("text"),
          text: string()
        }),
        object$2({
          type: literal("media"),
          data: string(),
          mediaType: string()
        })
      ])
    )
  })
]);
var toolResultPartSchema = object$2({
  type: literal("tool-result"),
  toolCallId: string(),
  toolName: string(),
  output: outputSchema,
  providerOptions: providerMetadataSchema.optional()
});

// src/prompt/message.ts
var systemModelMessageSchema = object$2(
  {
    role: literal("system"),
    content: string(),
    providerOptions: providerMetadataSchema.optional()
  }
);
var userModelMessageSchema = object$2({
  role: literal("user"),
  content: union([
    string(),
    array(union([textPartSchema, imagePartSchema, filePartSchema]))
  ]),
  providerOptions: providerMetadataSchema.optional()
});
var assistantModelMessageSchema = object$2({
  role: literal("assistant"),
  content: union([
    string(),
    array(
      union([
        textPartSchema,
        filePartSchema,
        reasoningPartSchema,
        toolCallPartSchema,
        toolResultPartSchema
      ])
    )
  ]),
  providerOptions: providerMetadataSchema.optional()
});
var toolModelMessageSchema = object$2({
  role: literal("tool"),
  content: array(toolResultPartSchema),
  providerOptions: providerMetadataSchema.optional()
});
union([
  systemModelMessageSchema,
  userModelMessageSchema,
  assistantModelMessageSchema,
  toolModelMessageSchema
]);

// src/telemetry/assemble-operation-name.ts
function assembleOperationName({
  operationId,
  telemetry
}) {
  return {
    // standardized operation and resource name:
    "operation.name": `${operationId}${(telemetry == null ? void 0 : telemetry.functionId) != null ? ` ${telemetry.functionId}` : ""}`,
    "resource.name": telemetry == null ? void 0 : telemetry.functionId,
    // detailed, AI SDK specific data:
    "ai.operationId": operationId,
    "ai.telemetry.functionId": telemetry == null ? void 0 : telemetry.functionId
  };
}

// src/telemetry/get-base-telemetry-attributes.ts
function getBaseTelemetryAttributes({
  model,
  settings,
  telemetry,
  headers
}) {
  var _a17;
  return {
    "ai.model.provider": model.provider,
    "ai.model.id": model.modelId,
    // settings:
    ...Object.entries(settings).reduce((attributes, [key, value]) => {
      attributes[`ai.settings.${key}`] = value;
      return attributes;
    }, {}),
    // add metadata as attributes:
    ...Object.entries((_a17 = telemetry == null ? void 0 : telemetry.metadata) != null ? _a17 : {}).reduce(
      (attributes, [key, value]) => {
        attributes[`ai.telemetry.metadata.${key}`] = value;
        return attributes;
      },
      {}
    ),
    // request headers
    ...Object.entries(headers != null ? headers : {}).reduce((attributes, [key, value]) => {
      if (value !== void 0) {
        attributes[`ai.request.headers.${key}`] = value;
      }
      return attributes;
    }, {})
  };
}

// src/telemetry/noop-tracer.ts
var noopTracer = {
  startSpan() {
    return noopSpan;
  },
  startActiveSpan(name17, arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
      return arg1(noopSpan);
    }
    if (typeof arg2 === "function") {
      return arg2(noopSpan);
    }
    if (typeof arg3 === "function") {
      return arg3(noopSpan);
    }
  }
};
var noopSpan = {
  spanContext() {
    return noopSpanContext;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return false;
  },
  recordException() {
    return this;
  }
};
var noopSpanContext = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};

// src/telemetry/get-tracer.ts
function getTracer({
  isEnabled = false,
  tracer
} = {}) {
  if (!isEnabled) {
    return noopTracer;
  }
  if (tracer) {
    return tracer;
  }
  return trace.getTracer("ai");
}
function recordSpan({
  name: name17,
  tracer,
  attributes,
  fn,
  endWhenDone = true
}) {
  return tracer.startActiveSpan(name17, { attributes }, async (span) => {
    try {
      const result = await fn(span);
      if (endWhenDone) {
        span.end();
      }
      return result;
    } catch (error) {
      try {
        recordErrorOnSpan(span, error);
      } finally {
        span.end();
      }
      throw error;
    }
  });
}
function recordErrorOnSpan(span, error) {
  if (error instanceof Error) {
    span.recordException({
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
  } else {
    span.setStatus({ code: SpanStatusCode.ERROR });
  }
}

// src/telemetry/select-telemetry-attributes.ts
function selectTelemetryAttributes({
  telemetry,
  attributes
}) {
  if ((telemetry == null ? void 0 : telemetry.isEnabled) !== true) {
    return {};
  }
  return Object.entries(attributes).reduce((attributes2, [key, value]) => {
    if (value == null) {
      return attributes2;
    }
    if (typeof value === "object" && "input" in value && typeof value.input === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordInputs) === false) {
        return attributes2;
      }
      const result = value.input();
      return result == null ? attributes2 : { ...attributes2, [key]: result };
    }
    if (typeof value === "object" && "output" in value && typeof value.output === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordOutputs) === false) {
        return attributes2;
      }
      const result = value.output();
      return result == null ? attributes2 : { ...attributes2, [key]: result };
    }
    return { ...attributes2, [key]: value };
  }, {});
}
function getRetryDelayInMs({
  error,
  exponentialBackoffDelay
}) {
  const headers = error.responseHeaders;
  if (!headers)
    return exponentialBackoffDelay;
  let ms;
  const retryAfterMs = headers["retry-after-ms"];
  if (retryAfterMs) {
    const timeoutMs = parseFloat(retryAfterMs);
    if (!Number.isNaN(timeoutMs)) {
      ms = timeoutMs;
    }
  }
  const retryAfter = headers["retry-after"];
  if (retryAfter && ms === void 0) {
    const timeoutSeconds = parseFloat(retryAfter);
    if (!Number.isNaN(timeoutSeconds)) {
      ms = timeoutSeconds * 1e3;
    } else {
      ms = Date.parse(retryAfter) - Date.now();
    }
  }
  if (ms != null && !Number.isNaN(ms) && 0 <= ms && (ms < 60 * 1e3 || ms < exponentialBackoffDelay)) {
    return ms;
  }
  return exponentialBackoffDelay;
}
var retryWithExponentialBackoffRespectingRetryHeaders = ({
  maxRetries = 2,
  initialDelayInMs = 2e3,
  backoffFactor = 2,
  abortSignal
} = {}) => async (f) => _retryWithExponentialBackoff(f, {
  maxRetries,
  delayInMs: initialDelayInMs,
  backoffFactor,
  abortSignal
});
async function _retryWithExponentialBackoff(f, {
  maxRetries,
  delayInMs,
  backoffFactor,
  abortSignal
}, errors = []) {
  try {
    return await f();
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }
    if (maxRetries === 0) {
      throw error;
    }
    const errorMessage = getErrorMessage(error);
    const newErrors = [...errors, error];
    const tryNumber = newErrors.length;
    if (tryNumber > maxRetries) {
      throw new RetryError({
        message: `Failed after ${tryNumber} attempts. Last error: ${errorMessage}`,
        reason: "maxRetriesExceeded",
        errors: newErrors
      });
    }
    if (error instanceof Error && APICallError.isInstance(error) && error.isRetryable === true && tryNumber <= maxRetries) {
      await delay(
        getRetryDelayInMs({
          error,
          exponentialBackoffDelay: delayInMs
        }),
        { abortSignal }
      );
      return _retryWithExponentialBackoff(
        f,
        {
          maxRetries,
          delayInMs: backoffFactor * delayInMs,
          backoffFactor,
          abortSignal
        },
        newErrors
      );
    }
    if (tryNumber === 1) {
      throw error;
    }
    throw new RetryError({
      message: `Failed after ${tryNumber} attempts with non-retryable error: '${errorMessage}'`,
      reason: "errorNotRetryable",
      errors: newErrors
    });
  }
}

// src/util/prepare-retries.ts
function prepareRetries({
  maxRetries,
  abortSignal
}) {
  if (maxRetries != null) {
    if (!Number.isInteger(maxRetries)) {
      throw new InvalidArgumentError({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be an integer"
      });
    }
    if (maxRetries < 0) {
      throw new InvalidArgumentError({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be >= 0"
      });
    }
  }
  const maxRetriesResult = maxRetries != null ? maxRetries : 2;
  return {
    maxRetries: maxRetriesResult,
    retry: retryWithExponentialBackoffRespectingRetryHeaders({
      maxRetries: maxRetriesResult,
      abortSignal
    })
  };
}

// src/generate-text/generate-text.ts
createIdGenerator({
  prefix: "aitxt",
  size: 24
});
union([
  strictObject({
    type: literal("text-start"),
    id: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("text-delta"),
    id: string(),
    delta: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("text-end"),
    id: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("error"),
    errorText: string()
  }),
  strictObject({
    type: literal("tool-input-start"),
    toolCallId: string(),
    toolName: string(),
    providerExecuted: boolean().optional(),
    dynamic: boolean().optional()
  }),
  strictObject({
    type: literal("tool-input-delta"),
    toolCallId: string(),
    inputTextDelta: string()
  }),
  strictObject({
    type: literal("tool-input-available"),
    toolCallId: string(),
    toolName: string(),
    input: unknown(),
    providerExecuted: boolean().optional(),
    providerMetadata: providerMetadataSchema.optional(),
    dynamic: boolean().optional()
  }),
  strictObject({
    type: literal("tool-input-error"),
    toolCallId: string(),
    toolName: string(),
    input: unknown(),
    providerExecuted: boolean().optional(),
    providerMetadata: providerMetadataSchema.optional(),
    dynamic: boolean().optional(),
    errorText: string()
  }),
  strictObject({
    type: literal("tool-output-available"),
    toolCallId: string(),
    output: unknown(),
    providerExecuted: boolean().optional(),
    dynamic: boolean().optional(),
    preliminary: boolean().optional()
  }),
  strictObject({
    type: literal("tool-output-error"),
    toolCallId: string(),
    errorText: string(),
    providerExecuted: boolean().optional(),
    dynamic: boolean().optional()
  }),
  strictObject({
    type: literal("reasoning-start"),
    id: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("reasoning-delta"),
    id: string(),
    delta: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("reasoning-end"),
    id: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("source-url"),
    sourceId: string(),
    url: string(),
    title: string().optional(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("source-document"),
    sourceId: string(),
    mediaType: string(),
    title: string(),
    filename: string().optional(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: literal("file"),
    url: string(),
    mediaType: string(),
    providerMetadata: providerMetadataSchema.optional()
  }),
  strictObject({
    type: custom(
      (value) => typeof value === "string" && value.startsWith("data-"),
      { message: 'Type must start with "data-"' }
    ),
    id: string().optional(),
    data: unknown(),
    transient: boolean().optional()
  }),
  strictObject({
    type: literal("start-step")
  }),
  strictObject({
    type: literal("finish-step")
  }),
  strictObject({
    type: literal("start"),
    messageId: string().optional(),
    messageMetadata: unknown().optional()
  }),
  strictObject({
    type: literal("finish"),
    messageMetadata: unknown().optional()
  }),
  strictObject({
    type: literal("abort")
  }),
  strictObject({
    type: literal("message-metadata"),
    messageMetadata: unknown()
  })
]);

// src/util/fix-json.ts
function fixJson(input) {
  const stack = ["ROOT"];
  let lastValidIndex = -1;
  let literalStart = null;
  function processValueStart(char, i, swapState) {
    {
      switch (char) {
        case '"': {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_STRING");
          break;
        }
        case "f":
        case "t":
        case "n": {
          lastValidIndex = i;
          literalStart = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_LITERAL");
          break;
        }
        case "-": {
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "{": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_OBJECT_START");
          break;
        }
        case "[": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_ARRAY_START");
          break;
        }
      }
    }
  }
  function processAfterObjectValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  function processAfterArrayValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const currentState = stack[stack.length - 1];
    switch (currentState) {
      case "ROOT":
        processValueStart(char, i, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (char) {
          case ":": {
            stack.pop();
            stack.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        processAfterObjectValue(char, i);
        break;
      }
      case "INSIDE_STRING": {
        switch (char) {
          case '"': {
            stack.pop();
            lastValidIndex = i;
            break;
          }
          case "\\": {
            stack.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default: {
            lastValidIndex = i;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (char) {
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (char) {
          case ",": {
            stack.pop();
            stack.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        stack.pop();
        lastValidIndex = i;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (char) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            lastValidIndex = i;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".": {
            break;
          }
          case ",": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "}": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "]": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            break;
          }
          default: {
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, i + 1);
        if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
          stack.pop();
          if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
            processAfterObjectValue(char, i);
          } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
            processAfterArrayValue(char, i);
          }
        } else {
          lastValidIndex = i;
        }
        break;
      }
    }
  }
  let result = input.slice(0, lastValidIndex + 1);
  for (let i = stack.length - 1; i >= 0; i--) {
    const state = stack[i];
    switch (state) {
      case "INSIDE_STRING": {
        result += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        result += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        result += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, input.length);
        if ("true".startsWith(partialLiteral)) {
          result += "true".slice(partialLiteral.length);
        } else if ("false".startsWith(partialLiteral)) {
          result += "false".slice(partialLiteral.length);
        } else if ("null".startsWith(partialLiteral)) {
          result += "null".slice(partialLiteral.length);
        }
      }
    }
  }
  return result;
}

// src/util/parse-partial-json.ts
async function parsePartialJson(jsonText) {
  if (jsonText === void 0) {
    return { value: void 0, state: "undefined-input" };
  }
  let result = await safeParseJSON({ text: jsonText });
  if (result.success) {
    return { value: result.value, state: "successful-parse" };
  }
  result = await safeParseJSON({ text: fixJson(jsonText) });
  if (result.success) {
    return { value: result.value, state: "repaired-parse" };
  }
  return { value: void 0, state: "failed-parse" };
}

// src/generate-text/stream-text.ts
createIdGenerator({
  prefix: "aitxt",
  size: 24
});

// src/util/split-array.ts
function splitArray(array, chunkSize) {
  if (chunkSize <= 0) {
    throw new Error("chunkSize must be greater than 0");
  }
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// src/embed/embed-many.ts
async function embedMany({
  model: modelArg,
  values,
  maxParallelCalls = Infinity,
  maxRetries: maxRetriesArg,
  abortSignal,
  headers,
  providerOptions,
  experimental_telemetry: telemetry
}) {
  const model = resolveEmbeddingModel(modelArg);
  const { maxRetries, retry } = prepareRetries({
    maxRetries: maxRetriesArg,
    abortSignal
  });
  const headersWithUserAgent = withUserAgentSuffix(
    headers != null ? headers : {},
    `ai/${VERSION}`
  );
  const baseTelemetryAttributes = getBaseTelemetryAttributes({
    model,
    telemetry,
    headers: headersWithUserAgent,
    settings: { maxRetries }
  });
  const tracer = getTracer(telemetry);
  return recordSpan({
    name: "ai.embedMany",
    attributes: selectTelemetryAttributes({
      telemetry,
      attributes: {
        ...assembleOperationName({ operationId: "ai.embedMany", telemetry }),
        ...baseTelemetryAttributes,
        // specific settings that only make sense on the outer level:
        "ai.values": {
          input: () => values.map((value) => JSON.stringify(value))
        }
      }
    }),
    tracer,
    fn: async (span) => {
      var _a17;
      const [maxEmbeddingsPerCall, supportsParallelCalls] = await Promise.all([
        model.maxEmbeddingsPerCall,
        model.supportsParallelCalls
      ]);
      if (maxEmbeddingsPerCall == null || maxEmbeddingsPerCall === Infinity) {
        const { embeddings: embeddings2, usage, response, providerMetadata: providerMetadata2 } = await retry(
          () => {
            return recordSpan({
              name: "ai.embedMany.doEmbed",
              attributes: selectTelemetryAttributes({
                telemetry,
                attributes: {
                  ...assembleOperationName({
                    operationId: "ai.embedMany.doEmbed",
                    telemetry
                  }),
                  ...baseTelemetryAttributes,
                  // specific settings that only make sense on the outer level:
                  "ai.values": {
                    input: () => values.map((value) => JSON.stringify(value))
                  }
                }
              }),
              tracer,
              fn: async (doEmbedSpan) => {
                var _a18;
                const modelResponse = await model.doEmbed({
                  values,
                  abortSignal,
                  headers: headersWithUserAgent,
                  providerOptions
                });
                const embeddings3 = modelResponse.embeddings;
                const usage2 = (_a18 = modelResponse.usage) != null ? _a18 : { tokens: NaN };
                doEmbedSpan.setAttributes(
                  selectTelemetryAttributes({
                    telemetry,
                    attributes: {
                      "ai.embeddings": {
                        output: () => embeddings3.map(
                          (embedding) => JSON.stringify(embedding)
                        )
                      },
                      "ai.usage.tokens": usage2.tokens
                    }
                  })
                );
                return {
                  embeddings: embeddings3,
                  usage: usage2,
                  providerMetadata: modelResponse.providerMetadata,
                  response: modelResponse.response
                };
              }
            });
          }
        );
        span.setAttributes(
          selectTelemetryAttributes({
            telemetry,
            attributes: {
              "ai.embeddings": {
                output: () => embeddings2.map((embedding) => JSON.stringify(embedding))
              },
              "ai.usage.tokens": usage.tokens
            }
          })
        );
        return new DefaultEmbedManyResult({
          values,
          embeddings: embeddings2,
          usage,
          providerMetadata: providerMetadata2,
          responses: [response]
        });
      }
      const valueChunks = splitArray(values, maxEmbeddingsPerCall);
      const embeddings = [];
      const responses = [];
      let tokens = 0;
      let providerMetadata;
      const parallelChunks = splitArray(
        valueChunks,
        supportsParallelCalls ? maxParallelCalls : 1
      );
      for (const parallelChunk of parallelChunks) {
        const results = await Promise.all(
          parallelChunk.map((chunk) => {
            return retry(() => {
              return recordSpan({
                name: "ai.embedMany.doEmbed",
                attributes: selectTelemetryAttributes({
                  telemetry,
                  attributes: {
                    ...assembleOperationName({
                      operationId: "ai.embedMany.doEmbed",
                      telemetry
                    }),
                    ...baseTelemetryAttributes,
                    // specific settings that only make sense on the outer level:
                    "ai.values": {
                      input: () => chunk.map((value) => JSON.stringify(value))
                    }
                  }
                }),
                tracer,
                fn: async (doEmbedSpan) => {
                  var _a18;
                  const modelResponse = await model.doEmbed({
                    values: chunk,
                    abortSignal,
                    headers: headersWithUserAgent,
                    providerOptions
                  });
                  const embeddings2 = modelResponse.embeddings;
                  const usage = (_a18 = modelResponse.usage) != null ? _a18 : { tokens: NaN };
                  doEmbedSpan.setAttributes(
                    selectTelemetryAttributes({
                      telemetry,
                      attributes: {
                        "ai.embeddings": {
                          output: () => embeddings2.map(
                            (embedding) => JSON.stringify(embedding)
                          )
                        },
                        "ai.usage.tokens": usage.tokens
                      }
                    })
                  );
                  return {
                    embeddings: embeddings2,
                    usage,
                    providerMetadata: modelResponse.providerMetadata,
                    response: modelResponse.response
                  };
                }
              });
            });
          })
        );
        for (const result of results) {
          embeddings.push(...result.embeddings);
          responses.push(result.response);
          tokens += result.usage.tokens;
          if (result.providerMetadata) {
            if (!providerMetadata) {
              providerMetadata = { ...result.providerMetadata };
            } else {
              for (const [providerName, metadata] of Object.entries(
                result.providerMetadata
              )) {
                providerMetadata[providerName] = {
                  ...(_a17 = providerMetadata[providerName]) != null ? _a17 : {},
                  ...metadata
                };
              }
            }
          }
        }
      }
      span.setAttributes(
        selectTelemetryAttributes({
          telemetry,
          attributes: {
            "ai.embeddings": {
              output: () => embeddings.map((embedding) => JSON.stringify(embedding))
            },
            "ai.usage.tokens": tokens
          }
        })
      );
      return new DefaultEmbedManyResult({
        values,
        embeddings,
        usage: { tokens },
        providerMetadata,
        responses
      });
    }
  });
}
var DefaultEmbedManyResult = class {
  constructor(options) {
    this.values = options.values;
    this.embeddings = options.embeddings;
    this.usage = options.usage;
    this.providerMetadata = options.providerMetadata;
    this.responses = options.responses;
  }
};

// src/generate-object/generate-object.ts
createIdGenerator({ prefix: "aiobj", size: 24 });

// src/generate-object/stream-object.ts
createIdGenerator({ prefix: "aiobj", size: 24 });

// src/generate-text/output.ts
var output_exports = {};
__export(output_exports, {
  object: () => object,
  text: () => text
});
var text = () => ({
  type: "text",
  responseFormat: { type: "text" },
  async parsePartial({ text: text2 }) {
    return { partial: text2 };
  },
  async parseOutput({ text: text2 }) {
    return text2;
  }
});
var object = ({
  schema: inputSchema
}) => {
  const schema = asSchema(inputSchema);
  return {
    type: "object",
    responseFormat: {
      type: "json",
      schema: schema.jsonSchema
    },
    async parsePartial({ text: text2 }) {
      const result = await parsePartialJson(text2);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input":
          return void 0;
        case "repaired-parse":
        case "successful-parse":
          return {
            // Note: currently no validation of partial results:
            partial: result.value
          };
        default: {
          const _exhaustiveCheck = result.state;
          throw new Error(`Unsupported parse state: ${_exhaustiveCheck}`);
        }
      }
    },
    async parseOutput({ text: text2 }, context) {
      const parseResult = await safeParseJSON({ text: text2 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text2,
          response: context.response,
          usage: context.usage,
          finishReason: context.finishReason
        });
      }
      const validationResult = await safeValidateTypes({
        value: parseResult.value,
        schema
      });
      if (!validationResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: response did not match schema.",
          cause: validationResult.error,
          text: text2,
          response: context.response,
          usage: context.usage,
          finishReason: context.finishReason
        });
      }
      return validationResult.value;
    }
  };
};
var ClientOrServerImplementationSchema = looseObject({
  name: string(),
  version: string()
});
var BaseParamsSchema = looseObject({
  _meta: optional(object$2({}).loose())
});
var ResultSchema = BaseParamsSchema;
var RequestSchema = object$2({
  method: string(),
  params: optional(BaseParamsSchema)
});
var ServerCapabilitiesSchema = looseObject({
  experimental: optional(object$2({}).loose()),
  logging: optional(object$2({}).loose()),
  prompts: optional(
    looseObject({
      listChanged: optional(boolean())
    })
  ),
  resources: optional(
    looseObject({
      subscribe: optional(boolean()),
      listChanged: optional(boolean())
    })
  ),
  tools: optional(
    looseObject({
      listChanged: optional(boolean())
    })
  )
});
ResultSchema.extend({
  protocolVersion: string(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ClientOrServerImplementationSchema,
  instructions: optional(string())
});
var PaginatedResultSchema = ResultSchema.extend({
  nextCursor: optional(string())
});
var ToolSchema = object$2({
  name: string(),
  description: optional(string()),
  inputSchema: object$2({
    type: literal("object"),
    properties: optional(object$2({}).loose())
  }).loose()
}).loose();
PaginatedResultSchema.extend({
  tools: array(ToolSchema)
});
var TextContentSchema = object$2({
  type: literal("text"),
  text: string()
}).loose();
var ImageContentSchema = object$2({
  type: literal("image"),
  data: base64(),
  mimeType: string()
}).loose();
var ResourceContentsSchema = object$2({
  /**
   * The URI of this resource.
   */
  uri: string(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: optional(string())
}).loose();
var TextResourceContentsSchema = ResourceContentsSchema.extend({
  text: string()
});
var BlobResourceContentsSchema = ResourceContentsSchema.extend({
  blob: base64()
});
var EmbeddedResourceSchema = object$2({
  type: literal("resource"),
  resource: union([TextResourceContentsSchema, BlobResourceContentsSchema])
}).loose();
ResultSchema.extend({
  content: array(
    union([TextContentSchema, ImageContentSchema, EmbeddedResourceSchema])
  ),
  isError: boolean().default(false).optional()
}).or(
  ResultSchema.extend({
    toolResult: unknown()
  })
);

// src/tool/mcp/json-rpc-message.ts
var JSONRPC_VERSION = "2.0";
var JSONRPCRequestSchema = object$2({
  jsonrpc: literal(JSONRPC_VERSION),
  id: union([string(), number().int()])
}).merge(RequestSchema).strict();
var JSONRPCResponseSchema = object$2({
  jsonrpc: literal(JSONRPC_VERSION),
  id: union([string(), number().int()]),
  result: ResultSchema
}).strict();
var JSONRPCErrorSchema = object$2({
  jsonrpc: literal(JSONRPC_VERSION),
  id: union([string(), number().int()]),
  error: object$2({
    code: number().int(),
    message: string(),
    data: optional(unknown())
  })
}).strict();
var JSONRPCNotificationSchema = object$2({
  jsonrpc: literal(JSONRPC_VERSION)
}).merge(
  object$2({
    method: string(),
    params: optional(BaseParamsSchema)
  })
).strict();
union([
  JSONRPCRequestSchema,
  JSONRPCNotificationSchema,
  JSONRPCResponseSchema,
  JSONRPCErrorSchema
]);
var textUIPartSchema = object$2({
  type: literal("text"),
  text: string(),
  state: _enum(["streaming", "done"]).optional(),
  providerMetadata: providerMetadataSchema.optional()
});
var reasoningUIPartSchema = object$2({
  type: literal("reasoning"),
  text: string(),
  state: _enum(["streaming", "done"]).optional(),
  providerMetadata: providerMetadataSchema.optional()
});
var sourceUrlUIPartSchema = object$2({
  type: literal("source-url"),
  sourceId: string(),
  url: string(),
  title: string().optional(),
  providerMetadata: providerMetadataSchema.optional()
});
var sourceDocumentUIPartSchema = object$2({
  type: literal("source-document"),
  sourceId: string(),
  mediaType: string(),
  title: string(),
  filename: string().optional(),
  providerMetadata: providerMetadataSchema.optional()
});
var fileUIPartSchema = object$2({
  type: literal("file"),
  mediaType: string(),
  filename: string().optional(),
  url: string(),
  providerMetadata: providerMetadataSchema.optional()
});
var stepStartUIPartSchema = object$2({
  type: literal("step-start")
});
var dataUIPartSchema = object$2({
  type: string().startsWith("data-"),
  id: string().optional(),
  data: unknown()
});
var dynamicToolUIPartSchemas = [
  object$2({
    type: literal("dynamic-tool"),
    toolName: string(),
    toolCallId: string(),
    state: literal("input-streaming"),
    input: unknown().optional(),
    output: never().optional(),
    errorText: never().optional()
  }),
  object$2({
    type: literal("dynamic-tool"),
    toolName: string(),
    toolCallId: string(),
    state: literal("input-available"),
    input: unknown(),
    output: never().optional(),
    errorText: never().optional(),
    callProviderMetadata: providerMetadataSchema.optional()
  }),
  object$2({
    type: literal("dynamic-tool"),
    toolName: string(),
    toolCallId: string(),
    state: literal("output-available"),
    input: unknown(),
    output: unknown(),
    errorText: never().optional(),
    callProviderMetadata: providerMetadataSchema.optional(),
    preliminary: boolean().optional()
  }),
  object$2({
    type: literal("dynamic-tool"),
    toolName: string(),
    toolCallId: string(),
    state: literal("output-error"),
    input: unknown(),
    output: never().optional(),
    errorText: string(),
    callProviderMetadata: providerMetadataSchema.optional()
  })
];
var toolUIPartSchemas = [
  object$2({
    type: string().startsWith("tool-"),
    toolCallId: string(),
    state: literal("input-streaming"),
    providerExecuted: boolean().optional(),
    input: unknown().optional(),
    output: never().optional(),
    errorText: never().optional()
  }),
  object$2({
    type: string().startsWith("tool-"),
    toolCallId: string(),
    state: literal("input-available"),
    providerExecuted: boolean().optional(),
    input: unknown(),
    output: never().optional(),
    errorText: never().optional(),
    callProviderMetadata: providerMetadataSchema.optional()
  }),
  object$2({
    type: string().startsWith("tool-"),
    toolCallId: string(),
    state: literal("output-available"),
    providerExecuted: boolean().optional(),
    input: unknown(),
    output: unknown(),
    errorText: never().optional(),
    callProviderMetadata: providerMetadataSchema.optional(),
    preliminary: boolean().optional()
  }),
  object$2({
    type: string().startsWith("tool-"),
    toolCallId: string(),
    state: literal("output-error"),
    providerExecuted: boolean().optional(),
    input: unknown(),
    output: never().optional(),
    errorText: string(),
    callProviderMetadata: providerMetadataSchema.optional()
  })
];
object$2({
  id: string(),
  role: _enum(["system", "user", "assistant"]),
  metadata: unknown().optional(),
  parts: array(
    union([
      textUIPartSchema,
      reasoningUIPartSchema,
      sourceUrlUIPartSchema,
      sourceDocumentUIPartSchema,
      fileUIPartSchema,
      stepStartUIPartSchema,
      dataUIPartSchema,
      ...dynamicToolUIPartSchemas,
      ...toolUIPartSchemas
    ])
  )
});

const E_CANCELED = new Error('request for lock canceled');

var __awaiter$2 = function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Semaphore {
    constructor(_value, _cancelError = E_CANCELED) {
        this._value = _value;
        this._cancelError = _cancelError;
        this._queue = [];
        this._weightedWaiters = [];
    }
    acquire(weight = 1, priority = 0) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        return new Promise((resolve, reject) => {
            const task = { resolve, reject, weight, priority };
            const i = findIndexFromEnd(this._queue, (other) => priority <= other.priority);
            if (i === -1 && weight <= this._value) {
                // Needs immediate dispatch, skip the queue
                this._dispatchItem(task);
            }
            else {
                this._queue.splice(i + 1, 0, task);
            }
        });
    }
    runExclusive(callback_1) {
        return __awaiter$2(this, arguments, void 0, function* (callback, weight = 1, priority = 0) {
            const [value, release] = yield this.acquire(weight, priority);
            try {
                return yield callback(value);
            }
            finally {
                release();
            }
        });
    }
    waitForUnlock(weight = 1, priority = 0) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        if (this._couldLockImmediately(weight, priority)) {
            return Promise.resolve();
        }
        else {
            return new Promise((resolve) => {
                if (!this._weightedWaiters[weight - 1])
                    this._weightedWaiters[weight - 1] = [];
                insertSorted(this._weightedWaiters[weight - 1], { resolve, priority });
            });
        }
    }
    isLocked() {
        return this._value <= 0;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        this._value = value;
        this._dispatchQueue();
    }
    release(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        this._value += weight;
        this._dispatchQueue();
    }
    cancel() {
        this._queue.forEach((entry) => entry.reject(this._cancelError));
        this._queue = [];
    }
    _dispatchQueue() {
        this._drainUnlockWaiters();
        while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
            this._dispatchItem(this._queue.shift());
            this._drainUnlockWaiters();
        }
    }
    _dispatchItem(item) {
        const previousValue = this._value;
        this._value -= item.weight;
        item.resolve([previousValue, this._newReleaser(item.weight)]);
    }
    _newReleaser(weight) {
        let called = false;
        return () => {
            if (called)
                return;
            called = true;
            this.release(weight);
        };
    }
    _drainUnlockWaiters() {
        if (this._queue.length === 0) {
            for (let weight = this._value; weight > 0; weight--) {
                const waiters = this._weightedWaiters[weight - 1];
                if (!waiters)
                    continue;
                waiters.forEach((waiter) => waiter.resolve());
                this._weightedWaiters[weight - 1] = [];
            }
        }
        else {
            const queuedPriority = this._queue[0].priority;
            for (let weight = this._value; weight > 0; weight--) {
                const waiters = this._weightedWaiters[weight - 1];
                if (!waiters)
                    continue;
                const i = waiters.findIndex((waiter) => waiter.priority <= queuedPriority);
                (i === -1 ? waiters : waiters.splice(0, i))
                    .forEach((waiter => waiter.resolve()));
            }
        }
    }
    _couldLockImmediately(weight, priority) {
        return (this._queue.length === 0 || this._queue[0].priority < priority) &&
            weight <= this._value;
    }
}
function insertSorted(a, v) {
    const i = findIndexFromEnd(a, (other) => v.priority <= other.priority);
    a.splice(i + 1, 0, v);
}
function findIndexFromEnd(a, predicate) {
    for (let i = a.length - 1; i >= 0; i--) {
        if (predicate(a[i])) {
            return i;
        }
    }
    return -1;
}

var __awaiter$1 = function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Mutex {
    constructor(cancelError) {
        this._semaphore = new Semaphore(1, cancelError);
    }
    acquire() {
        return __awaiter$1(this, arguments, void 0, function* (priority = 0) {
            const [, releaser] = yield this._semaphore.acquire(1, priority);
            return releaser;
        });
    }
    runExclusive(callback, priority = 0) {
        return this._semaphore.runExclusive(() => callback(), 1, priority);
    }
    isLocked() {
        return this._semaphore.isLocked();
    }
    waitForUnlock(priority = 0) {
        return this._semaphore.waitForUnlock(1, priority);
    }
    release() {
        if (this._semaphore.isLocked())
            this._semaphore.release();
    }
    cancel() {
        return this._semaphore.cancel();
    }
}

const t=new Uint8Array([0,97,115,109,1,0,0,0,1,48,8,96,3,127,127,127,1,127,96,3,127,127,127,0,96,2,127,127,0,96,1,127,1,127,96,3,127,127,126,1,126,96,3,126,127,127,1,126,96,2,127,126,0,96,1,127,1,126,3,11,10,0,0,2,1,3,4,5,6,1,7,5,3,1,0,1,7,85,9,3,109,101,109,2,0,5,120,120,104,51,50,0,0,6,105,110,105,116,51,50,0,2,8,117,112,100,97,116,101,51,50,0,3,8,100,105,103,101,115,116,51,50,0,4,5,120,120,104,54,52,0,5,6,105,110,105,116,54,52,0,7,8,117,112,100,97,116,101,54,52,0,8,8,100,105,103,101,115,116,54,52,0,9,10,251,22,10,242,1,1,4,127,32,0,32,1,106,33,3,32,1,65,16,79,4,127,32,3,65,16,107,33,6,32,2,65,168,136,141,161,2,106,33,3,32,2,65,137,235,208,208,7,107,33,4,32,2,65,207,140,162,142,6,106,33,5,3,64,32,3,32,0,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,3,32,4,32,0,65,4,106,34,0,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,4,32,2,32,0,65,4,106,34,0,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,2,32,5,32,0,65,4,106,34,0,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,5,32,6,32,0,65,4,106,34,0,79,13,0,11,32,2,65,12,119,32,5,65,18,119,106,32,4,65,7,119,106,32,3,65,1,119,106,5,32,2,65,177,207,217,178,1,106,11,32,1,106,32,0,32,1,65,15,113,16,1,11,146,1,0,32,1,32,2,106,33,2,3,64,32,1,65,4,106,32,2,75,69,4,64,32,0,32,1,40,2,0,65,189,220,202,149,124,108,106,65,17,119,65,175,214,211,190,2,108,33,0,32,1,65,4,106,33,1,12,1,11,11,3,64,32,1,32,2,79,69,4,64,32,0,32,1,45,0,0,65,177,207,217,178,1,108,106,65,11,119,65,177,243,221,241,121,108,33,0,32,1,65,1,106,33,1,12,1,11,11,32,0,32,0,65,15,118,115,65,247,148,175,175,120,108,34,0,65,13,118,32,0,115,65,189,220,202,149,124,108,34,0,65,16,118,32,0,115,11,63,0,32,0,65,8,106,32,1,65,168,136,141,161,2,106,54,2,0,32,0,65,12,106,32,1,65,137,235,208,208,7,107,54,2,0,32,0,65,16,106,32,1,54,2,0,32,0,65,20,106,32,1,65,207,140,162,142,6,106,54,2,0,11,195,4,1,6,127,32,1,32,2,106,33,6,32,0,65,24,106,33,4,32,0,65,40,106,40,2,0,33,3,32,0,32,0,40,2,0,32,2,106,54,2,0,32,0,65,4,106,34,5,32,5,40,2,0,32,2,65,16,79,32,0,40,2,0,65,16,79,114,114,54,2,0,32,2,32,3,106,65,16,73,4,64,32,3,32,4,106,32,1,32,2,252,10,0,0,32,0,65,40,106,32,2,32,3,106,54,2,0,15,11,32,3,4,64,32,3,32,4,106,32,1,65,16,32,3,107,34,2,252,10,0,0,32,0,65,8,106,34,3,32,3,40,2,0,32,4,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,54,2,0,32,0,65,12,106,34,3,32,3,40,2,0,32,4,65,4,106,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,54,2,0,32,0,65,16,106,34,3,32,3,40,2,0,32,4,65,8,106,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,54,2,0,32,0,65,20,106,34,3,32,3,40,2,0,32,4,65,12,106,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,54,2,0,32,0,65,40,106,65,0,54,2,0,32,1,32,2,106,33,1,11,32,1,32,6,65,16,107,77,4,64,32,6,65,16,107,33,8,32,0,65,8,106,40,2,0,33,2,32,0,65,12,106,40,2,0,33,3,32,0,65,16,106,40,2,0,33,5,32,0,65,20,106,40,2,0,33,7,3,64,32,2,32,1,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,2,32,3,32,1,65,4,106,34,1,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,3,32,5,32,1,65,4,106,34,1,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,5,32,7,32,1,65,4,106,34,1,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,7,32,8,32,1,65,4,106,34,1,79,13,0,11,32,0,65,8,106,32,2,54,2,0,32,0,65,12,106,32,3,54,2,0,32,0,65,16,106,32,5,54,2,0,32,0,65,20,106,32,7,54,2,0,11,32,1,32,6,73,4,64,32,4,32,1,32,6,32,1,107,34,1,252,10,0,0,32,0,65,40,106,32,1,54,2,0,11,11,97,1,1,127,32,0,65,16,106,40,2,0,33,1,32,0,65,4,106,40,2,0,4,127,32,1,65,12,119,32,0,65,20,106,40,2,0,65,18,119,106,32,0,65,12,106,40,2,0,65,7,119,106,32,0,65,8,106,40,2,0,65,1,119,106,5,32,1,65,177,207,217,178,1,106,11,32,0,40,2,0,106,32,0,65,24,106,32,0,65,40,106,40,2,0,16,1,11,255,3,2,3,126,1,127,32,0,32,1,106,33,6,32,1,65,32,79,4,126,32,6,65,32,107,33,6,32,2,66,214,235,130,238,234,253,137,245,224,0,124,33,3,32,2,66,177,169,172,193,173,184,212,166,61,125,33,4,32,2,66,249,234,208,208,231,201,161,228,225,0,124,33,5,3,64,32,3,32,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,3,32,4,32,0,65,8,106,34,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,4,32,2,32,0,65,8,106,34,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,2,32,5,32,0,65,8,106,34,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,5,32,6,32,0,65,8,106,34,0,79,13,0,11,32,2,66,12,137,32,5,66,18,137,124,32,4,66,7,137,124,32,3,66,1,137,124,32,3,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,32,4,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,32,2,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,32,5,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,5,32,2,66,197,207,217,178,241,229,186,234,39,124,11,32,1,173,124,32,0,32,1,65,31,113,16,6,11,134,2,0,32,1,32,2,106,33,2,3,64,32,2,32,1,65,8,106,79,4,64,32,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,32,0,133,66,27,137,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,33,0,32,1,65,8,106,33,1,12,1,11,11,32,1,65,4,106,32,2,77,4,64,32,0,32,1,53,2,0,66,135,149,175,175,152,182,222,155,158,127,126,133,66,23,137,66,207,214,211,190,210,199,171,217,66,126,66,249,243,221,241,153,246,153,171,22,124,33,0,32,1,65,4,106,33,1,11,3,64,32,1,32,2,73,4,64,32,0,32,1,49,0,0,66,197,207,217,178,241,229,186,234,39,126,133,66,11,137,66,135,149,175,175,152,182,222,155,158,127,126,33,0,32,1,65,1,106,33,1,12,1,11,11,32,0,32,0,66,33,136,133,66,207,214,211,190,210,199,171,217,66,126,34,0,32,0,66,29,136,133,66,249,243,221,241,153,246,153,171,22,126,34,0,32,0,66,32,136,133,11,77,0,32,0,65,8,106,32,1,66,214,235,130,238,234,253,137,245,224,0,124,55,3,0,32,0,65,16,106,32,1,66,177,169,172,193,173,184,212,166,61,125,55,3,0,32,0,65,24,106,32,1,55,3,0,32,0,65,32,106,32,1,66,249,234,208,208,231,201,161,228,225,0,124,55,3,0,11,244,4,2,3,127,4,126,32,1,32,2,106,33,5,32,0,65,40,106,33,4,32,0,65,200,0,106,40,2,0,33,3,32,0,32,0,41,3,0,32,2,173,124,55,3,0,32,2,32,3,106,65,32,73,4,64,32,3,32,4,106,32,1,32,2,252,10,0,0,32,0,65,200,0,106,32,2,32,3,106,54,2,0,15,11,32,3,4,64,32,3,32,4,106,32,1,65,32,32,3,107,34,2,252,10,0,0,32,0,65,8,106,34,3,32,3,41,3,0,32,4,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,55,3,0,32,0,65,16,106,34,3,32,3,41,3,0,32,4,65,8,106,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,55,3,0,32,0,65,24,106,34,3,32,3,41,3,0,32,4,65,16,106,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,55,3,0,32,0,65,32,106,34,3,32,3,41,3,0,32,4,65,24,106,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,55,3,0,32,0,65,200,0,106,65,0,54,2,0,32,1,32,2,106,33,1,11,32,1,65,32,106,32,5,77,4,64,32,5,65,32,107,33,2,32,0,65,8,106,41,3,0,33,6,32,0,65,16,106,41,3,0,33,7,32,0,65,24,106,41,3,0,33,8,32,0,65,32,106,41,3,0,33,9,3,64,32,6,32,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,7,32,1,65,8,106,34,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,7,32,8,32,1,65,8,106,34,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,8,32,9,32,1,65,8,106,34,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,9,32,2,32,1,65,8,106,34,1,79,13,0,11,32,0,65,8,106,32,6,55,3,0,32,0,65,16,106,32,7,55,3,0,32,0,65,24,106,32,8,55,3,0,32,0,65,32,106,32,9,55,3,0,11,32,1,32,5,73,4,64,32,4,32,1,32,5,32,1,107,34,1,252,10,0,0,32,0,65,200,0,106,32,1,54,2,0,11,11,188,2,1,5,126,32,0,65,24,106,41,3,0,33,1,32,0,41,3,0,34,2,66,32,90,4,126,32,0,65,8,106,41,3,0,34,3,66,1,137,32,0,65,16,106,41,3,0,34,4,66,7,137,124,32,1,66,12,137,32,0,65,32,106,41,3,0,34,5,66,18,137,124,124,32,3,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,32,4,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,32,1,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,32,5,66,207,214,211,190,210,199,171,217,66,126,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,157,163,181,234,131,177,141,138,250,0,125,5,32,1,66,197,207,217,178,241,229,186,234,39,124,11,32,2,124,32,0,65,40,106,32,2,66,31,131,167,16,6,11]);async function e(){return function(t){const{exports:{mem:e,xxh32:n,xxh64:r,init32:i,update32:a,digest32:o,init64:s,update64:u,digest64:c}}=t;let h=new Uint8Array(e.buffer);function g(t,n){if(e.buffer.byteLength<t+n){const r=Math.ceil((t+n-e.buffer.byteLength)/65536);e.grow(r),h=new Uint8Array(e.buffer);}}function f(t,e,n,r,i,a){g(t);const o=new Uint8Array(t);return h.set(o),n(0,e),o.set(h.subarray(0,t)),{update(e){let n;return h.set(o),"string"==typeof e?(g(3*e.length,t),n=w.encodeInto(e,h.subarray(t)).written):(g(e.byteLength,t),h.set(e,t),n=e.byteLength),r(0,t,n),o.set(h.subarray(0,t)),this},digest:()=>(h.set(o),a(i(0)))}}function y(t){return t>>>0}const b=2n**64n-1n;function d(t){return t&b}const w=new TextEncoder,l=0,p=0n;function x(t,e=l){return g(3*t.length,0),y(n(0,w.encodeInto(t,h).written,e))}function L(t,e=p){return g(3*t.length,0),d(r(0,w.encodeInto(t,h).written,e))}return {h32:x,h32ToString:(t,e=l)=>x(t,e).toString(16).padStart(8,"0"),h32Raw:(t,e=l)=>(g(t.byteLength,0),h.set(t),y(n(0,t.byteLength,e))),create32:(t=l)=>f(48,t,i,a,o,y),h64:L,h64ToString:(t,e=p)=>L(t,e).toString(16).padStart(16,"0"),h64Raw:(t,e=p)=>(g(t.byteLength,0),h.set(t),d(r(0,t.byteLength,e))),create64:(t=p)=>f(88,t,s,u,c,d)}}((await WebAssembly.instantiate(t)).instance)}

function isZodType(value) {
  return typeof value === "object" && value !== null && "_def" in value && "parse" in value && typeof value.parse === "function" && "safeParse" in value && typeof value.safeParse === "function";
}
function convertSchemaToZod(schema) {
  if (isZodType(schema)) {
    return schema;
  } else {
    const jsonSchemaToConvert = "jsonSchema" in schema ? schema.jsonSchema : schema;
    try {
      {
        return convertJsonSchemaToZod(jsonSchemaToConvert);
      }
    } catch (e) {
      const errorMessage = `[Schema Builder] Failed to convert schema parameters to Zod. Original schema: ${JSON.stringify(jsonSchemaToConvert)}`;
      console.error(errorMessage, e);
      throw new Error(errorMessage + (e instanceof Error ? `
${e.stack}` : "\nUnknown error object"));
    }
  }
}

// src/index.ts
var updateWorkingMemoryTool = (memoryConfig) => {
  const schema = memoryConfig?.workingMemory?.schema;
  let inputSchema = object$2({
    memory: string().describe(`The Markdown formatted working memory content to store. This MUST be a string. Never pass an object.`)
  });
  if (schema) {
    inputSchema = object$2({
      memory: schema instanceof ZodObject ? schema : convertSchemaToZod({ jsonSchema: schema }).describe(
        `The JSON formatted working memory content to store.`
      )
    });
  }
  return createTool({
    id: "update-working-memory",
    description: `Update the working memory with new information. Any data not included will be overwritten.${schema ? " Always pass data as string to the memory field. Never pass an object." : ""}`,
    inputSchema,
    execute: async (params) => {
      const { context, threadId, memory, resourceId } = params;
      if (!threadId || !memory || !resourceId) {
        throw new Error("Thread ID, Memory instance, and resourceId are required for working memory updates");
      }
      let thread = await memory.getThreadById({ threadId });
      if (!thread) {
        thread = await memory.createThread({
          threadId,
          resourceId,
          memoryConfig
        });
      }
      if (thread.resourceId && thread.resourceId !== resourceId) {
        throw new Error(`Thread with id ${threadId} resourceId does not match the current resourceId ${resourceId}`);
      }
      const workingMemory = typeof context.memory === "string" ? context.memory : JSON.stringify(context.memory);
      await memory.updateWorkingMemory({
        threadId,
        resourceId,
        workingMemory,
        memoryConfig
      });
      return { success: true };
    }
  });
};
var __experimental_updateWorkingMemoryToolVNext = (config) => {
  return createTool({
    id: "update-working-memory",
    description: "Update the working memory with new information.",
    inputSchema: object$2({
      newMemory: string().optional().describe(
        `The ${config.workingMemory?.schema ? "JSON" : "Markdown"} formatted working memory content to store`
      ),
      searchString: string().optional().describe(
        "The working memory string to find. Will be replaced with the newMemory string. If this is omitted or doesn't exist, the newMemory string will be appended to the end of your working memory. Replacing single lines at a time is encouraged for greater accuracy. If updateReason is not 'append-new-memory', this search string must be provided or the tool call will be rejected."
      ),
      updateReason: _enum(["append-new-memory", "clarify-existing-memory", "replace-irrelevant-memory"]).optional().describe(
        "The reason you're updating working memory. Passing any value other than 'append-new-memory' requires a searchString to be provided. Defaults to append-new-memory"
      )
    }),
    execute: async (params) => {
      const { context, threadId, memory, resourceId } = params;
      if (!threadId || !memory || !resourceId) {
        throw new Error("Thread ID, Memory instance, and resourceId are required for working memory updates");
      }
      let thread = await memory.getThreadById({ threadId });
      if (!thread) {
        thread = await memory.createThread({
          threadId,
          resourceId,
          memoryConfig: config
        });
      }
      if (thread.resourceId && thread.resourceId !== resourceId) {
        throw new Error(`Thread with id ${threadId} resourceId does not match the current resourceId ${resourceId}`);
      }
      const workingMemory = context.newMemory || "";
      if (!context.updateReason) context.updateReason = `append-new-memory`;
      if (context.searchString && config.workingMemory?.scope === `resource` && context.updateReason === `replace-irrelevant-memory`) {
        context.searchString = void 0;
      }
      if (context.updateReason === `append-new-memory` && context.searchString) {
        context.searchString = void 0;
      }
      if (context.updateReason !== `append-new-memory` && !context.searchString) {
        return {
          success: false,
          reason: `updateReason was ${context.updateReason} but no searchString was provided. Unable to replace undefined with "${context.newMemory}"`
        };
      }
      const result = await memory.__experimental_updateWorkingMemoryVNext({
        threadId,
        resourceId,
        workingMemory,
        searchString: context.searchString,
        memoryConfig: config
      });
      if (result) {
        return result;
      }
      return { success: true };
    }
  });
};

// src/index.ts
var CHARS_PER_TOKEN = 4;
var DEFAULT_MESSAGE_RANGE = { before: 2, after: 2 };
var DEFAULT_TOP_K = 2;
var isZodObject = (v) => v instanceof ZodObject;
var Memory = class extends MastraMemory {
  constructor(config = {}) {
    super({ name: "Memory", ...config });
    const mergedConfig = this.getMergedThreadConfig({
      workingMemory: config.options?.workingMemory || {
        // these defaults are now set inside @mastra/core/memory in getMergedThreadConfig.
        // In a future release we can remove it from this block - for now if we remove it
        // and someone bumps @mastra/memory without bumping @mastra/core the defaults wouldn't exist yet
        enabled: false,
        template: this.defaultWorkingMemoryTemplate
      }
    });
    this.threadConfig = mergedConfig;
  }
  async validateThreadIsOwnedByResource(threadId, resourceId, config) {
    const resourceScope = typeof config?.semanticRecall === "object" && config?.semanticRecall?.scope === "resource";
    const thread = await this.storage.getThreadById({ threadId });
    if (!thread && !resourceScope) {
      throw new Error(`No thread found with id ${threadId}`);
    }
    if (thread && thread.resourceId !== resourceId) {
      throw new Error(
        `Thread with id ${threadId} is for resource with id ${thread.resourceId} but resource ${resourceId} was queried.`
      );
    }
  }
  checkStorageFeatureSupport(config) {
    if (typeof config.semanticRecall === `object` && config.semanticRecall.scope === `resource` && !this.storage.supports.selectByIncludeResourceScope) {
      throw new Error(
        `Memory error: Attached storage adapter "${this.storage.name || "unknown"}" doesn't support semanticRecall: { scope: "resource" } yet and currently only supports per-thread semantic recall.`
      );
    }
    if (config.workingMemory?.enabled && config.workingMemory.scope === `resource` && !this.storage.supports.resourceWorkingMemory) {
      throw new Error(
        `Memory error: Attached storage adapter "${this.storage.name || "unknown"}" doesn't support workingMemory: { scope: "resource" } yet and currently only supports per-thread working memory. Supported adapters: LibSQL, PostgreSQL, Upstash.`
      );
    }
  }
  async query({
    threadId,
    resourceId,
    selectBy,
    threadConfig
  }) {
    const config = this.getMergedThreadConfig(threadConfig || {});
    if (resourceId) await this.validateThreadIsOwnedByResource(threadId, resourceId, config);
    const vectorResults = [];
    this.logger.debug(`Memory query() with:`, {
      threadId,
      selectBy,
      threadConfig
    });
    this.checkStorageFeatureSupport(config);
    const defaultRange = DEFAULT_MESSAGE_RANGE;
    const defaultTopK = DEFAULT_TOP_K;
    const vectorConfig = typeof config?.semanticRecall === `boolean` ? {
      topK: defaultTopK,
      messageRange: defaultRange
    } : {
      topK: config?.semanticRecall?.topK ?? defaultTopK,
      messageRange: config?.semanticRecall?.messageRange ?? defaultRange
    };
    const resourceScope = typeof config?.semanticRecall === "object" && config?.semanticRecall?.scope === `resource`;
    if (config?.semanticRecall && selectBy?.vectorSearchString && this.vector) {
      const { embeddings, dimension } = await this.embedMessageContent(selectBy.vectorSearchString);
      const { indexName } = await this.createEmbeddingIndex(dimension, config);
      await Promise.all(
        embeddings.map(async (embedding) => {
          if (typeof this.vector === `undefined`) {
            throw new Error(
              `Tried to query vector index ${indexName} but this Memory instance doesn't have an attached vector db.`
            );
          }
          vectorResults.push(
            ...await this.vector.query({
              indexName,
              queryVector: embedding,
              topK: vectorConfig.topK,
              filter: resourceScope ? {
                resource_id: resourceId
              } : {
                thread_id: threadId
              }
            })
          );
        })
      );
    }
    let rawMessages;
    if (selectBy?.pagination) {
      const paginatedResult = await this.storage.getMessagesPaginated({
        threadId,
        resourceId,
        format: "v2",
        selectBy: {
          ...selectBy,
          ...vectorResults?.length ? {
            include: vectorResults.map((r) => ({
              id: r.metadata?.message_id,
              threadId: r.metadata?.thread_id,
              withNextMessages: typeof vectorConfig.messageRange === "number" ? vectorConfig.messageRange : vectorConfig.messageRange.after,
              withPreviousMessages: typeof vectorConfig.messageRange === "number" ? vectorConfig.messageRange : vectorConfig.messageRange.before
            }))
          } : {}
        },
        threadConfig: config
      });
      rawMessages = paginatedResult.messages;
    } else {
      rawMessages = await this.storage.getMessages({
        threadId,
        resourceId,
        format: "v2",
        selectBy: {
          ...selectBy,
          ...vectorResults?.length ? {
            include: vectorResults.map((r) => ({
              id: r.metadata?.message_id,
              threadId: r.metadata?.thread_id,
              withNextMessages: typeof vectorConfig.messageRange === "number" ? vectorConfig.messageRange : vectorConfig.messageRange.after,
              withPreviousMessages: typeof vectorConfig.messageRange === "number" ? vectorConfig.messageRange : vectorConfig.messageRange.before
            }))
          } : {}
        },
        threadConfig: config
      });
    }
    const list = new MessageList({ threadId, resourceId }).add(rawMessages, "memory");
    return {
      get messages() {
        const v1Messages = list.get.all.v1();
        if (selectBy?.last && v1Messages.length > selectBy.last) {
          return v1Messages.slice(v1Messages.length - selectBy.last);
        }
        return v1Messages;
      },
      get uiMessages() {
        return list.get.all.ui();
      },
      get messagesV2() {
        return list.get.all.v2();
      }
    };
  }
  async rememberMessages({
    threadId,
    resourceId,
    vectorMessageSearch,
    config
  }) {
    const threadConfig = this.getMergedThreadConfig(config || {});
    if (resourceId) await this.validateThreadIsOwnedByResource(threadId, resourceId, threadConfig);
    if (!threadConfig.lastMessages && !threadConfig.semanticRecall) {
      return {
        messages: [],
        messagesV2: []
      };
    }
    const messagesResult = await this.query({
      resourceId,
      threadId,
      selectBy: {
        last: threadConfig.lastMessages,
        vectorSearchString: threadConfig.semanticRecall && vectorMessageSearch ? vectorMessageSearch : void 0
      },
      threadConfig: config,
      format: "v2"
    });
    const list = new MessageList({ threadId, resourceId }).add(messagesResult.messagesV2, "memory");
    this.logger.debug(`Remembered message history includes ${messagesResult.messages.length} messages.`);
    return { messages: list.get.all.v1(), messagesV2: list.get.all.v2() };
  }
  async getThreadById({ threadId }) {
    return this.storage.getThreadById({ threadId });
  }
  async getThreadsByResourceId({
    resourceId,
    orderBy,
    sortDirection
  }) {
    return this.storage.getThreadsByResourceId({ resourceId, orderBy, sortDirection });
  }
  async getThreadsByResourceIdPaginated({
    resourceId,
    page,
    perPage,
    orderBy,
    sortDirection
  }) {
    return this.storage.getThreadsByResourceIdPaginated({
      resourceId,
      page,
      perPage,
      orderBy,
      sortDirection
    });
  }
  async handleWorkingMemoryFromMetadata({
    workingMemory,
    resourceId,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig || {});
    if (config.workingMemory?.enabled) {
      this.checkStorageFeatureSupport(config);
      const scope = config.workingMemory.scope || "thread";
      if (scope === "resource" && resourceId) {
        await this.storage.updateResource({
          resourceId,
          workingMemory
        });
      }
    }
  }
  async saveThread({
    thread,
    memoryConfig
  }) {
    const savedThread = await this.storage.saveThread({ thread });
    if (thread.metadata?.workingMemory && typeof thread.metadata.workingMemory === "string" && thread.resourceId) {
      await this.handleWorkingMemoryFromMetadata({
        workingMemory: thread.metadata.workingMemory,
        resourceId: thread.resourceId,
        memoryConfig
      });
    }
    return savedThread;
  }
  async updateThread({
    id,
    title,
    metadata,
    memoryConfig
  }) {
    const updatedThread = await this.storage.updateThread({
      id,
      title,
      metadata
    });
    if (metadata?.workingMemory && typeof metadata.workingMemory === "string" && updatedThread.resourceId) {
      await this.handleWorkingMemoryFromMetadata({
        workingMemory: metadata.workingMemory,
        resourceId: updatedThread.resourceId,
        memoryConfig
      });
    }
    return updatedThread;
  }
  async deleteThread(threadId) {
    await this.storage.deleteThread({ threadId });
  }
  async updateWorkingMemory({
    threadId,
    resourceId,
    workingMemory,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig || {});
    if (!config.workingMemory?.enabled) {
      throw new Error("Working memory is not enabled for this memory instance");
    }
    this.checkStorageFeatureSupport(config);
    const scope = config.workingMemory.scope || "thread";
    if (scope === "resource" && resourceId) {
      await this.storage.updateResource({
        resourceId,
        workingMemory
      });
    } else {
      const thread = await this.storage.getThreadById({ threadId });
      if (!thread) {
        throw new Error(`Thread ${threadId} not found`);
      }
      await this.storage.updateThread({
        id: threadId,
        title: thread.title || "Untitled Thread",
        metadata: {
          ...thread.metadata,
          workingMemory
        }
      });
    }
  }
  updateWorkingMemoryMutexes = /* @__PURE__ */ new Map();
  /**
   * @warning experimental! can be removed or changed at any time
   */
  async __experimental_updateWorkingMemoryVNext({
    threadId,
    resourceId,
    workingMemory,
    searchString,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig || {});
    if (!config.workingMemory?.enabled) {
      throw new Error("Working memory is not enabled for this memory instance");
    }
    this.checkStorageFeatureSupport(config);
    const mutexKey = memoryConfig?.workingMemory?.scope === `resource` ? `resource-${resourceId}` : `thread-${threadId}`;
    const mutex = this.updateWorkingMemoryMutexes.has(mutexKey) ? this.updateWorkingMemoryMutexes.get(mutexKey) : new Mutex();
    this.updateWorkingMemoryMutexes.set(mutexKey, mutex);
    const release = await mutex.acquire();
    try {
      const existingWorkingMemory = await this.getWorkingMemory({ threadId, resourceId, memoryConfig }) || "";
      const template = await this.getWorkingMemoryTemplate({ memoryConfig });
      let reason = "";
      if (existingWorkingMemory) {
        if (searchString && existingWorkingMemory?.includes(searchString)) {
          workingMemory = existingWorkingMemory.replace(searchString, workingMemory);
          reason = `found and replaced searchString with newMemory`;
        } else if (existingWorkingMemory.includes(workingMemory) || template?.content?.trim() === workingMemory.trim()) {
          return {
            success: false,
            reason: `attempted to insert duplicate data into working memory. this entry was skipped`
          };
        } else {
          if (searchString) {
            reason = `attempted to replace working memory string that doesn't exist. Appending to working memory instead.`;
          } else {
            reason = `appended newMemory to end of working memory`;
          }
          workingMemory = existingWorkingMemory + `
${workingMemory}`;
        }
      } else if (workingMemory === template?.content) {
        return {
          success: false,
          reason: `try again when you have data to add. newMemory was equal to the working memory template`
        };
      } else {
        reason = `started new working memory`;
      }
      workingMemory = template?.content ? workingMemory.replaceAll(template?.content, "") : workingMemory;
      const scope = config.workingMemory.scope || "thread";
      if (scope === "resource" && resourceId) {
        await this.storage.updateResource({
          resourceId,
          workingMemory
        });
        if (reason) {
          return { success: true, reason };
        }
      } else {
        const thread = await this.storage.getThreadById({ threadId });
        if (!thread) {
          throw new Error(`Thread ${threadId} not found`);
        }
        await this.storage.updateThread({
          id: threadId,
          title: thread.title || "Untitled Thread",
          metadata: {
            ...thread.metadata,
            workingMemory
          }
        });
      }
      return { success: true, reason };
    } catch (e) {
      this.logger.error(e instanceof Error ? e.stack || e.message : JSON.stringify(e));
      return { success: false, reason: "Tool error." };
    } finally {
      release();
    }
  }
  chunkText(text, tokenSize = 4096) {
    const charSize = tokenSize * CHARS_PER_TOKEN;
    const chunks = [];
    let currentChunk = "";
    const words = text.split(/\s+/);
    for (const word of words) {
      const wordWithSpace = currentChunk ? " " + word : word;
      if (currentChunk.length + wordWithSpace.length > charSize) {
        chunks.push(currentChunk);
        currentChunk = word;
      } else {
        currentChunk += wordWithSpace;
      }
    }
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    return chunks;
  }
  hasher = e();
  // embedding is computationally expensive so cache content -> embeddings/chunks
  embeddingCache = /* @__PURE__ */ new Map();
  firstEmbed;
  async embedMessageContent(content) {
    const key = (await this.hasher).h32(content);
    const cached = this.embeddingCache.get(key);
    if (cached) return cached;
    const chunks = this.chunkText(content);
    if (typeof this.embedder === `undefined`) {
      throw new Error(`Tried to embed message content but this Memory instance doesn't have an attached embedder.`);
    }
    const isFastEmbed = this.embedder.provider === `fastembed`;
    if (isFastEmbed && this.firstEmbed instanceof Promise) {
      await this.firstEmbed;
    }
    const promise = (this.embedder.specificationVersion === `v2` ? embedMany : embedMany$1)({
      values: chunks,
      maxRetries: 3,
      // @ts-ignore
      model: this.embedder
    });
    if (isFastEmbed && !this.firstEmbed) this.firstEmbed = promise;
    const { embeddings } = await promise;
    const result = {
      embeddings,
      chunks,
      dimension: embeddings[0]?.length
    };
    this.embeddingCache.set(key, result);
    return result;
  }
  async saveMessages({
    messages,
    memoryConfig,
    format = `v1`
  }) {
    const updatedMessages = messages.map((m) => {
      if (MessageList.isMastraMessageV1(m)) {
        return this.updateMessageToHideWorkingMemory(m);
      }
      if (!m.type) m.type = `v2`;
      return this.updateMessageToHideWorkingMemoryV2(m);
    }).filter((m) => Boolean(m));
    const config = this.getMergedThreadConfig(memoryConfig);
    const result = this.storage.saveMessages({
      messages: new MessageList().add(updatedMessages, "memory").get.all.v2(),
      format: "v2"
    });
    if (this.vector && config.semanticRecall) {
      let indexName;
      await Promise.all(
        updatedMessages.map(async (message) => {
          let textForEmbedding = null;
          if (MessageList.isMastraMessageV2(message)) {
            if (message.content.content && typeof message.content.content === "string" && message.content.content.trim() !== "") {
              textForEmbedding = message.content.content;
            } else if (message.content.parts && message.content.parts.length > 0) {
              const joined = message.content.parts.filter((part) => part.type === "text").map((part) => part.text).join(" ").trim();
              if (joined) textForEmbedding = joined;
            }
          } else if (MessageList.isMastraMessageV1(message)) {
            if (message.content && typeof message.content === "string" && message.content.trim() !== "") {
              textForEmbedding = message.content;
            } else if (message.content && Array.isArray(message.content) && message.content.length > 0) {
              const joined = message.content.filter((part) => part.type === "text").map((part) => part.text).join(" ").trim();
              if (joined) textForEmbedding = joined;
            }
          }
          if (!textForEmbedding) return;
          const { embeddings, chunks, dimension } = await this.embedMessageContent(textForEmbedding);
          if (typeof indexName === `undefined`) {
            indexName = this.createEmbeddingIndex(dimension, config).then((result2) => result2.indexName);
          }
          if (typeof this.vector === `undefined`) {
            throw new Error(
              `Tried to upsert embeddings to index ${indexName} but this Memory instance doesn't have an attached vector db.`
            );
          }
          await this.vector.upsert({
            indexName: await indexName,
            vectors: embeddings,
            metadata: chunks.map(() => ({
              message_id: message.id,
              thread_id: message.threadId,
              resource_id: message.resourceId
            }))
          });
        })
      );
    }
    if (format === `v1`) return new MessageList().add(await result, "memory").get.all.v1();
    return result;
  }
  updateMessageToHideWorkingMemory(message) {
    const workingMemoryRegex = /<working_memory>([^]*?)<\/working_memory>/g;
    if (typeof message?.content === `string`) {
      return {
        ...message,
        content: message.content.replace(workingMemoryRegex, ``).trim()
      };
    } else if (Array.isArray(message?.content)) {
      const filteredContent = message.content.filter(
        (content) => content.type !== "tool-call" && content.type !== "tool-result" || content.toolName !== "updateWorkingMemory"
      );
      const newContent = filteredContent.map((content) => {
        if (content.type === "text") {
          return {
            ...content,
            text: content.text.replace(workingMemoryRegex, "").trim()
          };
        }
        return { ...content };
      });
      if (!newContent.length) return null;
      return { ...message, content: newContent };
    } else {
      return { ...message };
    }
  }
  updateMessageToHideWorkingMemoryV2(message) {
    const workingMemoryRegex = /<working_memory>([^]*?)<\/working_memory>/g;
    const newMessage = { ...message, content: { ...message.content } };
    if (newMessage.content.content && typeof newMessage.content.content === "string") {
      newMessage.content.content = newMessage.content.content.replace(workingMemoryRegex, "").trim();
    }
    if (newMessage.content.parts) {
      newMessage.content.parts = newMessage.content.parts.filter((part) => {
        if (part.type === "tool-invocation") {
          return part.toolInvocation.toolName !== "updateWorkingMemory";
        }
        return true;
      }).map((part) => {
        if (part.type === "text") {
          return {
            ...part,
            text: part.text.replace(workingMemoryRegex, "").trim()
          };
        }
        return part;
      });
      if (newMessage.content.parts.length === 0) {
        return null;
      }
    }
    return newMessage;
  }
  parseWorkingMemory(text) {
    if (!this.threadConfig.workingMemory?.enabled) return null;
    const workingMemoryRegex = /<working_memory>([^]*?)<\/working_memory>/g;
    const matches = text.match(workingMemoryRegex);
    const match = matches?.[0];
    if (match) {
      return match.replace(/<\/?working_memory>/g, "").trim();
    }
    return null;
  }
  async getWorkingMemory({
    threadId,
    resourceId,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig || {});
    if (!config.workingMemory?.enabled) {
      return null;
    }
    this.checkStorageFeatureSupport(config);
    const scope = config.workingMemory.scope || "thread";
    let workingMemoryData = null;
    if (scope === "resource" && resourceId) {
      const resource = await this.storage.getResourceById({ resourceId });
      workingMemoryData = resource?.workingMemory || null;
    } else {
      const thread = await this.storage.getThreadById({ threadId });
      workingMemoryData = thread?.metadata?.workingMemory;
    }
    if (!workingMemoryData) {
      return null;
    }
    return workingMemoryData;
  }
  /**
   * Gets the working memory template for the current memory configuration.
   * Supports both ZodObject and JSONSchema7 schemas.
   *
   * @param memoryConfig - The memory configuration containing the working memory settings
   * @returns The working memory template with format and content, or null if working memory is disabled
   */
  async getWorkingMemoryTemplate({
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig || {});
    if (!config.workingMemory?.enabled) {
      return null;
    }
    if (config.workingMemory?.schema) {
      try {
        const schema = config.workingMemory.schema;
        let convertedSchema;
        if (isZodObject(schema)) {
          convertedSchema = zodToJsonSchema$1(schema);
        } else {
          convertedSchema = schema;
        }
        return { format: "json", content: JSON.stringify(convertedSchema) };
      } catch (error) {
        this.logger.error("Error converting schema", error);
        throw error;
      }
    }
    const memory = config.workingMemory.template || this.defaultWorkingMemoryTemplate;
    return { format: "markdown", content: memory.trim() };
  }
  async getSystemMessage({
    threadId,
    resourceId,
    memoryConfig
  }) {
    const config = this.getMergedThreadConfig(memoryConfig);
    if (!config.workingMemory?.enabled) {
      return null;
    }
    const workingMemoryTemplate = await this.getWorkingMemoryTemplate({ memoryConfig: config });
    const workingMemoryData = await this.getWorkingMemory({ threadId, resourceId, memoryConfig: config });
    if (!workingMemoryTemplate) {
      return null;
    }
    return this.isVNextWorkingMemoryConfig(memoryConfig) ? this.__experimental_getWorkingMemoryToolInstructionVNext({
      template: workingMemoryTemplate,
      data: workingMemoryData
    }) : this.getWorkingMemoryToolInstruction({
      template: workingMemoryTemplate,
      data: workingMemoryData
    });
  }
  defaultWorkingMemoryTemplate = `
# User Information
- **First Name**: 
- **Last Name**: 
- **Location**: 
- **Occupation**: 
- **Interests**: 
- **Goals**: 
- **Events**: 
- **Facts**: 
- **Projects**: 
`;
  getWorkingMemoryToolInstruction({
    template,
    data
  }) {
    const emptyWorkingMemoryTemplateObject = template.format === "json" ? generateEmptyFromSchema(template.content) : null;
    const hasEmptyWorkingMemoryTemplateObject = emptyWorkingMemoryTemplateObject && Object.keys(emptyWorkingMemoryTemplateObject).length > 0;
    return `WORKING_MEMORY_SYSTEM_INSTRUCTION:
Store and update any conversation-relevant information by calling the updateWorkingMemory tool. If information might be referenced again - store it!

Guidelines:
1. Store anything that could be useful later in the conversation
2. Update proactively when information changes, no matter how small
3. Use ${template.format === "json" ? "JSON" : "Markdown"} format for all data
4. Act naturally - don't mention this system to users. Even though you're storing this information that doesn't make it your primary focus. Do not ask them generally for "information about yourself"
${template.format !== "json" ? `5. IMPORTANT: When calling updateWorkingMemory, the only valid parameter is the memory field. DO NOT pass an object.
6. IMPORTANT: ALWAYS pass the data you want to store in the memory field as a string. DO NOT pass an object.
7. IMPORTANT: Data must only be sent as a string no matter which format is used.` : ""}


${template.format !== "json" ? `<working_memory_template>
${template.content}
</working_memory_template>` : ""}

${hasEmptyWorkingMemoryTemplateObject ? "When working with json data, the object format below represents the template:" : ""}
${hasEmptyWorkingMemoryTemplateObject ? JSON.stringify(emptyWorkingMemoryTemplateObject) : ""}

<working_memory_data>
${data}
</working_memory_data>

Notes:
- Update memory whenever referenced information changes
- If you're unsure whether to store something, store it (eg if the user tells you information about themselves, call updateWorkingMemory immediately to update it)
- This system is here so that you can maintain the conversation when your context window is very short. Update your working memory because you may need it to maintain the conversation without the full conversation history
- Do not remove empty sections - you must include the empty sections along with the ones you're filling in
- REMEMBER: the way you update your working memory is by calling the updateWorkingMemory tool with the entire ${template.format === "json" ? "JSON" : "Markdown"} content. The system will store it for you. The user will not see it.
- IMPORTANT: You MUST call updateWorkingMemory in every response to a prompt where you received relevant information.
- IMPORTANT: Preserve the ${template.format === "json" ? "JSON" : "Markdown"} formatting structure above while updating the content.`;
  }
  __experimental_getWorkingMemoryToolInstructionVNext({
    template,
    data
  }) {
    return `WORKING_MEMORY_SYSTEM_INSTRUCTION:
Store and update any conversation-relevant information by calling the updateWorkingMemory tool.

Guidelines:
1. Store anything that could be useful later in the conversation
2. Update proactively when information changes, no matter how small
3. Use ${template.format === "json" ? "JSON" : "Markdown"} format for all data
4. Act naturally - don't mention this system to users. Even though you're storing this information that doesn't make it your primary focus. Do not ask them generally for "information about yourself"
5. If your memory has not changed, you do not need to call the updateWorkingMemory tool. By default it will persist and be available for you in future interactions
6. Information not being relevant to the current conversation is not a valid reason to replace or remove working memory information. Your working memory spans across multiple conversations and may be needed again later, even if it's not currently relevant.

<working_memory_template>
${template.content}
</working_memory_template>

<working_memory_data>
${data}
</working_memory_data>

Notes:
- Update memory whenever referenced information changes
${template.content !== this.defaultWorkingMemoryTemplate ? `- Only store information if it's in the working memory template, do not store other information unless the user asks you to remember it, as that non-template information may be irrelevant` : `- If you're unsure whether to store something, store it (eg if the user tells you information about themselves, call updateWorkingMemory immediately to update it)
`}
- This system is here so that you can maintain the conversation when your context window is very short. Update your working memory because you may need it to maintain the conversation without the full conversation history
- REMEMBER: the way you update your working memory is by calling the updateWorkingMemory tool with the ${template.format === "json" ? "JSON" : "Markdown"} content. The system will store it for you. The user will not see it. 
- IMPORTANT: You MUST call updateWorkingMemory in every response to a prompt where you received relevant information if that information is not already stored.
- IMPORTANT: Preserve the ${template.format === "json" ? "JSON" : "Markdown"} formatting structure above while updating the content.
`;
  }
  isVNextWorkingMemoryConfig(config) {
    if (!config?.workingMemory) return false;
    const isMDWorkingMemory = !(`schema` in config.workingMemory) && (typeof config.workingMemory.template === `string` || config.workingMemory.template) && config.workingMemory;
    return Boolean(isMDWorkingMemory && isMDWorkingMemory.version === `vnext`);
  }
  getTools(config) {
    const mergedConfig = this.getMergedThreadConfig(config);
    if (mergedConfig.workingMemory?.enabled) {
      return {
        updateWorkingMemory: this.isVNextWorkingMemoryConfig(mergedConfig) ? (
          // use the new experimental tool
          __experimental_updateWorkingMemoryToolVNext(mergedConfig)
        ) : updateWorkingMemoryTool(mergedConfig)
      };
    }
    return {};
  }
  /**
   * Updates the metadata of a list of messages
   * @param messages - The list of messages to update
   * @returns The list of updated messages
   */
  async updateMessages({
    messages
  }) {
    if (messages.length === 0) return [];
    return this.storage.updateMessages({ messages });
  }
  /**
   * Deletes one or more messages
   * @param input - Must be an array containing either:
   *   - Message ID strings
   *   - Message objects with 'id' properties
   * @returns Promise that resolves when all messages are deleted
   */
  async deleteMessages(input) {
    let messageIds;
    if (!Array.isArray(input)) {
      throw new Error("Invalid input: must be an array of message IDs or message objects");
    }
    if (input.length === 0) {
      return;
    }
    messageIds = input.map((item) => {
      if (typeof item === "string") {
        return item;
      } else if (item && typeof item === "object" && "id" in item) {
        return item.id;
      } else {
        throw new Error("Invalid input: array items must be strings or objects with an id property");
      }
    });
    const invalidIds = messageIds.filter((id) => !id || typeof id !== "string");
    if (invalidIds.length > 0) {
      throw new Error("All message IDs must be non-empty strings");
    }
    await this.storage.deleteMessages(messageIds);
  }
};

export { Memory as M, tokenError as t };
