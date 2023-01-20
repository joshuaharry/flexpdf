import "@testing-library/jest-dom/extend-expect";
import crypto from "crypto";
// @ts-expect-error - Should not expect crypto.
globalThis.crypto = crypto;
globalThis.crypto.randomUUID = crypto.randomUUID;

class MockView {
  // eslint-disable-next-line
  previewFile = async (_: unknown, __: unknown) => {
    return false;
  };
}

// @ts-expect-error - Should not see AdobeDC on window.
window.AdobeDC = {
  View: MockView,
};
