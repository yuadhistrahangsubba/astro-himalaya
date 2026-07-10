/**
 * Offline gazetteer for the birth-place picker — no geocoding API, no
 * network. Coverage is deliberately deep where our users are (all 20
 * Bhutanese dzongkhags, major Nepali and Indian cities) rather than
 * shallow everywhere. Coordinates are city-level approximations (±0.2°
 * worst case), which moves a computed ascendant by only a fraction of a
 * degree — well inside this engine's precision. Anywhere else: the
 * form's Advanced section takes manual coordinates.
 */
export interface Place {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const BT = "Asia/Thimphu";
const NP = "Asia/Kathmandu";
const IN = "Asia/Kolkata";

export const PLACES: readonly Place[] = [
  // Bhutan — all 20 dzongkhags
  { name: "Thimphu", region: "Bhutan", latitude: 27.47, longitude: 89.64, timezone: BT },
  { name: "Paro", region: "Bhutan", latitude: 27.43, longitude: 89.42, timezone: BT },
  { name: "Punakha", region: "Bhutan", latitude: 27.58, longitude: 89.86, timezone: BT },
  { name: "Phuentsholing", region: "Bhutan", latitude: 26.85, longitude: 89.39, timezone: BT },
  { name: "Wangdue Phodrang", region: "Bhutan", latitude: 27.49, longitude: 89.9, timezone: BT },
  { name: "Trongsa", region: "Bhutan", latitude: 27.5, longitude: 90.51, timezone: BT },
  { name: "Bumthang (Jakar)", region: "Bhutan", latitude: 27.55, longitude: 90.75, timezone: BT },
  { name: "Gelephu", region: "Bhutan", latitude: 26.87, longitude: 90.49, timezone: BT },
  { name: "Tsirang (Damphu)", region: "Bhutan", latitude: 27.02, longitude: 90.12, timezone: BT },
  { name: "Dagana", region: "Bhutan", latitude: 27.07, longitude: 89.88, timezone: BT },
  { name: "Haa", region: "Bhutan", latitude: 27.39, longitude: 89.28, timezone: BT },
  { name: "Samtse", region: "Bhutan", latitude: 26.91, longitude: 89.09, timezone: BT },
  { name: "Sarpang", region: "Bhutan", latitude: 26.86, longitude: 90.27, timezone: BT },
  { name: "Zhemgang", region: "Bhutan", latitude: 27.22, longitude: 90.66, timezone: BT },
  { name: "Mongar", region: "Bhutan", latitude: 27.28, longitude: 91.24, timezone: BT },
  { name: "Lhuentse", region: "Bhutan", latitude: 27.67, longitude: 91.18, timezone: BT },
  { name: "Trashigang", region: "Bhutan", latitude: 27.33, longitude: 91.55, timezone: BT },
  { name: "Trashiyangtse", region: "Bhutan", latitude: 27.61, longitude: 91.5, timezone: BT },
  { name: "Pemagatshel", region: "Bhutan", latitude: 27.04, longitude: 91.4, timezone: BT },
  { name: "Samdrup Jongkhar", region: "Bhutan", latitude: 26.8, longitude: 91.5, timezone: BT },
  { name: "Gasa", region: "Bhutan", latitude: 27.9, longitude: 89.73, timezone: BT },
  // Nepal
  { name: "Kathmandu", region: "Nepal", latitude: 27.72, longitude: 85.32, timezone: NP },
  { name: "Lalitpur (Patan)", region: "Nepal", latitude: 27.67, longitude: 85.32, timezone: NP },
  { name: "Bhaktapur", region: "Nepal", latitude: 27.67, longitude: 85.43, timezone: NP },
  { name: "Pokhara", region: "Nepal", latitude: 28.21, longitude: 83.99, timezone: NP },
  { name: "Biratnagar", region: "Nepal", latitude: 26.45, longitude: 87.27, timezone: NP },
  { name: "Birgunj", region: "Nepal", latitude: 27.01, longitude: 84.88, timezone: NP },
  { name: "Bharatpur", region: "Nepal", latitude: 27.68, longitude: 84.43, timezone: NP },
  { name: "Dharan", region: "Nepal", latitude: 26.81, longitude: 87.28, timezone: NP },
  { name: "Butwal", region: "Nepal", latitude: 27.7, longitude: 83.45, timezone: NP },
  { name: "Hetauda", region: "Nepal", latitude: 27.43, longitude: 85.03, timezone: NP },
  { name: "Janakpur", region: "Nepal", latitude: 26.73, longitude: 85.93, timezone: NP },
  { name: "Nepalgunj", region: "Nepal", latitude: 28.05, longitude: 81.62, timezone: NP },
  { name: "Dhangadhi", region: "Nepal", latitude: 28.7, longitude: 80.59, timezone: NP },
  { name: "Ilam", region: "Nepal", latitude: 26.91, longitude: 87.93, timezone: NP },
  // India — Himalayan belt + metros
  { name: "Darjeeling", region: "India", latitude: 27.04, longitude: 88.26, timezone: IN },
  { name: "Gangtok", region: "Sikkim, India", latitude: 27.33, longitude: 88.61, timezone: IN },
  { name: "Kalimpong", region: "India", latitude: 27.06, longitude: 88.47, timezone: IN },
  { name: "Siliguri", region: "India", latitude: 26.73, longitude: 88.4, timezone: IN },
  { name: "Shillong", region: "India", latitude: 25.58, longitude: 91.89, timezone: IN },
  { name: "Guwahati", region: "India", latitude: 26.14, longitude: 91.74, timezone: IN },
  { name: "Itanagar", region: "India", latitude: 27.1, longitude: 93.62, timezone: IN },
  { name: "Kolkata", region: "India", latitude: 22.57, longitude: 88.36, timezone: IN },
  { name: "New Delhi", region: "India", latitude: 28.61, longitude: 77.21, timezone: IN },
  { name: "Mumbai", region: "India", latitude: 19.08, longitude: 72.88, timezone: IN },
  { name: "Chennai", region: "India", latitude: 13.08, longitude: 80.27, timezone: IN },
  { name: "Bengaluru", region: "India", latitude: 12.97, longitude: 77.59, timezone: IN },
  { name: "Hyderabad", region: "India", latitude: 17.39, longitude: 78.49, timezone: IN },
  { name: "Pune", region: "India", latitude: 18.52, longitude: 73.86, timezone: IN },
  { name: "Ahmedabad", region: "India", latitude: 23.02, longitude: 72.57, timezone: IN },
  { name: "Jaipur", region: "India", latitude: 26.91, longitude: 75.79, timezone: IN },
  { name: "Lucknow", region: "India", latitude: 26.85, longitude: 80.95, timezone: IN },
  { name: "Patna", region: "India", latitude: 25.61, longitude: 85.14, timezone: IN },
  { name: "Varanasi", region: "India", latitude: 25.32, longitude: 83.01, timezone: IN },
  { name: "Dehradun", region: "India", latitude: 30.32, longitude: 78.03, timezone: IN },
  { name: "Shimla", region: "India", latitude: 31.1, longitude: 77.17, timezone: IN },
  { name: "Leh", region: "Ladakh, India", latitude: 34.15, longitude: 77.58, timezone: IN },
  { name: "Amritsar", region: "India", latitude: 31.63, longitude: 74.87, timezone: IN },
];

/** Prefix matches first, then substring matches, capped at `limit`. */
export function searchPlaces(query: string, limit = 8): Place[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const starts: Place[] = [];
  const contains: Place[] = [];
  for (const place of PLACES) {
    const name = place.name.toLowerCase();
    if (name.startsWith(q)) starts.push(place);
    else if (name.includes(q) || place.region.toLowerCase().includes(q)) contains.push(place);
  }
  return [...starts, ...contains].slice(0, limit);
}
