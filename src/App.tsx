import React,{ useState } from 'react';
import axios from "axios"
import {parseMetar} from  "metar-taf-parser"

function App() {
  const [metar,setMetar] = useState("KTTN 051853Z 04011KT 1 1/2SM VCTS SN FZFG BKN003 OVC010 M02/M02 A3006 RMK AO2 TSB40 SLP176 P0002 T10171017=")
  const parsedMetar = (parseMetar(metar))
  return (
    <div className="App">
      {parsedMetar.day}{parsedMetar.dewPoint}
    </div>
  );
}

export default App;
