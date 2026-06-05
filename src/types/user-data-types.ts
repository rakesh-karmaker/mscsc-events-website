export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  facebookUrl: string;
  photoUrl: string;

  institution: string;
  grade: string;

  segments: string[];

  paidSoloSegments: {
    segmentSlug: string;
    fees: number;
    transactionMethod: string;
    transactionPhoneNumber: string;
    transactionId: string;
    status: "pending" | "validated" | "rejected";
    rejectionReason?: string;
  }[];

  teamSegmentsData?: {
    segmentSlug: string;

    isPaidSegment: boolean;
    transactionMethod: string;

    teamName: string;
    leaderEmail: string;
    memberEmails: string[];

    status: "pending" | "approved" | "rejected";
    rejectionReason?: string;
  }[];

  registrationDate: string;
  status: "pending" | "validated" | "rejected";
  rejectionReason?: string;
  code: string;
  hasAttended: boolean;
}

export type UserDataPreviewType = Pick<
  User,
  | "_id"
  | "name"
  | "email"
  | "photoUrl"
  | "paidSoloSegments"
  | "teamSegmentsData"
  | "status"
>;
