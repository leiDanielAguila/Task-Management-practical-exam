import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";
import { QueryProvider } from "./providers/QueryProvider";
import { theme } from "./theme/theme";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </QueryProvider>
  </StrictMode>,
);
