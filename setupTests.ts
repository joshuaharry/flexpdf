import "@testing-library/jest-dom/extend-expect";
import crypto from "crypto";
// @ts-expect-error - Should not expect crypto.
globalThis.crypto = crypto;
globalThis.crypto.randomUUID = crypto.randomUUID;
