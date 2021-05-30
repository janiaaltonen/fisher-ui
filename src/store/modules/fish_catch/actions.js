import { getSpecies, getWeatherOptions } from "../../../services/api";

export default {
  setNewFishingEvent({ commit }, data) {
    commit("setNewFishingEvent", data);
  },
  setNewFishingEventCatches({ commit }, data) {
    commit("setNewFishingEventCatches", data);
  },
  async getFishSpecies({ commit }) {
    const data = await getSpecies();
    commit("setFishSpeciesOptions", data);
  },
  async getWeatherOptions({ commit }) {
    const data = await getWeatherOptions();
    commit("setWeatherOptions", data);
  },
};
