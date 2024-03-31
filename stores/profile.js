import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {},
    test: "this is test",
  }),
  persist: true,
  actions: {
    setProfile(newProfile) {
      this.profile = newProfile;
    },
  },
});
