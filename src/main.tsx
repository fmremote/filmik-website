
  import { createRoot } from "react-dom/client";
  import { initBotId } from "botid/client/core";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  initBotId({
    protect: [
      {
        path: "/api/request-access",
        method: "POST",
        advancedOptions: { checkLevel: "basic" },
      },
    ],
  });

  createRoot(document.getElementById("root")!).render(<App />);
