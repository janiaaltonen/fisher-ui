<template>
  <v-app>
    <v-main>
      <MenuBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from "./components/MenuBar";
export default {
  name: "App",
  components: { MenuBar },
  data: () => ({
    //
  }),
};
</script>
