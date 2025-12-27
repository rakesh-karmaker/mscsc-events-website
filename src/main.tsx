import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </HelmetProvider>
);
