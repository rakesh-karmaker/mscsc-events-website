import type {
  ContactLinksType,
  EventMetaDataType,
  ExplorionAboutSectionType,
  ExplorionPastEventType,
  ExplorionExperienceType,
  ExplorionFAQType,
  ExplorionHeroSectionType,
  ExplorionScheduleSectionType,
  ExplorionSegmentType,
  ExplorionSPType,
  ExplorionVideoSectionType,
  FormDataType,
} from "@/types/event-data-types";
import { create } from "zustand";

export type EventDataStateType = {
  eventMetaData: EventMetaDataType | null;
  setEventMetaData: (eventMetaData: EventMetaDataType) => void;

  contactLinks: ContactLinksType | null;
  setContactLinks: (contactLinks: ContactLinksType) => void;

  formData: FormDataType | null;
  setFormData: (formData: FormDataType) => void;

  sections: string[];
  setSections: (sections: string[]) => void;

  heroData: ExplorionHeroSectionType | null;
  setHeroData: (heroData: ExplorionHeroSectionType) => void;

  videoData: ExplorionVideoSectionType | null;
  setVideoData: (videoData: ExplorionVideoSectionType) => void;

  aboutData: ExplorionAboutSectionType | null;
  setAboutData: (aboutData: ExplorionAboutSectionType) => void;

  pastEventData: ExplorionPastEventType[] | null;
  setPastEventData: (pastEventData: ExplorionPastEventType[]) => void;

  segmentData: ExplorionSegmentType[] | null;
  setSegmentData: (segmentData: ExplorionSegmentType[]) => void;

  experienceData: ExplorionExperienceType[] | null;
  setExperienceData: (experienceData: ExplorionExperienceType[]) => void;

  scheduleData: ExplorionScheduleSectionType | null;
  setScheduleData: (scheduleData: ExplorionScheduleSectionType) => void;

  spData: ExplorionSPType[] | null;
  setSPData: (spData: ExplorionSPType[]) => void;

  faqData: ExplorionFAQType[] | null;
  setFaqData: (faqData: ExplorionFAQType[]) => void;

  setEventData: (websiteData: any) => void;
  hasFetchedData: boolean;
  setHasFetchedData: (hasFetchedData: boolean) => void;
};

export const useEventDataStore = create<EventDataStateType>((set) => ({
  eventMetaData: null,
  setEventMetaData: (eventMetaData) => set({ eventMetaData }),

  contactLinks: null,
  setContactLinks: (contactLinks) => set({ contactLinks }),

  formData: null,
  setFormData: (formData) => set({ formData }),

  sections: [],
  setSections: (sections) => set({ sections }),

  heroData: null,
  setHeroData: (heroData) => set({ heroData }),

  videoData: null,
  setVideoData: (videoData) => set({ videoData }),

  aboutData: null,
  setAboutData: (aboutData) => set({ aboutData }),

  pastEventData: null,
  setPastEventData: (pastEventData) => set({ pastEventData }),

  segmentData: null,
  setSegmentData: (segmentData) => set({ segmentData }),

  experienceData: null,
  setExperienceData: (experienceData) => set({ experienceData }),

  scheduleData: null,
  setScheduleData: (scheduleData) => set({ scheduleData }),

  spData: null,
  setSPData: (spData) => set({ spData }),

  faqData: null,
  setFaqData: (faqData) => set({ faqData }),

  setEventData: (websiteData) => {
    // set the event meta data
    const metaData: EventMetaDataType = {
      template: websiteData.template || "",
      isHomepage: websiteData.isHomepage || false,
      eventName: websiteData.eventName || "",
      eventLogoUrl: websiteData.eventLogoUrl || "",
      eventDate: websiteData.eventDate || "",
      eventLocation: websiteData.eventLocation || "",
      isInnerRegistration: websiteData.isInnerRegistration
        ? websiteData.isInnerRegistration
        : false,
      eventDescription: websiteData.eventDescription || "",
      registrationUrl: websiteData.registrationUrl || "",
      registrations: websiteData.registrations ? websiteData.registrations : 0,
      prizeCount: websiteData.prizeCount ? websiteData.prizeCount : 0,
    };
    set({ eventMetaData: metaData });

    // set the event Contact Links
    set({ contactLinks: websiteData.contactLinks || null });

    // set the form data
    set({ formData: websiteData.formData || null });

    // set the sections
    set({ sections: websiteData.sections || [] });

    // set the hero data
    set({ heroData: websiteData.heroData || null });

    // set the video data
    set({ videoData: websiteData.videoData || null });

    // set the about data
    set({ aboutData: websiteData.aboutData || null });

    // set the past event data
    set({ pastEventData: websiteData.pastEventData || null });

    // set the segment data
    set({ segmentData: websiteData.segmentsData || null });

    // set the experience data
    set({ experienceData: websiteData.experienceData || null });

    // set the schedule data
    set({ scheduleData: websiteData.scheduleData || null });

    // set the sponsors and partners data
    set({ spData: websiteData.spData || null });

    // set the FAQ data
    set({ faqData: websiteData.faqData || null });
  },
  hasFetchedData: false,
  setHasFetchedData: (hasFetchedData) => set({ hasFetchedData }),
}));
