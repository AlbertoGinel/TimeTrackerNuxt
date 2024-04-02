import { defineStore } from "pinia";
import { ref } from "vue";

const createStamp = async (lastActivity) => {
  console.log("lastActivity", lastActivity);

  const { data, error } = await $fetch("/api/createStamp", {
    onRequest({ request, options }) {
      options.method = "POST";
      options.headers = {
        "Content-Type": "application/json",
      };

      // Set the body with user id
      options.body = JSON.stringify({ id: lastActivity.id, type: "start" });
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.error("Request error:", error);
    },
    async onResponse({ request, response, options }) {
      //activitiesStore.setActivities(JSON.parse(response._data.body));
      console.log("sale bien");
    },
    onResponseError({ request, response, options, error }) {
      // Handle the response errors
      console.error("Response error:", error);
    },
  });
};

export const useCurrentActivityStore = defineStore(
  "currentActivity",
  () => {
    const currentActivity = ref({});
    const test = ref("this is currentActivity");

    async function setCurrentActivity(newActivityId) {
      const activitiesStore = useActivitiesStore();

      if (!newActivityId) {
        currentActivity.value = {};
      } else {
        const activity = activitiesStore.activities.find(
          (activity) => activity.id === newActivityId
        );
        currentActivity.value = activity;
        await createStamp(activity);
      }
    }

    return {
      currentActivity,
      test,
      setCurrentActivity,
    };
  },
  { persist: true }
);
