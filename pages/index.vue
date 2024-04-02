<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import ActivitiesPanel from "~/components/ActivitiesPanel.vue";
import StampsPanel from "~/components/StampsPanel.vue";
import { useProfileStore } from "#imports";

const client = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();
</script>

<template>
  <MainLayout>
    <div>IndexPage</div>
    <StampsPanel />
    <ActivitiesPanel />
  </MainLayout>
</template>
