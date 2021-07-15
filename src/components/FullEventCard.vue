<template>
  <div style="margin: 8px">
    <v-card class="mx-auto" max-width="600">
      <v-img
        class="white--text align-end"
        height="150px"
        src="/IMG_20210605_221601.jpg"
      >
        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-spacer></v-spacer>
          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" icon v-on="on" v-bind="attrs">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="makeEditable()">
                <v-list-item-title
                  ><v-icon small color="blue">
                    mdi-pencil</v-icon
                  ></v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="deleteEvent()">
                <v-list-item-title
                  ><v-icon small color="red">
                    mdi-delete</v-icon
                  ></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
        <v-card-title> {{ fishingEvent.location }} </v-card-title>
        <v-card-subtitle class="white--text">
          <v-icon left class="white--text"> mdi-calendar</v-icon>
          {{ fishingEvent.date }}
          <span v-if="eventTime">
            <v-icon left class="white--text"
              >mdi-clock-time-three-outline</v-icon
            >
            {{ eventTime }}
          </span>
          <span class="text-right" v-if="isEditable">
            <v-icon color="blue">mdi-pencil</v-icon></span
          >
        </v-card-subtitle>
      </v-img>
      <v-card-text>
        <CatchesPanel :catches="fishingEvent.catches" :editable="isEditable" />
      </v-card-text>
      <v-card-text>
        <div class="black--text">
          <v-row>
            <v-col class="text-left">Weather</v-col>
            <v-spacer></v-spacer>
            <v-col v-if="isEditable" class="text-right"
              ><v-icon color="blue">mdi-pencil</v-icon></v-col
            >
          </v-row>
          <v-divider></v-divider>
        </div>
        <div class="black--text">
          <v-row>
            <v-col> <v-icon left>mdi-waves</v-icon>25 &#176;C </v-col>
            <v-col> <v-icon left>mdi-thermometer</v-icon>25 &#176;C </v-col>
            <v-col> <v-icon left>mdi-send</v-icon>4 m/s </v-col>
            <v-col v-if="weather">
              <v-icon left>mdi-weather-snowy-heavy</v-icon>sunny
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <Dialog :dialog="dial" v-on:confirm-delete="confirmDelete"></Dialog>
  </div>
</template>

<script>
import CatchesPanel from "./CatchesPanel";
import Dialog from "./Dialog";
export default {
  name: "FullEventCard",
  components: { Dialog, CatchesPanel },
  data() {
    return {
      isEditable: false,
      dial: false,
    };
  },
  computed: {
    fishingEvent() {
      return JSON.parse(
        JSON.stringify(this.$store.state.fishCatch.fishingEvents)
      ).filter((v) => v.id === this.$route.params.id)[0];
    },
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
    weather() {
      let w = {
        icon: "",
        name: this.fishingEvent.weather,
      };
      switch (this.fishingEvent.weather) {
        case "sunny":
          w.icon = "mdi-white-balance-sunny";
          break;
        case "cloudy":
          w.icon = "mdi-cloud";
          break;
        case "partly cloudy":
          w.icon = "mdi-weather-partly-cloudy";
          break;
        case "rain":
          w.icon = "mdi-weather-pouring";
          break;
        case "snowfall":
          w.icon = "mdi-weather-snowy-heavy";
          break;
        default:
          w = "";
          break;
      }
      return w;
    },
  },
  methods: {
    deleteEvent() {
      this.dial = !this.dial;
      return;
    },
    makeEditable() {
      this.isEditable = !this.isEditable;
    },
    confirmDelete(bool) {
      // this should call the store to remove the element from backend and then remove it from store
      // now it just hides the dialog whetgher yes or no is clicked
      console.log(bool);
      this.dial = false;
    },
  },
};
</script>

<style scoped></style>
