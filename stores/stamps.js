import { defineStore } from "pinia";
import { ref } from "vue";

export const useStampsStore = defineStore(
  "stamps",
  () => {
    const stamps = ref([]);
    const test = ref("this is stamps");

    function setStamps(newSet) {
      stamps.value = newSet;
    }

    return {
      stamps,
      test,
      setStamps,
    };
  },
  { persist: true }
);
