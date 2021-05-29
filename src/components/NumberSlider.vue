<template>
  <v-col cols="12">
    <v-subheader class="pl-0"> {{ subHeader }} </v-subheader>
    <v-slider v-model="slider" thumb-label :max="max" :min="min"></v-slider>
  </v-col>
</template>

<script>
export default {
  name: "NumberSlider",
  props: ["subHeader", "min", "max", "default"],
  data() {
    return {
      slider: 0,
    };
  },
  watch: {
    slider(val) {
      this.$emit("value-change", val);
    },
  },
};
</script>

<style scoped></style>
