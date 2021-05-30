<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        clearable
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable first-day-of-week="1">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      date: "",
      modal: false,
    };
  },
  watch: {
    date(value) {
      this.$emit("value-change", value);
    },
  },
};
</script>

<style scoped></style>
