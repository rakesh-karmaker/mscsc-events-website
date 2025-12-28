export type EventMetaDataType = {
  template: string;
  eventName: string;
  eventLogoUrl: string;
  eventDate: string;
  eventLocation: string;
  isInnerRegistration: boolean;
  eventDescription: string;
  registrationUrl?: string;
  registrations: number;
  prizeCount: number;
};

export type ContactLinksType = { [platform: string]: string };

export type FormDataType = {
  title: string;
  details: string;
  fees: number;
  transactionMethods: {
    [platform: string]: {
      number: string;
      code: string;
      qrCodeUrl?: string;
    };
  };
};

//* Explorion Template types

export type ExplorionHeroSectionType = {
  icons: string[];
  heading: string;
  text: string;
};

export type ExplorionVideoSectionType = {
  hasAudio: boolean;
  url: string;
};

export type ExplorionAboutSectionType = {
  title: string;
  heading: string;
  text: string;
};

export type ExplorionSegmentType = {
  segmentSlug: string;
  locationType: "online" | "onsite" | "hybrid";
  teamType: "solo" | "team";
  icon: string;
  imageUrl: string;
  title: string;
  summary: string;
  details: string;
  rules: string;
};

export type ExplorionExperienceType = {
  experienceSlug: string;
  icon: string;
  title: string;
  details: string;
};

export type ExplorionScheduleSectionType = {
  [date: string]: {
    icon: string;
    time: string;
    title: string;
    description: string;
  }[];
};

export type ExplorionSPType = {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
};

export type ExplorionFAQType = {
  question: string;
  answer: string;
};
