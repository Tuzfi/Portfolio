import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { IdiomaProvider } from "./Idioma";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IdiomaProvider>
        <MotionConfig reducedMotion="never">
          <App />
        </MotionConfig>
      </IdiomaProvider>
    </BrowserRouter>
  </StrictMode>
);
