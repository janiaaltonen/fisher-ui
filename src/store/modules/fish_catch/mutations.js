export default {
  setNewFishingEvent: (state, data) => {
    state.newFishingEvent = data;
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
};
