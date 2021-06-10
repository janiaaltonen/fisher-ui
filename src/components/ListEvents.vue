<template>
  <div>
    <div v-for="(event, i) in fishingEvents" :key="i">
      <EventCard :fishing-event="event"></EventCard>
    </div>
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
