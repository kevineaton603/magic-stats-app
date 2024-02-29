import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Router } from "./routes";

declare module "@tanstack/react-router" {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof Router;
  }
}

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
