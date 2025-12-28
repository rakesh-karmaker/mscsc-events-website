import App from "@/app";
import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "@/layouts/home-layout";
import { lazy, Suspense } from "react";
import Loader from "@/components/ui/loader";
import PageNotFound from "@/pages/page-not-found";

const HomePage = lazy(() => import("@/pages/home"));
const RegistrationPage = lazy(() => import("@/pages/registration"));
const EventPage = lazy(() => import("@/pages/event"));

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

      // events path
      {
        path: "/:eventId/events/:seSlug",
        element: (
          <Suspense
            fallback={
              <div className="w-full h-[calc(100vh-var(--nav-height))]">
                <Loader />
              </div>
            }
          >
            <EventPage />
          </Suspense>
        ),
        errorElement: <PageNotFound />,
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
        errorElement: <PageNotFound />,
      },

      // Fallback route for unmatched paths
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
