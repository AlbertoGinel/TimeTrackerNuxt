<template>
  MainLayout
  <button @click="signOut">Sign out</button>
  <slot></slot>
</template>

<script setup>
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
