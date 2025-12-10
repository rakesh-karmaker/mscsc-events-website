import { useEffect, type ReactNode } from "react";
import Navbar from "@/layouts/navbar/Navbar";
import websiteData from "@/services/data/websiteData.json";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import { useEventData } from "@/hooks/useEventData";
import Loader from "@/components/ui/Loader";

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
    ); // or a loading spinner
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
