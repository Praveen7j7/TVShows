import "./App.css";
import Section from "./components/Section/Section.jsx";
import { useEffect } from "react";
import React from "react";

import {StyledEngineProvider} from "@mui/material/styles";

export default function App() {
  useEffect(() => {});

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Section />
      </div>
    </StyledEngineProvider>
  );
}
