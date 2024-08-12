import React from "react";
import ReactDOM from "react-dom/client";
import App2 from "./App2";
import AppExpense from "./AppExpense";
import AppMap from "./AppMap";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraBaseProvider } from "@chakra-ui/react";
import "./index.css";

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css?family=Jost";
link.rel = "stylesheet";
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppMap />
  </React.StrictMode>
);
