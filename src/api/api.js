export const getAccessToken = async () => {
  const clientId = "GRWnnbrT4sztOcGXIsQ2cMSzpqPGXO1y";
  const clientSecret = "8AjuKJWYGcfcqdV6";

  try {
    const response = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      }
    );

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFlightDestinations = async (token) => {
  try {
    const response = await fetch(
      "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=CHI&departureDate=2024-12-22&adults=1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
