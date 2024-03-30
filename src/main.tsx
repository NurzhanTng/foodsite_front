import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const tg = window.Telegram.WebApp;
tg.expand();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
