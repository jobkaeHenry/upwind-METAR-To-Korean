import axios from "axios";
import { parseMetar } from "metar-taf-parser";
import React, { useEffect, useState } from "react";
import { WindDirectionCompass } from "../components/windDirectionCompass";
import { WindSpeedCompass } from "../components/windSpeedCompass";
import { GradientWrapper } from "./../components/wrapper/MainPageWrapper";

export const MainPage = () => {
  const defaultMetar = parseMetar(
    "KTTN 051853Z 04020G15KT 1 1/2SM VCTS SN FZFG BKN003 OVC010 M02/M02 A3006 RMK AO2 TSB40 SLP176 P0002 T10171017="
  );
  const [rawMetar, setRawMetar] = useState("");
  const [parsedMetar, setParsedMetar] = useState(defaultMetar);

  const [ICAO, setICAO] = useState("RKSI");

  const [airportName, setAirportName] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://apis.data.go.kr/1360000/AmmService/getMetar?servicekey=ePINzJyTp1MOBnHyj72pB6UQXe5gDuS7fisXu%2BlC0OxScS0V%2BXje7Dy2HbamRoEf1qvbtC7CPXIsOXOdb%2F%2BRLQ%3D%3D&icao=${ICAO}&dataType=JSON`
      )
      .then((res) => {
        console.log(res.data.response.body.items.item[0]);
        setAirportName(res.data.response.body.items.item[0].airportName);
        setRawMetar(res.data.response.body.items.item[0].metarMsg);
        setParsedMetar(
          parseMetar(res.data.response.body.items.item[0].metarMsg)
        );
        setICAO(res.data.response.body.items.item[0].icaoCode);
      });
  }, [ICAO]);

  return (
    <>
      <GradientWrapper>
        <p>{`ICAO : ${ICAO} Airport : ${airportName}`}</p>
        <WindDirectionCompass degree={parsedMetar.wind.degrees} />
        <WindSpeedCompass
          speed={parsedMetar.wind.speed}
          gust={parsedMetar.wind.gust}
        />
      </GradientWrapper>
      <p>{`메타 전문: ${rawMetar}`}</p>
    </>
  );
};
