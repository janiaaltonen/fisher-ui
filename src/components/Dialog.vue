<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="250">
      <v-card>
        <v-card-title class="text"> Delete Event? </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmDelete(false)">
            No
          </v-btn>
          <v-btn color="green darken-1" text @click="confirmDelete(true)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Dialog",
  props: ["dialog"],
  methods: {
    confirmDelete(bool) {
      this.$emit("confirm-delete", bool);
    },
  },
};
</script>

<style scoped></style>
