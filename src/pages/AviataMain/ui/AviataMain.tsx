import Header from "./Header.tsx";
import TicketPicker from "./TicketPicker.tsx";
import { useAppDispatch } from "../../../store/hooks.ts";
import { useEffect } from "react";
import {
  fetchAirlines,
  fetchAirports,
  fetchCities,
  fetchCountries,
  fetchFlights,
  fetchSightseeings,
  fetchTickets,
  fetchVoyages,
} from "../../../store/slices/AviataSlice.ts";

const AviataMain = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSightseeings());
    dispatch(fetchAirlines());
    dispatch(fetchAirports());
    dispatch(fetchVoyages());
    dispatch(fetchCities());
    dispatch(fetchCountries());
    dispatch(fetchTickets());
    dispatch(fetchFlights());
  }, []);

  return (
    <div className="bg-gray3">
      <Header />
      <TicketPicker />

      {/*<Cities />*/}
      {/*<SightSeeing />*/}
    </div>
  );
};

export default AviataMain;
