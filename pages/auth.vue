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

const profileStore = useProfileStore();
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
    const { data, error } = await useFetch("/api/post-get-profile", {
      onRequest({ request, options }) {
        options.method = "POST";
        options.headers = {
          Authorization: `Bearer ${userData.accessToken}`, // Assuming accessToken is available in userData
          "Content-Type": "application/json",
        };

        // Set the body with user id
        options.body = JSON.stringify({ id: userData.user.id });
      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
        console.error("Request error:", error);
      },
      async onResponse({ request, response, options }) {
        profileStore.setProfile(JSON.parse(response._data.body));
        console.log("response: ", JSON.parse(response._data.body));
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
