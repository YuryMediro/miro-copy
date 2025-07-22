import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("@/shared/api/mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Providers>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </Providers>
    </StrictMode>,
  );
});
