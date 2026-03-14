import { useEffect, type ReactNode } from "react";
import Navbar from "@/layouts/navbar/navbar";
import HomePageData from "@/services/data/home-page-data.json";
import ExplorionPageData from "@/services/data/explorion-page-data.json";
import { Outlet, useParams } from "react-router";
import Footer from "./footer/footer";
import { useEventData } from "@/hooks/use-event-data";
import Loader from "@/components/ui/loader";
import { Helmet } from "react-helmet-async";
import { getEventBySlug } from "@/lib/api/event";

export default function HomeLayout(): ReactNode {
  const { setEventData, eventMetaData, hasFetchedData, setHasFetchedData } =
    useEventData();

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
      const response = await getEventBySlug(id);
      if (response.status === 200 && response.data) {
        console.log("Fetched event data:", response.data);
        setEventData(response.data);
        setHasFetchedData(true);
      } else {
        throw new Error("Event data not found");
      }
    }

    // Validate eventId and sectionId
    if (eventId && allSections.includes(eventId)) {
      throw new Error("Invalid event ID");
    } else if (sectionId && !allSections.includes(sectionId)) {
      throw new Error("Invalid section ID");
    }

    // Set event data based on eventId
    else if (!eventMetaData && eventId && staticData[eventId]) {
      setEventData(staticData[eventId]);
      setHasFetchedData(true);
    } else if (eventId && !staticData[eventId]) {
      fetchData(eventId);
    } else {
      throw new Error("Event ID is required");
    }
  }, [eventId]);

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
