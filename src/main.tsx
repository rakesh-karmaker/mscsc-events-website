import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>,
);
