<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="labelName"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker v-if="modal" v-model="time" full-width format="24hr">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(time)"> OK </v-btn>
    </v-time-picker>
  </v-dialog>
</template>
<script>
export default {
  name: "TimePicker",
  props: ["labelName"],
  data() {
    return {
      time: "",
      modal: false,
    };
  },
};
</script>

<style scoped></style>
