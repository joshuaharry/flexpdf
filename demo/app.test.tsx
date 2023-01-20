import React from "react";
import { render } from "@testing-library/react";
import { App } from "./app";

describe("Our demo", () => {
  test("Renders without crashing", () => {
    render(<App />);
  });
});
