import { useEffect, type ReactNode } from "react";
import Navbar from "@/layouts/navbar/navbar";
import websiteData from "@/services/data/website-data.json";
import { Outlet } from "react-router";
import Footer from "./footer/footer";
import { useEventData } from "@/hooks/use-event-data";
import Loader from "@/components/ui/loader";
import { Helmet } from "react-helmet-async";

export default function HomeLayout(): ReactNode {
  const { setEventData, eventMetaData, hasFetchedData, setHasFetchedData } =
    useEventData();

  useEffect(() => {
    if (!eventMetaData) {
      setEventData(websiteData);
      setHasFetchedData(true);
    }
  }, []);

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
        <link rel="icon" href={eventMetaData.eventLogoUrl} />
      </Helmet>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
