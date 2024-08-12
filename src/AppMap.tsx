import React from "react";
//import Box from "./components/Map/Box/Box";
import Box from "./components/Map/Box/Box";
import Test from "./components/Map/Test";
import TestOCR from "./components/OCR/Test";
import Nav from "./components/Map/Nav";
import Map from "./components/Map/Box/Map";
const AppMap = () => {
  return (
    <div>
      <Nav></Nav>
      <Map apiKey={"AIzaSyBQPQKkeX4E_gwYePXEnnWgWr_aG7qQYKQ"} />;
    </div>
  );
  // return <Box />;
  //return <TestOCR />;
};

export default AppMap;
