import React from "react";
import { Heading, Text, Provider, defaultTheme } from "@adobe/react-spectrum";
import { usePDF, ResizableBox } from "../src";

// @ts-expect-error - Vite changes import.meta
const CLIENT_ID = import.meta.env.VITE_ADOBE_CLIENT_ID as string;

const MainPdf = () => {
  usePDF({
    divId: "pdf-id",
    clientId: CLIENT_ID,
    pdfConfig: {
      content: {
        location: {
          url: "https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf",
        },
      },
      metaData: {
        fileName: "foo",
        id: "1234",
      },
    },
    viewConfig: {
      embedMode: "SIZED_CONTAINER",
      showDownloadPDF: false,
      showFullScreen: false,
      showPrintPDF: false,
    },
  });
  return (
    <div
      style={{
        position: "relative",
        overflow: "scroll",
        height: "700px",
        width: "800px",
      }}
    >
      <ResizableBox
        additionalCss={{ backgroundColor: "rgba(255,200,255,0.7)" }}
        default={{ height: "100px", width: "200px", x: 20, y: 10 }}
      />
      <div style={{ position: "absolute" }} id="pdf-id" />
    </div>
  );
};

export const App = () => {
  return (
    <Provider theme={defaultTheme}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Heading level={1}>Flex PDF</Heading>
        <Text marginBottom="12px">
          A flexible collection of design patterns and UI components designed to
          make building sophisticated applications on top of PDFs easy,
          especially those related to human-in-the-loop machine learning.
        </Text>
        <div style={{ border: "2px solid black" }}>
          <MainPdf />
        </div>
      </div>
    </Provider>
  );
};
