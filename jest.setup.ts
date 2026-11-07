import "@testing-library/jest-dom";
import { webcrypto } from "node:crypto";
import { TextDecoder, TextEncoder } from "node:util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  Object.defineProperty(globalThis, "TextDecoder", {
    configurable: true,
    value: TextDecoder,
  });
}

if (!globalThis.crypto?.subtle) {
  Object.defineProperty(globalThis, "crypto", {
    configurable: true,
    value: webcrypto,
  });
}

if (typeof global.btoa === "undefined") {
  global.btoa = (value: string) => Buffer.from(value, "binary").toString("base64");
}

if (typeof global.atob === "undefined") {
  global.atob = (value: string) => Buffer.from(value, "base64").toString("binary");
}
