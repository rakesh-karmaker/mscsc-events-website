import Navbar from "./layouts/navbar/Navbar";
import websiteData from "./services/data/websiteData.json";

export default function App() {
  return (
    <>
      <Navbar
        navbarData={{
          eventName: websiteData.eventName,
          eventLogoUrl: websiteData.eventLogoUrl,
          isInnerRegistration: websiteData.isInnerRegistration,
          registrationUrl: websiteData.navbar.registrationUrl,
          sections: websiteData.sections,
        }}
      />
    </>
  );
}
