import { create } from 'zustand';
import { UserProfile } from '../types';

interface UserProfileStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  profile: null,

  setProfile: (profile: UserProfile) => {
    set({ profile });
  },

  updateProfile: (updates: Partial<UserProfile>) => {
    set(state => ({
      profile: state.profile ? { ...state.profile, ...updates } : null
    }));
  }
}));