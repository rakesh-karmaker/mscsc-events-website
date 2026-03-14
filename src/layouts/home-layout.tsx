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

export default function HomeLayout(): ReactNode {
  const { setEventData, eventMetaData, hasFetchedData, setHasFetchedData } =
    useEventData();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // all sections
  const allSections: string[] = [
    "hero",
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
  const sectionId = useParams().section || "hero";

  useEffect(() => {
    async function fetchData(id: string) {
      try {
        const response = await getEventBySlug(id);
        if (response.status !== 200 || !response.data) {
          setError("Failed to fetch event data");
        }

        const eventData = await getJSONData(response.data.dataUrl);
        if (!eventData) {
          setError("Failed to fetch event JSON data");
        }

        setEventData(eventData);
        setHasFetchedData(true);
      } catch (error: AxiosError | any) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.data.message || "An error occurred while fetching event data"}`,
          );
        }
      }
    }

    async function fetchPastEvents() {
      try {
        const res = await getAllEvents();
        if (res.status !== 200 || !res.data) {
          setError("Failed to fetch past events data");
          return;
        }

        setEventData({ ...staticData["home"], pastEventData: res.data });
        setHasFetchedData(true);
      } catch (error: AxiosError | any) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.data.message || "An error occurred while fetching past events data"}`,
          );
        }
      }
    }

    if (!eventId) {
      navigate("/home");
    }

    // Validate eventId and sectionId
    else if (eventId && allSections.includes(eventId)) {
      setError("Invalid event ID");
    } else if (sectionId && !allSections.includes(sectionId)) {
      setError("Invalid section ID");
    }

    // Set event data based on eventId
    else if (!eventMetaData && eventId && staticData[eventId]) {
      if (eventId === "home") {
        fetchPastEvents();
      } else {
        setEventData(staticData[eventId]);
        setHasFetchedData(true);
      }
    } else if (eventId && !staticData[eventId]) {
      fetchData(eventId);
    } else {
      setError("Event ID is required");
    }
  }, [eventId]);

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
