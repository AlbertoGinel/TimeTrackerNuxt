<script setup>
import { useProfileStore } from "#imports";
//import { useRouter } from "vue-router";
import MainLayout from "~/layouts/MainLayout.vue";

const client = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();

const router = useRouter();

watchEffect(() => {
  if (profileStore.profile.role !== "admin") {
    router.push("/no-permission");
  }
});
</script>

<template>
  <MainLayout>
    <div>{{ profileStore.profile.role }}</div>
    <div>Agreements and licenses</div>
  </MainLayout>
</template>
