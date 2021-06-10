<template>
  <div>
    foo bar
    <v-checkbox v-model="noCatches" label="No catches"></v-checkbox>
    <div v-if="!noCatches">
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
            <v-select
              :items="fishSpecies"
              v-model="c.fish_species"
              item-text="value"
              item-value="value"
              label="Species"
              dense
              outlined
              clearable
            ></v-select>
            <NumberSlider
              :sub-header="'Length (cm)'"
              :min="0"
              :max="150"
              v-on:value-change="addLength(i, $event)"
            />
            <v-text-field
              v-model="c.weight"
              label="Weight (kg)"
              :rules="weightRules"
              dense
              outlined
              clearable
            >
            </v-text-field>
            <v-select
              :items="fishingMethods"
              v-model="c.fishing_technique"
              item-text="value"
              item-value="value"
              label="Fishing Technique"
              dense
              outlined
              clearable
            ></v-select>
            <v-select
              :items="lureOptions"
              v-model="c.lure"
              item-text="value"
              item-value="value"
              label="Lure"
              dense
              outlined
              clearable
            ></v-select>
            <v-col class="text-center">
              <v-btn class="ma-1" @click="deleteCatch(i)">
                <v-icon>mdi-trash-can-outline</v-icon></v-btn
              >
              <v-btn class="ma-1" @click="copyCatch(i)">
                <v-icon>mdi-content-copy</v-icon></v-btn
              >
              <v-btn class="ma-1" @click="addNewCatch">
                <v-icon>mdi-plus-circle-outline</v-icon></v-btn
              >
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-btn elevation="2" @click="previous()"> Back</v-btn>
    <v-btn elevation="2" @click="save()"> Save</v-btn>
  </div>
</template>

<script>
import NumberSlider from "./NumberSlider";

export default {
  name: "AddCatches",
  components: { NumberSlider },
  data() {
    return {
      noCatches: false,
      catches: [],
      fish: {
        fish_species: "",
        length: null,
        weight: null,
        fishing_technique: "",
        fishing_technique_details: "",
        lure: "",
        lure_details: "",
      },
      weightRules: [
        (value) => (value || "").length <= 6 || "Max 5 numbers",
        (value) => {
          const pattern = /^$|(\d+(?:[.,]\d+)?)$/;
          return pattern.test(value) || "invalid number";
        },
      ],
    };
  },
  computed: {
    fishSpecies() {
      const options = this.$store.state.fishCatch.fishSpeciesOptions;
      const names = this.$i18n.messages.en.fishSpecies;
      return options.map((v) => ({
        key: v.name,
        value: names[v.name],
      }));
    },
    lureOptions() {
      const options = this.$store.state.fishCatch.lureOptions;
      const names = this.$i18n.messages.en.lures;
      return options.map((v) => ({
        key: v.name,
        value: names[v.name],
      }));
    },
    fishingMethods() {
      const options = this.$store.state.fishCatch.fishingMethodOptions;
      const names = this.$i18n.messages.en.fishingMethods;
      return options.map((v) => ({
        key: v.name,
        value: names[v.name],
      }));
    },
  },
  methods: {
    addLength(index, value) {
      this.catches[index].length = value;
    },
    deleteCatch(index) {
      if (this.catches.length > 1) {
        this.catches.splice(index, 1);
      } else {
        // show snackbar etc. info that cannot delete last one in this case tick no catches if no catches
      }
    },
    copyCatch(index) {
      this.catches.push(JSON.parse(JSON.stringify(this.catches[index])));
    },
    addNewCatch() {
      const newCatch = {
        fish_species: "",
        length: null,
        weight: "",
        fishing_technique: "",
        lure: "",
        lure_details: "",
      };
      this.catches.push(newCatch);
    },
    previous() {
      // save catches to store if user returns to basic info
      const catches = JSON.parse(JSON.stringify(this.catches));
      this.$store.dispatch("fishCatch/setNewFishingEventCatches", catches);
      this.$emit("swap-component", "BasicInfo");
    },
    save() {
      if (this.isValid()) {
        const data = this.parseCatches();
        this.saveCatches(data);
      }
      // gathers inputted data in parent component
      // sends event to server
    },
    isValid() {
      let isValid = true;
      if (this.noCatches) {
        return isValid;
      }
      this.catches.forEach((v) => {
        if (!v.fish_species) {
          isValid = false;
        }
      });
      return isValid;
    },
    parseCatches() {
      if (this.noCatches) {
        return [];
      }
      const catches = JSON.parse(JSON.stringify(this.catches));
      catches.forEach((v) => {
        const species = this.$i18n.messages.en.fishSpecies;
        v.fish_species = Object.keys(species).find(
          (key) => species[key] === v.fish_species
        );
        if (v.fishing_technique) {
          const fMethods = this.$i18n.messages.en.fishingMethods;
          v.fishing_technique = Object.keys(fMethods).find(
            (key) => fMethods[key] === v.fishing_technique
          );
        }
        if (v.lure) {
          const lures = this.$i18n.messages.en.lures;
          v.lure = Object.keys(lures).find((key) => lures[key] === v.lure);
        }
      });
      return catches;
    },
    saveCatches(data) {
      this.$store.dispatch("fishCatch/setNewFishingEventCatches", data);
      this.$store.dispatch("fishCatch/saveNewFishingEvent");
    },
  },

  created() {
    // gets needed options values from backend
    this.$store.dispatch("fishCatch/getCatchOptionsData");
    // needs no catches to store if user comes back from basicinfo, value needs to be "remembered"
    if (!this.noCatches && this.catches.length === 0) {
      this.catches.push(this.fish);
    }
  },
};
</script>

<style scoped></style>
