<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import AdminDashboard from "~/components/AdminDashboard.vue";
import GameCreatorDashboard from "~/components/GameCreatorDashboard.vue";
import PlayerDashboard from "~/components/PlayerDashboard.vue";
import { useProfileStore } from "#imports";

const client = useSupabaseClient();
const user = useSupabaseUser();

const profileStore = useProfileStore();
</script>

<template>
  <MainLayout>
    <div>IndexPage</div>

    <div>
      <div v-if="profileStore.profile.role === 'admin'"><AdminDashboard /></div>
      <div v-if="profileStore.profile.role === 'gameCreator'">
        <GameCreatorDashboard />
      </div>
      <div v-if="profileStore.profile.role === 'player'">
        <PlayerDashboard />
      </div>
    </div>
  </MainLayout>
</template>
