import axios from "axios";

export const searchPlaces = async (query) => {
  if (!query.trim()) return [];

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Place search failed:", error);
    return [];
  }
};