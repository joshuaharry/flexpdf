import React from "react";
import { usePDF, ResizableBox } from "../src";

// @ts-expect-error - Vite changes import.meta
const CLIENT_ID = import.meta.env.VITE_ADOBE_CLIENT_ID as string;
console.log(CLIENT_ID);

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
        <ResizableBox
          additionalCss={{ backgroundColor: "rgba(255,200,255,0.7)" }}
          default={{ height: "200px", width: "200px", x: 0, y: 0 }}
        />
        <div style={{ position: "absolute" }} id="pdf-id" />
      </div>
    </div>
  );
};
