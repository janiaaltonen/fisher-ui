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
                  <span v-if="c.species"> {{ i + 1 }}. {{ c.species }} </span>
                  <span v-else> Catch # {{ i + 1 }} </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              :items="fishSpecies"
              v-model="c.species"
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
              dense
              outlined
              clearable
            >
            </v-text-field>
            <v-select
              :items="fishing_techniques"
              v-model="c.fishing_technique"
              item-text="value"
              item-value="value"
              label="Fishing Technique"
              dense
              outlined
              clearable
            ></v-select>
            <v-select
              :items="lures"
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
        species: "",
        length: null,
        weight: "",
        fishing_technique: "",
        lure: "",
        lureDetails: "",
      },
      a: "",
      species: [
        {
          key: "perch",
          value: "Perch",
        },
        {
          key: "pike",
          value: "Pike",
        },
        {
          key: "zander",
          value: "Zander",
        },
      ],
      fishing_techniques: [
        {
          key: "fly_fishing",
          value: "Fly Fishing",
        },
        {
          key: "net",
          value: "Net",
        },
      ],
      lures: [
        {
          key: "jig",
          value: "Jig",
        },
        {
          key: "wobbler",
          value: "Wobbler",
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
        species: "",
        length: null,
        weight: "",
        fishing_technique: "",
        lure: "",
        lureDetails: "",
      };
      this.catches.push(newCatch);
    },
    previous() {
      this.$emit("swap-component", "BasicInfo");
    },
    save() {
      if (this.isValid()) {
        this.saveCatches();
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
        if (!v.species) {
          isValid = false;
        }
      });
      return isValid;
    },
    saveCatches() {
      let data = "";
      if (this.noCatches) {
        data = [];
      } else {
        data = JSON.parse(JSON.stringify(this.catches));
      }
      this.$store.dispatch("fishCatch/setNewFishingEventCatches", data);
    },
  },

  created() {
    this.$store.dispatch("fishCatch/getFishSpecies");
    if (!this.noCatches && this.catches.length === 0) {
      this.catches.push(this.fish);
    }
  },
};
</script>

<style scoped></style>
