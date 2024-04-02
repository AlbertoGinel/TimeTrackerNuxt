<script setup>
import { useProfileStore } from "#imports";
import { useActivitiesStore } from "#imports";
import { useCurrentActivityStore } from "#imports";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();
const activitiesStore = useActivitiesStore();
const currentActivity = useCurrentActivityStore();

const handleButtonClick = (id) => {
  currentActivity.setCurrentActivity(id);
};
</script>

<template>
  <h1>Activities Panel</h1>

  <div>{{ currentActivity.currentActivity.name }}</div>

  <ul>
    <li v-for="activity in activitiesStore.activities" :key="activity.id">
      <div :style="{ backgroundColor: activity.color }">
        <span>{{ activity.icon }} {{ activity.name }}</span>

        <button @click="handleButtonClick(activity.id)">►</button>
      </div>
    </li>
  </ul>
</template>
