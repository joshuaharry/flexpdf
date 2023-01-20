import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { PDF } from "../src/pdf";

// @ts-expect-error - Vite injects environment variables this way.
const CLIENT_ID = process.env.ADOBE_CLIENT_ID as string;

export const App = () => {
  return (
    <Provider theme={defaultTheme}>
      <PDF
        clientId={CLIENT_ID}
        pdfConfig={{
          content: {
            location: {
              url: "https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf",
            },
          },
          metaData: {
            fileName: "foo",
            id: "1234",
          },
        }}
        viewConfig={{ embedMode: "IN_LINE" }}
      />
    </Provider>
  );
};
