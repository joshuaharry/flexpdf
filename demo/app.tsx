import React from "react";
import { Heading, Text, Provider, defaultTheme } from "@adobe/react-spectrum";
import {
  usePDF,
  ResizableBox,
  AdobeEventHandler,
  AdobePageViewEvent,
} from "../src";

// @ts-expect-error - Vite changes import.meta
const CLIENT_ID = import.meta.env.VITE_ADOBE_CLIENT_ID as string;

/**
 * NOTE: It is vitally important that we declare these objects *above* the
 * PDF so that they don't change every render.
 */
const PDF_CONFIG = {
  content: {
    location: {
      url: "https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf",
    },
  },
  metaData: {
    fileName: "foo",
  },
};

const VIEW_CONFIG = {
  embedMode: "SIZED_CONTAINER",
  showDownloadPDF: false,
  showFullScreen: false,
  showPrintPDF: false,
} as const;

const CALLBACK_CONFIG = {
  enablePDFAnalytics: true,
};

const MainPdf = () => {
  const [page, setPage] = React.useState(1);
  const changePage: AdobeEventHandler = React.useCallback(
    (e) => {
      switch (e.type) {
        case "PAGE_VIEW": {
          const pageView = e as AdobePageViewEvent;
          setPage(pageView.data.pageNumber);
          return;
        }
        default: {
          return;
        }
      }
    },
    [setPage]
  );
  usePDF({
    divId: "pdf-id",
    clientId: CLIENT_ID,
    pdfConfig: PDF_CONFIG,
    eventHandler: changePage,
    eventCallbackConfig: CALLBACK_CONFIG,
    viewConfig: VIEW_CONFIG,
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
        additionalCss={{
          backgroundColor: "rgba(255,200,255,0.7)",
          ...(page !== 1 ? { display: "none" } : {}),
        }}
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
        <div style={{ maxWidth: "700px", marginBottom: "16px" }}>
          <Text>
            A work in progress PDF library. Try resizing the annotation box and
            changing the page!
          </Text>
        </div>
        <div style={{ border: "2px solid black" }}>
          <MainPdf />
        </div>
      </div>
    </Provider>
  );
};
