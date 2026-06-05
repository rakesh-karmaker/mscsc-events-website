import type { UserDataPreviewType } from "@/types/user-data-types";
import { create } from "zustand";

export type UserDataStateType = {
  userData: UserDataPreviewType | null;
  setUserData: (userData: UserDataPreviewType) => void;
};

export const useUserDataStore = create<UserDataStateType>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
}));
