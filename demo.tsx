import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./demo/app";

const container = document.getElementById("demo") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
