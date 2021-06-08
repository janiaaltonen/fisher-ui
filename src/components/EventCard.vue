<template>
  <v-card class="mx-auto" max-width="600">
    <v-img
      class="white--text align-end"
      height="150px"
      src="IMG_20210605_221601.jpg"
    >
      <v-card-title> {{ fishingEvent.location }} </v-card-title>
      <v-card-subtitle class="white--text">
        <v-icon left class="white--text"> mdi-calendar</v-icon>
        {{ fishingEvent.date }}
        <span v-if="eventTime">
          <v-icon left class="white--text">mdi-clock-time-three-outline</v-icon>
          {{ eventTime }}
        </span>
      </v-card-subtitle>
    </v-img>
    <v-card-text>
      <div class="black--text">
        <v-row>
          <v-col class="text-left"
            >Total catches: {{ fishingEvent.catches.length }}</v-col
          >
          <v-col v-if="fishingEvent.persons" class="text-right">
            Fishers: {{ fishingEvent.persons }}</v-col
          >
        </v-row>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="orange" text @click="showDetails(fishingEvent.id)">
        Show details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EventCard",
  props: ["fishingEvent"],
  computed: {
    eventTime() {
      let start = this.fishingEvent.start_time;
      let end = this.fishingEvent.end_time;
      if (!start || !end) {
        return null;
      }
      // show only hours and minutes
      start = start ? start.split(":").slice(0, 2).join(":") : "";
      end = end ? end.split(":").slice(0, 2).join(":") : "";
      return `${start} - ${end}`;
    },
  },
  methods: {
    showDetails(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped></style>
