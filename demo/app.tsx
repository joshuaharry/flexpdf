import React from "react";
import { usePDF } from "../src/pdf";

// @ts-expect-error - Vite changes import.meta
const CLIENT_ID = import.meta.env.VITE_ADOBE_CLIENT_ID as string;

export const App = () => {
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
    <div>
      <div
        style={{
          position: "relative",
          overflow: "scroll",
          height: "800px",
          width: "800px",
        }}
      >
        <div style={{ position: "absolute" }} id="pdf-id" />
      </div>
    </div>
  );
};
