import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DeliveryLayer = {
  points: [number, number][];
  cost: number;
};

export type CompanySpot = {
  id: number;
  manager: string;
  delivery_layers: DeliveryLayer[];
  products_on_stop: Array<number>;
  additions_on_stop: Array<number>;
  name: string;
  link: string;
  address: { long: number; lat: number; parsed?: string };
  address_link: string;

  open_time: string;
  close_time: string;
};

export type CompanyState = {
  companies: Array<CompanySpot>;
};

const initialState: CompanyState = {
  companies: [],
};

export const fetchCompanies = createAsyncThunk("companies", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "service/company_spots/",
    {
      method: "GET",
    },
  );
  const data = response.json();
  console.log(data);
  return data;
});

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Array<CompanySpot>>) => {
      state.companies = action.payload;
    },
    clearState: (state) => {
      state.companies = initialState.companies;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
  },
});

export const { setCompanies, clearState } = companySlice.actions;

export default companySlice.reducer;
