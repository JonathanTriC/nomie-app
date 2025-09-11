import { create } from 'zustand';

interface UserProfileState {
  userProfile: GetProfileResponse | null;
  setUserProfile: (profile: GetProfileResponse) => void;
  clearUserProfile: () => void;
}

export const useUserStore = create<UserProfileState>(set => ({
  userProfile: null,
  setUserProfile: profile => set({ userProfile: profile }),
  clearUserProfile: () => set({ userProfile: null }),
}));
