<template>
  <div>
    <div v-for="(event, i) in fishingEvents" :key="i" style="margin: 24px 16px">
      <EventCard :fishing-event="event"></EventCard>
    </div>
    <v-fab-transition>
      <v-btn small fab right bottom color="blue" fixed to="newEvent">
        <v-icon>mdi-fish</v-icon></v-btn
      >
    </v-fab-transition>
  </div>
</template>

<script>
import EventCard from "./BriefEventCard";
export default {
  name: "ListEvents",
  components: { EventCard },
  props: ["fishingEvents"],
};
</script>
