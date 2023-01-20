import "@testing-library/jest-dom/extend-expect";
// eslint-disable-next-line
const crypto = require("crypto");
window.crypto = crypto;
window.crypto.randomUUID = crypto.randomUUID;

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
