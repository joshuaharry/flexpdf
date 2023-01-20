import React from "react";
import { render } from "@testing-library/react";
import { PDF, PDF_NOT_FOUND } from "./pdf";

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
  test("Shows an error if window.AdobeDC is not defined", () => {
    // @ts-expect-error - Mutating window object
    const originalDc = window.AdobeDC;
    try {
      // @ts-expect-error - Mutating window object
      window.AdobeDC = undefined;
      const text = "TEST";
      const { queryByText } = render(
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
      expect(queryByText(text)).not.toBeInTheDocument();
      expect(queryByText(PDF_NOT_FOUND)).toBeInTheDocument();
    } finally {
      // @ts-expect-error - Mutating window object
      window.AdobeDC = originalDc;
    }
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
