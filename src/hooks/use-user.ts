import { useUserDataStore } from "@/stores/use-user-data-store";

export function useUser() {
  const user = useUserDataStore((state) => state.userData);
  const setUser = useUserDataStore((state) => state.setUserData);

  return { user, setUser };
}
