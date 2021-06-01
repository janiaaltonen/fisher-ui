export default {
  setNewFishingEvent: (state, data) => {
    state.newFishingEvent = data;
  },
  setCatchesToNewEvent: (state, data) => {
    state.newFishingEvent.catches = data;
  },
  setNewFishingEventCatches: (state, data) => {
    state.newFishingEvent.catches = data;
  },
  setFishSpeciesOptions: (state, data) => {
    state.fishSpeciesOptions = data;
  },
  setWeatherOptions: (state, data) => {
    state.weatherOptions = data;
  },
  setFishingMethods: (state, data) => {
    state.fishingMethodOptions = data;
  },
  setLureOptions: (state, data) => {
    state.lureOptions = data;
  },
};
