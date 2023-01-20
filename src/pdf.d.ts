import React from "react";
interface Header {
  key: string;
  value: string;
}
interface PdfContent {
  content: {
    location: {
      url: string;
      headers?: Header[];
    };
  };
  metaData: {
    fileName: string;
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
  embedMode: "IN_LINE";
}
interface PdfProps {
  clientId: string;
  pdfConfig: PdfContent;
  viewConfig: ViewConfig;
  parentContainerCss?: React.CSSProperties;
}
export declare const PDF: (props: PdfProps) => JSX.Element;
export {};
