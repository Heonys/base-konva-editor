import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "@/components";

import "rc-slider/assets/index.css";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
