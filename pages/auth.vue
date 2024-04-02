<template>
  <div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />

      <button @click="login">Sign in with email</button>
    </div>
    <div>
      <h1>Index</h1>
      <div v-if="user">
        <p>User is logged in.</p>
      </div>
      <div v-else>
        <p>User is not logged in.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from "#imports";
import { useActivitiesStore } from "#imports";
import { useStampsStore } from "#imports";

const profileStore = useProfileStore();
const activitiesStore = useActivitiesStore();
const stampsStore = useStampsStore();

const client = useSupabaseClient();
const user = useSupabaseUser();

const email = ref("");
const password = ref("");

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

const login = async () => {
  try {
    // Authenticate the user
    const { data: userData, error: authError } =
      await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

    if (authError) {
      // Handle authentication error
      console.error("Authentication failed:", authError.message);
      return;
    }

    // If authentication succeeds, proceed to fetch user profile
    const { data, error } = await useFetch("/api/getProfile", {
      onRequest({ request, options }) {
        options.method = "GET";
        options.headers = {
          Authorization: `Bearer ${userData.accessToken}`, // Assuming accessToken is available in userData
          "Content-Type": "application/json",
        };

        // Set the body with user id
        //options.body = JSON.stringify({ id: userData.user.id });
      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
        console.error("Request error:", error);
      },
      async onResponse({ request, response, options }) {
        profileStore.setProfile(JSON.parse(response._data.body));
      },
      onResponseError({ request, response, options, error }) {
        // Handle the response errors
        console.error("Response error:", error);
      },
    });

    //search for activities

    const { data2, error2 } = await useFetch("/api/getActivities", {
      onRequest({ request, options }) {
        options.method = "GET";
        options.headers = {
          Authorization: `Bearer ${userData.accessToken}`, // Assuming accessToken is available in userData
          "Content-Type": "application/json",
        };

        // Set the body with user id
        //options.body = JSON.stringify({ id: userData.user.id });
      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
        console.error("Request error:", error);
      },
      async onResponse({ request, response, options }) {
        activitiesStore.setActivities(JSON.parse(response._data.body));
      },
      onResponseError({ request, response, options, error }) {
        // Handle the response errors
        console.error("Response error:", error);
      },
    });

    //search for stamps

    const { data3, error3 } = await useFetch("/api/getStamps", {
      onRequest({ request, options }) {
        options.method = "GET";
        options.headers = {
          Authorization: `Bearer ${userData.accessToken}`, // Assuming accessToken is available in userData
          "Content-Type": "application/json",
        };

        // Set the body with user id
        //options.body = JSON.stringify({ id: userData.user.id });
      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
        console.error("Request error:", error);
      },
      async onResponse({ request, response, options }) {
        stampsStore.setStamps(JSON.parse(response._data.body));
      },
      onResponseError({ request, response, options, error }) {
        // Handle the response errors
        console.error("Response error:", error);
      },
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error);
  }
};
</script>
