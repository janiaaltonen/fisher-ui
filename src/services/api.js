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

export const getWeatherOptions = async () => {
  try {
    const r = await http.get("weatherOptions");
    return r.data;
  } catch (e) {
    return [];
  }
};
