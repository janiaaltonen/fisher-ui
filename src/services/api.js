import axios from "axios";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSpecies = async () => {
  try {
    const r = await http.get("fishSpecies");
    return r.data;
  } catch (e) {
    return [];
  }
};

export const getLureOptions = async () => {
  try {
    const r = await http.get("lureOptions");
    return r.data;
  } catch (e) {
    return [];
  }
};

export const getFishingMethods = async () => {
  try {
    const r = await http.get("fishingTechniqueOptions");
    return r.data;
  } catch (e) {
    return [];
  }
};

export const getWeatherOptions = async () => {
  try {
    const r = await http.get("weatherOptions");
    return r.data;
  } catch (e) {
    return [];
  }
};

export const createNewFishingEvent = async (data) => {
  try {
    const r = await http.post("createFishingEvent", data);
    return r;
  } catch (e) {
    return {
      status: 400,
      message: "failed",
    };
  }
};

export const getAllEvents = async () => {
  try {
    const r = await http.get("allEvents");
    return r.data;
  } catch (e) {
    return [];
  }
};

export const deleteEvent = async (id) => {
  try {
    const r = await http.delete(`deleteEvent/${id}`);
    return r.data;
  } catch (e) {
    return {};
  }
};
/*
export const getFullFishingEvent = async () => {
  try {
    const r = await http.get("fullEvent");
    return;
  } catch (e) {}
};
 */
