<template>
  <ListEvents :fishing-events="fishingEvents" />
</template>

<script>
import ListEvents from "../components/ListEvents";

export default {
  name: "Home",

  components: {
    ListEvents,
  },
  computed: {
    fishingEvents() {
      return this.$store.state.fishCatch.fishingEvents;
    },
  },
  created() {
    this.$store.dispatch("fishCatch/getAllFishingEvents");
  },
};
</script>
