import {
  getSpecies,
  getLureOptions,
  getFishingMethods,
  getWeatherOptions,
} from "../../../services/api";

export default {
  setNewFishingEvent({ commit }, data) {
    commit("setNewFishingEvent", data);
  },
  setNewFishingEventCatches({ commit }, data) {
    commit("setNewFishingEventCatches", data);
  },
  async getCatchOptionsData({ commit }) {
    const [r1, r2, r3] = await Promise.all([
      getSpecies(),
      getLureOptions(),
      getFishingMethods(),
    ]);
    commit("setFishSpeciesOptions", r1);
    commit("setLureOptions", r2);
    commit("setFishingMethods", r3);
  },
  setCatchesToNewFishingEvent({ commit }, data) {
    commit("setNewFishingEventCatches", data);
  },
  async getFishSpecies({ commit }) {
    const data = await getSpecies();
    commit("setFishSpeciesOptions", data);
  },
  async getLureOptions({ commit }) {
    const data = await getLureOptions();
    commit("setFishSpeciesOptions", data);
  },
  async getFishingMethods({ commit }) {
    const data = await getFishingMethods();
    commit("setFishSpeciesOptions", data);
  },
  async getWeatherOptions({ commit }) {
    const data = await getWeatherOptions();
    commit("setWeatherOptions", data);
  },
};
