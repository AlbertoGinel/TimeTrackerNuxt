import { defineStore } from "pinia";
import { ref } from "vue";

export const useActivitiesStore = defineStore(
  "activities",
  () => {
    const activities = ref([]);
    const test = ref("this is activities");

    function setActivities(newSet) {
      activities.value = newSet;
    }

    return {
      activities,
      test,
      setActivities,
    };
  },
  { persist: true }
);
