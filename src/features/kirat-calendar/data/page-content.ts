import type { InfoPageKey } from "../types";

export const PAGE_CONTENT: Record<InfoPageKey, { title: string; body: string }> = {
  about: {
    title: "👤 About Us",
    body: "The Kirat Khaik Mundhum Calendar brings together the traditional Kirat lunar-solar reckoning and the modern Gregorian calendar in one place, so festivals, auspicious timings, and daily Panchanga details are easy to find and share.",
  },
  yamdhangsang: {
    title: "🕒 Yamdhangsang",
    body: "Yamdhangsang covers the time-keeping divisions used in the Kirat tradition — Lamikkhok, Mangyuk, Samyuk, Khok, Yenyem and Senlendat — each governing which activities are considered favourable at a given hour.",
  },
  festivals: {
    title: "🎉 Festivals",
    body: "A list of major Kirat festivals such as Sakela Ubhauli, Sakela Udhauli, and Chasok Tangnam will appear here, along with their dates on both the Kirat and English calendars.",
  },
  planets: {
    title: "🪐 Planets",
    body: "Details about the Kirat Namba (planetary rulers), Moon Sign, and Sun Sign positions used for daily Panchanga calculations.",
  },
};
