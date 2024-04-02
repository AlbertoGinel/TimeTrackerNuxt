<script setup>
import { useProfileStore } from "#imports";
import { useActivitiesStore } from "#imports";
import { useStampsStore } from "#imports";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();
const activitiesStore = useActivitiesStore();
const stampsStore = useStampsStore();
</script>

<template>
  <h1>Stamps Panel</h1>

  <ul>
    <li v-for="stamp in stampsStore.stamps" :key="stamp.id">
      <div>
        <span>{{ stamp.activitiesId }} {{ stamp.type }} {{ stamp.time }}</span>
      </div>
    </li>
  </ul>
</template>
