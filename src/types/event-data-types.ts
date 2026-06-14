export type EventMetaDataType = {
  template: string;
  isHomepage: boolean;
  eventName: string;
  eventLogoUrl: string;
  eventFaviconUrl: string;
  hideRegistrationForm: boolean;
  hideCAForm: boolean;
  eventDate: string;
  eventLocation: string;
  isInnerRegistration: boolean;
  eventDescription: string;
  registrationUrl?: string;
  hasCAForm: boolean;
  participantCount: number;
  hiddenSections: string[];
};

export type ContactLinksType = { [platform: string]: string };

export type FormDataType = {
  title: string;
  details: string;
  fees: number;
  transactionMethods: {
    [platform: string]: {
      number: string;
      qrCodeUrl?: string;
      qrCodePublicId?: string;
    };
  };
  registrationDeadline: string;
};

export type CAFormDataType = {
  title: string;
  details: string;
  applicationDeadline: string;
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
  prizeCount: number;
};

export type ExplorionPastEventType = {
  eventSlug: string;
  eventBannerUrl: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  participantCount: number;
  segments: {
    segmentSlug: string;
    isTeamSegment: boolean;
    isPaidSegment: boolean;
    fees: number;
  }[];
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
  maxTeamSize: number;
  isPaidSegment: boolean;
  fees: number;
  transactionMethods?: {
    [platform: string]: {
      number: string;
      qrCodeUrl?: string;
      qrCodePublicId?: string;
    };
  };
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
