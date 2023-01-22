import React from "react";
import { ResizableBox } from "./ResizableBox";
import { render } from "@testing-library/react";

describe("Our annotation box", () => {
  test("Should render without crashing", () => {
    expect(() => {
      render(<ResizableBox />);
    }).not.toThrow();
  });
});
