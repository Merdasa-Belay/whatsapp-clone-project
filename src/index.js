import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./reducer";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
reportWebVitals();
