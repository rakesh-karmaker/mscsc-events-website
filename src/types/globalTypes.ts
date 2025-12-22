export type SegmentType = {
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

export type ScheduleType = {
  icon: string;
  time: string;
  title: string;
  description: string;
};

export type SponsorType = {
  name: string;
  logoUrl: string;
  websiteUrl: string;
};

export type FaqType = {
  question: string;
  answer: string;
};
