import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./sass/index.scss";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { Loader } from "./components/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
