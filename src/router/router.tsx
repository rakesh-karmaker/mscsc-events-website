import App from "@/app";
import { createBrowserRouter } from "react-router";
import HomeLayout from "@/layouts/home-layout";
import { lazy, Suspense } from "react";
import Loader from "@/components/ui/loader";
import PageNotFound from "@/pages/page-not-found";
import Redirect from "@/pages/redirect";

const HomePage = lazy(() => import("@/pages/home"));
const EventPage = lazy(() => import("@/pages/es"));
const RegistrationPage = lazy(() => import("@/pages/registration"));
const CAApplicationPage = lazy(() => import("@/pages/ca-application"));

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
        index: true,
        element: <Redirect />,
      },
      {
        path: "/:eventId?/:section?",
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
        errorElement: <PageNotFound />,
      },

      // es path
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

      // CA application path
      {
        path: "/:eventId/ca-application/",
        element: (
          <Suspense
            fallback={
              <div className="w-full h-[calc(100vh-var(--nav-height))]">
                <Loader />
              </div>
            }
          >
            <CAApplicationPage />
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
    errorElement: <PageNotFound />,
  },
]);
