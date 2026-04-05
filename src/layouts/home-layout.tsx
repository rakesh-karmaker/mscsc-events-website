import { useEffect, useState, type ReactNode } from "react";
import Navbar from "@/layouts/navbar/navbar";
import HomePageData from "@/services/data/home-page-data.json";
import ExplorionPageData from "@/services/data/explorion-page-data.json";
import { Outlet, useNavigate, useParams } from "react-router";
import Footer from "./footer/footer";
import { useEventData } from "@/hooks/use-event-data";
import Loader from "@/components/ui/loader";
import { Helmet } from "react-helmet-async";
import { getAllEvents, getEventBySlug, getJSONData } from "@/lib/api/event";
import type { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

export default function HomeLayout(): ReactNode {
  const { setEventData, eventMetaData, hasFetchedData, setHasFetchedData } =
    useEventData();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  // Get section and eventId from URL parameters
  const eventId = useParams().eventId;
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

  // Fetch event data based on eventId
  const {
    data: eventData,
    isLoading: eventDataLoading,
    error: eventDataError,
    refetch: refetchEventData,
  } = useQuery({
    queryKey: ["eventData", eventId],
    queryFn: () =>
      getEventBySlug(eventId as string)
        .then((res) =>
          res.status === 200 && res.data
            ? getJSONData(res.data.dataUrl, {
                hideRegistrationForm: res.data.hideRegistrationForm,
                hideCAForm: res.data.hideCAForm,
                participantCount: res.data.participantCount,
              })
            : console.log("hello"),
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
    if (!eventId) {
      navigate("/home");
    }

    // Validate eventId and sectionId
    else if (eventId && eventId !== "home" && allSections.includes(eventId)) {
      setError("Invalid event ID");
    } else if (sectionId && !allSections.includes(sectionId)) {
      setError("Invalid section ID");
    }

    // Set event data based on eventId
    else if (!eventMetaData && eventId && staticData[eventId]) {
      if (eventId === "home") {
        refetchPastEventData();
        if (pastEventError) {
          setError("Failed to fetch past events data");
        } else if (pastEventsData) {
          setEventData({
            ...staticData[eventId],
            pastEventData: pastEventsData.data,
          });
          setHasFetchedData(true);
        }
      } else {
        setEventData(staticData[eventId]);
        setHasFetchedData(true);
      }
    } else if (eventId && !staticData[eventId]) {
      refetchEventData();
      if (eventDataError) {
        setError("Failed to fetch event data");
      } else if (eventData) {
        setEventData(eventData);
        setHasFetchedData(true);
      }
    }
  }, [
    eventId,
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

  if (!hasFetchedData || !eventMetaData) {
    return (
      <div className="w-full h-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}
