import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/:eventId?",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
