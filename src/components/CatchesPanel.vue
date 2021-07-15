<template>
  <v-expansion-panels :disabled="catches.length === 0">
    <v-expansion-panel>
      <v-expansion-panel-header>
        Catches: {{ catches.length }}<v-spacer></v-spacer
        ><v-icon v-if="editable" right color="blue"
          >mdi-pencil</v-icon
        ></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-expansion-panels v-for="(c, i) in catches" :key="i">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row no-gutters>
                <v-col cols="5">
                  <v-fade-transition leave-absolute>
                    <span v-if="c.fish_species">
                      {{ i + 1 }}. {{ c.fish_species }}
                    </span>
                    <span v-else> Catch # {{ i + 1 }} </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-if="c.weight || c.length || c.fishing_technique || c.lure">
                <v-row v-if="c.weight && c.length">
                  <v-col v-if="c.weight">
                    <v-icon left> mdi-weight</v-icon> {{ c.weight }} kg
                  </v-col>
                  <v-col v-if="c.length">
                    <v-icon left> mdi-ruler</v-icon> {{ c.length }}cm
                  </v-col>
                </v-row>
                <v-row v-if="c.fishing_technique">
                  <v-col> Method </v-col>
                  <v-col> {{ c.fishing_technique }} </v-col>
                </v-row>
                <v-row v-if="c.lure">
                  <v-col> Lure </v-col>
                  <v-col> {{ c.lure }}</v-col>
                </v-row>
              </div>
              <div v-else>
                <v-row>
                  <v-col> No details added </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "CatchesPanel",
  props: ["catches", "editable"],
};
</script>

<style scoped></style>
