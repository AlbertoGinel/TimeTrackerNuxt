<template>
  MainLayout

  <div>welcome {{ profileStore.profile.username }}</div>
  <button @click="signOut">Sign out</button>
  <slot></slot>
</template>

<script setup>
import { useProfileStore } from "#imports";

const profileStore = useProfileStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

watch(user, (newValue) => {
  if (!newValue) {
    navigateTo("/auth");
  }
});

const signOut = () => {
  client.auth.signOut();
  return navigateTo("/auth");
};
</script>
