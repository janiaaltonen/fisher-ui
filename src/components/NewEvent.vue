<template>
  <div :is="currentComponent" v-on:swap-component="swapComponent"></div>
</template>

<script>
import BasicInfo from "./BasicInfo";
import AddCatches from "./AddCatches";
export default {
  name: "NewEvent",
  components: {
    BasicInfo,
    AddCatches,
  },
  data() {
    return {
      currentComponent: BasicInfo,
    };
  },
  methods: {
    swapComponent(component) {
      this.currentComponent = component;
    },
  },
};
</script>
