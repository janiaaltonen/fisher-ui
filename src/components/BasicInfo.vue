<template>
  <div class="pa-4">
    Add new Fishing Event
    <v-text-field
      v-model="basicInfo.location"
      label="location"
      outlined
      clearable
      dense
    ></v-text-field>
    <v-textarea
      v-model="basicInfo.location_details"
      label="location details"
      placeholder="e.g. coordinates or something that specifies the covered fishing area"
      outlined
      row-height="10"
      rows="2"
      clearable
      dense
    ></v-textarea>
    <DatePicker v-on:value-change="addDate" />
    <TimePicker :label-name="'start time'" v-on:value-change="addStartTime" />
    <TimePicker :label-name="'end time'" v-on:value-change="addEndTime" />
    <NumberSlider
      :sub-header="'Air temp'"
      :min="-40"
      :max="40"
      v-on:value-change="addAirTemp"
    />
    <NumberSlider
      :sub-header="'Water temp'"
      :min="0"
      :max="30"
      v-on:value-change="addWaterTemp"
    />
    <NumberSlider
      :sub-header="'Persons'"
      :min="1"
      :max="10"
      v-on:value-change="addPersons"
    />
    <NumberSlider
      :sub-header="'Wind (m/s)'"
      :min="0"
      :max="35"
      v-on:value-change="addWind"
    />
    <v-select
      :items="weatherOptions"
      v-model="basicInfo.weather"
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
      basicInfo: {
        location: "",
        date: "",
        location_details: "",
        start_time: "",
        end_time: "",
        air_temp: "",
        water_temp: "",
        persons: 1,
        wind: "",
        weather: "",
      },
    };
  },
  computed: {
    weatherOptions() {
      const options = this.$store.state.fishCatch.weatherOptions;
      return options.map((v) => {
        return v.name;
      });
    },
  },
  methods: {
    addAirTemp(value) {
      this.basicInfo.air_temp = value;
    },
    addWaterTemp(value) {
      this.basicInfo.water_temp = value;
    },
    addPersons(value) {
      this.basicInfo.persons = value;
    },
    addWind(value) {
      this.basicInfo.wind = value;
    },
    addStartTime(value) {
      this.basicInfo.start_time = value;
    },
    addEndTime(value) {
      this.basicInfo.end_time = value;
    },
    addDate(value) {
      this.basicInfo.date = value;
    },
    addCatches() {
      // location and date are required fields so check that those has values before proceed
      if (this.basicInfo.location && this.basicInfo.date) {
        this.saveBasicInfo();
        this.$emit("swap-component", "AddCatches");
      } else {
        // show some snackbar to tell required fields are missing or return if error implemented otherwise
      }
    },
    cancel() {
      // user cancels adding new event
      // returns back to list of fishing events
      // add implementation
    },
    saveBasicInfo() {
      const data = JSON.parse(JSON.stringify(this.basicInfo));
      this.$store.dispatch("fishCatch/setNewFishingEvent", data);
    },
  },
  created() {
    this.$store.dispatch("fishCatch/getWeatherOptions");
  },
};
</script>
