import App from "@/App.tsx";
import { createBrowserRouter } from "react-router";
import HomeLayout from "@/layouts/HomeLayout.tsx";
import { lazy, Suspense } from "react";
import Loader from "@/components/ui/Loader";

const HomePage = lazy(() => import("@/pages/Home"));

export const router = createBrowserRouter([
  {
    path: "/:eventId?",
    element: (
      <App>
        <HomeLayout />
      </App>
    ),
    children: [
      {
        index: true, // This defines the default child route
        element: (
          <Suspense
            fallback={
              <div className="w-full h-[calc(100vh-var(--nav-height))]">
                <Loader />
              </div>
            }
          >
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
]);
