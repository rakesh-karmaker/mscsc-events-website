import { useEventDataStore } from "@/stores/use-event-data-store";

export function useEventData() {
  const eventMetaData = useEventDataStore((state) => state.eventMetaData);
  const contactLinks = useEventDataStore((state) => state.contactLinks);
  const formData = useEventDataStore((state) => state.formData);
  const sections = useEventDataStore((state) => state.sections);
  const heroData = useEventDataStore((state) => state.heroData);
  const videoData = useEventDataStore((state) => state.videoData);
  const aboutData = useEventDataStore((state) => state.aboutData);
  const segmentData = useEventDataStore((state) => state.segmentData);
  const scheduleData = useEventDataStore((state) => state.scheduleData);
  const spData = useEventDataStore((state) => state.spData);
  const faqData = useEventDataStore((state) => state.faqData);
  const hasFetchedData = useEventDataStore((state) => state.hasFetchedData);

  const setEventData = useEventDataStore((state) => state.setEventData);
  const setHasFetchedData = useEventDataStore(
    (state) => state.setHasFetchedData
  );

  return {
    eventMetaData,
    contactLinks,
    formData,
    sections,
    heroData,
    videoData,
    aboutData,
    segmentData,
    scheduleData,
    spData,
    faqData,
    hasFetchedData,
    setEventData,
    setHasFetchedData,
  };
}
