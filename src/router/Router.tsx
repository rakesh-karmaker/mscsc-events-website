import App from "@/App.tsx";
import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "@/layouts/HomeLayout.tsx";
import { lazy, Suspense } from "react";
import Loader from "@/components/ui/Loader";

const HomePage = lazy(() => import("@/pages/Home"));
const RegistrationPage = lazy(() => import("@/pages/Registration"));
const SegmentPage = lazy(() => import("@/pages/Segment"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <HomeLayout />
      </App>
    ),
    children: [
      {
        index: true, // This defines the default child route
        element: <Navigate to="/demo" replace />,
      },
      {
        path: "/:eventId/:section?",
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

      // Segments path
      {
        path: "/segments/:eventId/:segmentId",
        element: (
          <Suspense
            fallback={
              <div className="w-full h-[calc(100vh-var(--nav-height))]">
                <Loader />
              </div>
            }
          >
            <SegmentPage />
          </Suspense>
        ),
      },

      // Registration path
      {
        path: "/:eventId/registration/",
        element: (
          <Suspense
            fallback={
              <div className="w-full h-[calc(100vh-var(--nav-height))]">
                <Loader />
              </div>
            }
          >
            <RegistrationPage />
          </Suspense>
        ),
      },
    ],
  },
]);
