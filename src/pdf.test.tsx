import React from "react";
import { render } from "@testing-library/react";
import { PDF } from "./pdf";

describe("Our PDF component", () => {
  test("Renders without crashing", () => {
    render(
      <PDF
        clientId="1234"
        viewConfig={{ embedMode: "IN_LINE" }}
        pdfConfig={{
          metaData: { fileName: "foo", id: "bar" },
          content: { location: { url: "https://google.com" } },
        }}
      />
    );
  });
  test("Renders its children", () => {
    const text = "TEST";
    const { getByText } = render(
      <PDF
        clientId="1234"
        viewConfig={{ embedMode: "IN_LINE" }}
        pdfConfig={{
          metaData: { fileName: "foo", id: "bar" },
          content: { location: { url: "https://google.com" } },
        }}
      >
        {text}
      </PDF>
    );
    expect(getByText(text)).toBeInTheDocument();
  });
});
