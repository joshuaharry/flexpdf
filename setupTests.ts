import "@testing-library/jest-dom/extend-expect";
// eslint-disable-next-line
const crypto = require("crypto");
window.crypto = crypto;
window.crypto.randomUUID = crypto.randomUUID;

class MockView {
  static Enum = {
    CallbackType: {
      EVENT_LISTENER: "event_listener",
    },
  };
  // eslint-disable-next-line
  previewFile = async (_: unknown, __: unknown) => {
    return false;
  };
  // eslint-disable-next-line
  registerCallback = async (_: unknown, __: unknown, ___: unknown) => {};
}

// @ts-expect-error - Should not see AdobeDC on window.
window.AdobeDC = {
  View: MockView,
};
