import type { ReactNode } from "react";
import Navbar from "@/layouts/navbar/Navbar";
import websiteData from "@/services/data/websiteData.json";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";

export default function HomeLayout(): ReactNode {
  return (
    <>
      <Navbar
        navbarData={{
          eventName: websiteData.eventName,
          eventLogoUrl: websiteData.eventLogoUrl,
          isInnerRegistration: websiteData.isInnerRegistration,
          registrationUrl: websiteData.registrationUrl,
          sections: websiteData.sections,
        }}
      />
      <Outlet />
      {/* <Footer
        footerData={{
          eventName: websiteData.eventName,
          eventLogoUrl: websiteData.eventLogoUrl,
          eventDescription: websiteData.eventDescription,
          eventLocation: websiteData.eventLocation,
          contactLinks: websiteData.contactLinks,
          isInnerRegistration: websiteData.isInnerRegistration,
          registrationUrl: websiteData.registrationUrl,
          sections: websiteData.sections,
        }}
      /> */}
    </>
  );
}
