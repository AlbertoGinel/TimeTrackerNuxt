import { defineStore } from "pinia";

export const useProfileStore = defineStore(
  "profile",
  {
    state: () => ({
      profile: {},
      test: "this is test",
    }),
    persist: true, // Persist state (optional)
    actions: {
      setProfile(newProfile) {
        this.profile = newProfile;
      },
    },
  },
  { persist: true }
);
