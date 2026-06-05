import { useEffect, useState, type ReactNode } from "react";
import Navbar from "@/layouts/navbar/navbar";
import HomePageData from "@/services/data/home-page-data.json";
import ExplorionPageData from "@/services/data/explorion-page-data.json";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import Footer from "./footer/footer";
import { useEventData } from "@/hooks/use-event-data";
import Loader from "@/components/ui/loader";
import { Helmet } from "react-helmet-async";
import { getAllEvents, getEventBySlug, getJSONData } from "@/lib/api/event";
import type { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLenis } from "lenis/react";
import type { UserDataPreviewType } from "@/types/user-data-types";
import { useUser } from "@/hooks/use-user";

export default function HomeLayout(): ReactNode {
  const { setEventData, eventMetaData, hasFetchedData, setHasFetchedData } =
    useEventData();
  const { setUser } = useUser();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();

  // all sections
  const allSections: string[] = [
    "home",
    "video",
    "about",
    "events",
    "segments",
    "schedule",
    "sp",
    "faqs",
    "contact",
  ]; // Add more sections as needed

  // static data mapping for events
  const staticData: { [key: string]: any } = {
    home: HomePageData,
    explorion: ExplorionPageData,
  }; // Add more events and their corresponding data as needed when creating new templates

  // Get section and eventSlug from URL parameters
  const eventSlug = useParams().eventSlug;
  const sectionId = useParams().section || "home";

  // Fetch past events data for home page
  const {
    data: pastEventsData,
    error: pastEventError,
    isLoading: pastEventsLoading,
    refetch: refetchPastEventData,
  } = useQuery({
    queryKey: ["pastEvents"],
    queryFn: getAllEvents,
    enabled: false,
  });

  // Fetch event data based on eventSlug
  const {
    data: eventData,
    isLoading: eventDataLoading,
    error: eventDataError,
    refetch: refetchEventData,
  } = useQuery({
    queryKey: ["eventData", eventSlug],
    queryFn: () =>
      getEventBySlug(
        eventSlug as string,
        localStorage.getItem(`${eventSlug}-registrationToken`),
      )
        .then((res) =>
          res.status === 200 && res.data
            ? getJSONData(res.data.dataUrl, {
                hideRegistrationForm: res.data.hideRegistrationForm,
                hideCAForm: res.data.hideCAForm,
                participantCount: res.data.participantCount,
                registrationData: res.data.registrationData as
                  | UserDataPreviewType
                  | undefined,
              })
            : Promise.reject(new Error("Failed to fetch event data")),
        )
        .catch((error: AxiosError | any) => {
          setError(
            `Error: ${error.response?.status} - ${error.response?.data?.message || "An error occurred while fetching event data"}`,
          );
          return null;
        }),
    enabled: false,
  });

  useEffect(() => {
    if (!eventSlug) {
      navigate("/home");
    }

    // Validate eventSlug and sectionId
    else if (
      eventSlug &&
      eventSlug !== "home" &&
      allSections.includes(eventSlug)
    ) {
      setError("Invalid event ID");
    } else if (sectionId && !allSections.includes(sectionId)) {
      setError("Invalid section ID");
    }

    // Set event data based on eventSlug
    else if (!eventMetaData && eventSlug && staticData[eventSlug]) {
      if (eventSlug === "home") {
        refetchPastEventData();
        if (pastEventError) {
          setError("Failed to fetch past events data");
        } else if (pastEventsData) {
          setEventData({
            ...staticData[eventSlug],
            pastEventData: pastEventsData.data,
          });
          setHasFetchedData(true);
        }
      } else {
        setEventData(staticData[eventSlug]);
        setHasFetchedData(true);
      }
    } else if (eventSlug && !staticData[eventSlug]) {
      refetchEventData();
      if (eventDataError) {
        setError("Failed to fetch event data");
      } else if (eventData) {
        setEventData(eventData);
        if (eventData.registrationData) {
          setUser(eventData.registrationData);
        }
        setHasFetchedData(true);
      }
    }
  }, [
    eventSlug,
    refetchEventData,
    refetchPastEventData,
    pastEventsLoading,
    eventDataLoading,
    pastEventError,
    eventDataError,
  ]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  useEffect(() => {
    // Keep route changes deterministic with Lenis-managed scrolling.
    requestAnimationFrame(() => {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [location.pathname, location.search, lenis]);

  if (!hasFetchedData || !eventMetaData) {
    return (
      <div className="w-full h-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen">
      <Helmet>
        <title>{eventMetaData.eventName}</title>
        <meta name="description" content={eventMetaData.eventDescription} />
        <link
          rel="icon"
          href={eventMetaData.eventFaviconUrl || eventMetaData.eventLogoUrl}
        />
      </Helmet>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
