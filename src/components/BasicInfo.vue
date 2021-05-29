<template>
  <div class="pa-4">
    Add new Fishing Event
    <v-text-field
      v-model="location"
      label="location"
      outlined
      clearable
      dense
    ></v-text-field>
    <v-textarea
      v-model="locationDetails"
      label="location details"
      placeholder="e.g. coordinates or something that specifies the covered fishing area"
      outlined
      row-height="10"
      rows="2"
      clearable
      dense
    ></v-textarea>
    <DatePicker />
    <TimePicker :label-name="'start time'" />
    <TimePicker :label-name="'end time'" />
    <NumberSlider :sub-header="'Air temp'" :min="-40" :max="40" />
    <NumberSlider :sub-header="'Water temp'" :min="0" :max="30" />
    <NumberSlider :sub-header="'Persons'" :min="0" :max="10" />
    <NumberSlider :sub-header="'Wind (m/s)'" :min="0" :max="35" />
    <v-select
      :items="weathers"
      v-model="weather"
      label="Weather"
      dense
      outlined
      clearable
    ></v-select>
    <v-btn elevation="2" @click="cancel()"> cancel</v-btn>
    <v-btn elevation="2" @click="addCatches()"> next</v-btn>
  </div>
</template>

<script>
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import NumberSlider from "./NumberSlider";
export default {
  name: "NewEvent",
  components: { NumberSlider, TimePicker, DatePicker },
  props: ["swapComponent"],
  data() {
    return {
      location: "",
      locationDetails: "",
      weathers: ["sunny", "partly cloudy", "cloudy", "rain", "snowfall"],
      weather: "",
    };
  },
  methods: {
    addCatches() {
      console.log(this.weather);
      this.$emit("swap-component", "AddCatches");
    },
    cancel() {
      // user cancels adding new event
      // returns back to list of fishing events
      // add implementation
    },
  },
};
</script>
