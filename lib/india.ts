export const STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Rough pincode prefill until a real pincode API is connected: major cities by 3 digits, states by 2.
const CITIES: Record<string, [city: string, state: string]> = {
  "110": ["New Delhi", "Delhi"],
  "122": ["Gurugram", "Haryana"],
  "160": ["Chandigarh", "Chandigarh"],
  "226": ["Lucknow", "Uttar Pradesh"],
  "302": ["Jaipur", "Rajasthan"],
  "380": ["Ahmedabad", "Gujarat"],
  "400": ["Mumbai", "Maharashtra"],
  "411": ["Pune", "Maharashtra"],
  "500": ["Hyderabad", "Telangana"],
  "560": ["Bengaluru", "Karnataka"],
  "600": ["Chennai", "Tamil Nadu"],
  "682": ["Kochi", "Kerala"],
  "700": ["Kolkata", "West Bengal"],
};

const STATE_RANGES: [from: number, to: number, state: string][] = [
  [11, 11, "Delhi"], [12, 13, "Haryana"], [14, 15, "Punjab"], [17, 17, "Himachal Pradesh"], [18, 19, "Jammu and Kashmir"],
  [20, 23, "Uttar Pradesh"], [27, 28, "Uttar Pradesh"], [30, 34, "Rajasthan"], [36, 39, "Gujarat"], [40, 44, "Maharashtra"],
  [45, 48, "Madhya Pradesh"], [49, 49, "Chhattisgarh"], [50, 50, "Telangana"], [51, 53, "Andhra Pradesh"], [56, 59, "Karnataka"],
  [60, 64, "Tamil Nadu"], [67, 69, "Kerala"], [70, 74, "West Bengal"], [75, 77, "Odisha"], [78, 78, "Assam"],
];

export function lookupPincode(pin: string): { city?: string; state?: string } {
  if (!/^[1-9]\d{5}$/.test(pin)) return {};
  if (pin.startsWith("403")) return { state: "Goa" };
  const hit = CITIES[pin.slice(0, 3)];
  if (hit) return { city: hit[0], state: hit[1] };
  const two = Number(pin.slice(0, 2));
  return { state: STATE_RANGES.find(([from, to]) => two >= from && two <= to)?.[2] };
}
