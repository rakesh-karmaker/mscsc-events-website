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

export type ScheduleType = {
  icon: string;
  fromTime: string;
  toTime: string;
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
