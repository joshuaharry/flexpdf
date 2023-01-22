import React from "react";

interface Header {
  // Key needed to view a PDF.
  key: string;
  // Value needed to view a PDF.
  value: string;
}

interface PdfContent {
  content: {
    location: {
      // What is the URL of the file?
      url: string;
      // What headers are needed to view the PDF document?
      headers?: Header[];
    };
  };
  metaData: {
    // What is the name of the file?
    fileName: string;
    // What is the ID of the file?
    id: string;
  };
}

type ViewConfig =
  | { embedMode: "IN_LINE" }
  | {
      embedMode: "SIZED_CONTAINER";
      showFullScreen?: boolean;
      showDownloadPDF?: boolean;
      showPrintPDF?: boolean;
    }
  | { embedMode: "LIGHT_BOX" }
  | { embedMode: "FULL_WINDOW" };

/**
 * TODO:
 */
type AdobeEvent = {
  data: { pageNumber: number; fileName: string };
  type: string;
};

type AdobeEventHandler = (event: AdobeEvent) => unknown;

type EventCallbackConfig = {
  embedPDFAnalytics: boolean;
  listenOn?: Array<unknown>;
};

export interface PdfOptions {
  // What client ID is needed to use the embed API?
  clientId: string;
  // Into which div should we render the PDF?
  divId: string;
  // What configuration object is needed to specify the PDF?
  pdfConfig: PdfContent;
  // What configuration object is needed to specify the view?
  viewConfig: ViewConfig;
  // How do we handle certain events from the Adobe Embed API?
  eventHandler?: AdobeEventHandler;
  // What options should we add to the view callback?
  eventCallbackConfig?: EventCallbackConfig;
}

type AdobeEmbedErrors = "ADOBE_DC_NOT_IN_WINDOW";

/**
 * usePDF is a React hook that allows consumers to render a PDF into an
 * arbitrary div of their choosing. One simply needs to ensure that the
 * Adobe Embed API has been loaded into the page; this code takes care
 * of rendering the PDF into the DOM correctly.
 */
export const usePDF = (options: PdfOptions): AdobeEmbedErrors | null => {
  const {
    clientId,
    divId,
    pdfConfig,
    viewConfig,
    eventHandler,
    eventCallbackConfig,
  } = options;
  const [errorDetected, setErrorDetected] =
    React.useState<AdobeEmbedErrors | null>(null);
  React.useEffect(() => {
    const handleLoadPdfEffect = async () => {
      // @ts-expect-error - AdobeDC is not part of the Window object.
      if (window.AdobeDC === undefined) {
        setErrorDetected("ADOBE_DC_NOT_IN_WINDOW");
        return;
      }
      // @ts-expect-error - AdobeDC is not part of the Window object.
      const view = new window.AdobeDC.View({
        clientId: clientId,
        divId: divId,
      });
      await view.previewFile(pdfConfig, viewConfig);
      if (eventHandler !== undefined) {
        view.registerCallback(
          // @ts-expect-error - AdobeDC is not part of the Window object.
          window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
          eventHandler,
          eventCallbackConfig
        );
      }
    };
    handleLoadPdfEffect();
  }, [
    clientId,
    divId,
    pdfConfig,
    viewConfig,
    eventHandler,
    eventCallbackConfig,
  ]);
  return errorDetected;
};
