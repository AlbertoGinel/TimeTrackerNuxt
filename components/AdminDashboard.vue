<script setup>
import { useProfileStore } from "#imports";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();
</script>

<template>
  <h1>AdminDashboard</h1>
  <div>{{ profileStore.profile.username }}</div>
  <div>{{ profileStore.profile.role }}</div>
  <div>{{ profileStore.profile.companyid }}</div>
  <div>{{ profileStore.profile.status }}</div>
  <div>{{ profileStore.profile.department }}</div>

  <nuxt-link to="/agreements-licenses">
    <button>Agreements & licenses</button>
  </nuxt-link>
</template>
