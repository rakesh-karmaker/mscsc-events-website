import { useEffect, type ReactNode } from "react";
import Navbar from "@/layouts/navbar/navbar";
import websiteData from "@/services/data/website-data.json";
import { Outlet } from "react-router";
import Footer from "./footer/footer";
import { useEventData } from "@/hooks/useEventData";
import Loader from "@/components/ui/loader";

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
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
