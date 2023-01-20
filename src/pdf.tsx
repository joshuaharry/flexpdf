import React from "react";
import { Text } from "@adobe/react-spectrum";

const RANDOM_PDF_ID = globalThis.crypto.randomUUID();

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

interface ViewConfig {
  /**
   * TODO: In order for the technique involving DOM components to work, we have
   * to make sure this is set to 'IN_LINE', but consumers of this library who
   * just want to use a nice React wrapper for the Adobe Embed API might want
   * to use something different.
   */
  // How is the PDF embedded?
  embedMode: "IN_LINE";
}

interface PdfProps {
  // What client ID is needed to use the embed API?
  clientId: string;
  // What configuration object is needed to specify the PDF?
  pdfConfig: PdfContent;
  // What configuration object is needed to specify the view?
  viewConfig: ViewConfig;
  // What are the styles of the parent div?
  parentContainerCss?: React.CSSProperties;
}

const PDF_NOT_FOUND = `We could not find the Adobe Embed API on this page. Please add it into the document and try again.`;

export const PDF = (props: PdfProps) => {
  const { pdfConfig, viewConfig, clientId, parentContainerCss } = props;
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  React.useEffect(() => {
    const handleLoadPdfEffect = async () => {
      // @ts-expect-error - AdobeDC is not part of the Window object.
      if (window.AdobeDC === undefined) {
        setErrorMessage(PDF_NOT_FOUND);
        return;
      }
      // @ts-expect-error - AdobeDC is not part of the Window object.
      const view = new window.AdobeDC.View({
        clientId: clientId,
        divId: RANDOM_PDF_ID,
      });
      await view.previewFile(pdfConfig, viewConfig);
    };
    handleLoadPdfEffect();
  }, [clientId, pdfConfig, viewConfig]);
  if (errorMessage !== null) {
    return <Text>{errorMessage}</Text>;
  }
  return (
    <div style={{ position: "relative", ...parentContainerCss }}>
      <div id={RANDOM_PDF_ID} style={{ position: "absolute" }} />
    </div>
  );
};
