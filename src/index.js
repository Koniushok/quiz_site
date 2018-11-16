import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//styles
import "./assets/styles/style.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

//router
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

library.add(fas);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
