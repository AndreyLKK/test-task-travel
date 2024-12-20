export const changeOfHours = (time) => {
  const regex = /^PT(\d+)H/;
  const match = time.match(regex);
  return match ? parseInt(match[1], 10) : 0;
};

export const changeOfMinutes = (time) => {
  const regex = /(\d+)M$/;
  const match = time.match(regex);
  return match ? parseInt(match[1], 10) : 0;
};

export const trimTime = (time) => {
  const regex = /T(\d+:\d+)/;
  return time.match(regex)[1];
};

export const sortFlights = (selectedOptions, initialFlights) => {
  if (selectedOptions.length === 0 || selectedOptions.includes(null)) {
    return [...initialFlights];
  } else {
    return initialFlights.filter((el) => {
      const segmentCount = el.itineraries[0].segments.length;
      return selectedOptions.includes(segmentCount - 1);
    });
  }
};

export const convertInMilliseconds = (duration) => {
  const regex = /PT(\d+)H(\d+)M/;
  const match = duration.match(regex);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  }
  return 0;
};

export const filterFlights = (filterType, flights) => {
  if (filterType === "cheap") {
    flights.sort((a, b) => a.price.base - b.price.base);
  }

  if (filterType === "fast") {
    flights.sort((a, b) => {
      const aTime = convertInMilliseconds(a.itineraries[0].duration);
      const bTime = convertInMilliseconds(b.itineraries[0].duration);
      return aTime - bTime;
    });
  }
};

export const searchFlights = (searchValue, initialFlights) => {
  const convertedSearchStr = searchValue.toUpperCase().trim();

  if (!convertedSearchStr) {
    return [...initialFlights];
  }

  return initialFlights.filter((flight) =>
    flight.itineraries.some((itinerary) =>
      itinerary.segments.some(
        (segment) =>
          segment.departure.iataCode.includes(convertedSearchStr) ||
          segment.arrival.iataCode.includes(convertedSearchStr)
      )
    )
  );
};
