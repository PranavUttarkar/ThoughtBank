import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
