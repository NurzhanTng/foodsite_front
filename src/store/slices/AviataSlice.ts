import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// PayloadAction
export interface Airport {
  airport_id: number;
  name: string;
  city: number;
}

// airlines.ts
export interface Airline {
  airline_id: number;
  image_url: string;
  name: string;
  description: string;
}

// voyages.ts
export interface Voyage {
  voyage_id: number;
  departure_airport: number;
  destination_airport: number;
}

// sightseeings.ts
export interface Sightseeing {
  sightseeing_id: number;
  name: string;
  description: string;
  image_url: string;
  city: City;
}

// cities.ts
export interface City {
  city_id: number;
  country: number;
  code: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Country {
  country_id: number;
  name: string;
}

// flights.ts
export interface Flight {
  flight_id: number;
  voyage: number;
  airplane: number;
  departure_time: string; // Дата и время отправления в формате ISO 8601
  arrival_time: string; // Дата и время прибытия в формате ISO 8601
}

// tickets.ts
export interface Ticket {
  ticket_id: number;
  voyage: number;
  flight: number;
  airplane: number;
  first_name: string;
  last_name: string;
  date_of_birth: string; // Дата рождения в формате ISO 8601
  passport_id: string;
  gender: string;
  citizenship: string;
}

export type AviataState = {
  cities: City[];
  airports: Airport[];
  voyages: Voyage[];
  sightseeings: Sightseeing[];
  airlines: Airline[];
  counties: Country[];
  flights: Flight[];
  tickets: Ticket[];
};

const initialState: AviataState = {
  cities: [],
  airlines: [],
  airports: [],
  sightseeings: [],
  voyages: [],
  counties: [],
  flights: [],
  tickets: [],
};

export const fetchCities = createAsyncThunk("cities", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "cities/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchAirports = createAsyncThunk("airports", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "airports/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchSightseeings = createAsyncThunk("sightseeings", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "sightseeings/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchAirlines = createAsyncThunk("airlines", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "airlines/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchVoyages = createAsyncThunk("voyages", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "voyages/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchCountries = createAsyncThunk("counties", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "counties/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchFlights = createAsyncThunk("flights", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "flights/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

export const fetchTickets = createAsyncThunk("tickets", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "tickets/",
    {
      method: "GET",
    },
  );
  return await response.json();
});

const aviataSlice = createSlice({
  name: "aviata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload;
      console.log("fetchCities fulfilled: ", action.payload);
    });
    builder.addCase(fetchAirlines.fulfilled, (state, action) => {
      state.airlines = action.payload;
      console.log("fetchAirlines fulfilled: ", action.payload);
    });
    builder.addCase(fetchAirports.fulfilled, (state, action) => {
      state.airports = action.payload;
      console.log("fetchAirports fulfilled: ", action.payload);
    });
    builder.addCase(fetchVoyages.fulfilled, (state, action) => {
      state.voyages = action.payload;
      console.log("fetchVoyages fulfilled: ", action.payload);
    });
    builder.addCase(fetchSightseeings.fulfilled, (state, action) => {
      state.sightseeings = action.payload;
      console.log("fetchSightseeings fulfilled: ", action.payload);
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.counties = action.payload;
      console.log("fetchCountries fulfilled: ", action.payload);
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload;
      console.log("fetchTickets fulfilled: ", action.payload);
    });
    builder.addCase(fetchFlights.fulfilled, (state, action) => {
      state.flights = action.payload;
      console.log("fetchFlights fulfilled: ", action.payload);
    });
  },
});

export const {} = aviataSlice.actions;

export default aviataSlice.reducer;
