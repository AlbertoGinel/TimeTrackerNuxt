<script setup>
import { useProfileStore } from "#imports";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();
</script>

<template>
  <h1>Game Creator</h1>
  <div>{{ profileStore.profile.username }}</div>
  <div>{{ profileStore.profile.role }}</div>
  <div>{{ profileStore.profile.companyid }}</div>
  <div>{{ profileStore.profile.status }}</div>
  <div>{{ profileStore.profile.department }}</div>
</template>
