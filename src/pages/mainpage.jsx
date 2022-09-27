import axios from "axios";
import { parseMetar } from "metar-taf-parser";
import React, { useEffect, useState } from "react";
import { WindDirectionCompass } from "../components/indicator/windDirectionCompass";
import { WindSpeedCompass } from "../components/indicator/windSpeedCompass";
import {
  ColumnWrapper,
  GradientWrapper,
  RowWrapper,
} from "../components/wrapper/MainPageWrapper";
import { windDataToKor,cloudToKor,visibilityToKor } from "../controller/controller";
import { GhostButton } from "./../components/button";
import { GradientText } from "./../components/text";
import {CloudGraph} from './../components/indicator/cloudGraph';

export const MainPage = () => {
  const defaultMetar = parseMetar(
    "RKSG 230656Z AUTO 30014KT FEW018 SCT030CB BKN095 10SM -RASN FG HZ 19/09 A2991 RMK AO2 SLP131 T01940093 $"
  );
  console.log(defaultMetar);

  const [rawMetar, setRawMetar] = useState("");
  const [parsedMetar, setParsedMetar] = useState(defaultMetar);
  const [ICAO, setICAO] = useState("RKPU");
  const [airportName, setAirportName] = useState("");
  // console.log(parsedMetar);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://apis.data.go.kr/1360000/AmmService/getMetar?servicekey=${API_KEY}&icao=${ICAO}&dataType=JSON`
      )
      .then((res) => {
        const response = res.data.response.body.items.item[0];
        setAirportName(response.airportName);
        setRawMetar(response.metarMsg.replace(`METAR `, ""));
        setParsedMetar(parseMetar(response.metarMsg.replace(`METAR `, "")));
        setICAO(response.icaoCode);
      }).catch((err)=>{console.log(err)});
  }, [ICAO]);

  return (
    <>
      <GradientWrapper>
        <ColumnWrapper>
          <ColumnWrapper>
            <span className="white bold">{ICAO}</span>
            <GradientText size={"3rem"} className={"xbold"}>{airportName}</GradientText>
          </ColumnWrapper>
          <RowWrapper>
            <CloudGraph metarCloud={parsedMetar.clouds}/>
            <WindDirectionCompass degree={parsedMetar.wind.degrees} />
            <WindSpeedCompass
              speed={parsedMetar.wind.speed}
              gust={parsedMetar.wind.gust}
            />
          </RowWrapper>
        </ColumnWrapper>
      </GradientWrapper>

      <ColumnWrapper>
        <p>{rawMetar}</p>
        <div>
          <GhostButton className="bold">{parsedMetar.wind.degrees}</GhostButton>
          <GhostButton className="bold">{parsedMetar.wind.degrees}</GhostButton>
        </div>
        <p>
          {airportName} ({ICAO}) 에서 국제 표준시(UTC) {parsedMetar.day}일{" "}
          {parsedMetar.hour}시{" "}
          {parsedMetar.minute === 0 ? "00" : parsedMetar.minute}분에 발행된
          정시관측보고 입니다.
          {windDataToKor(parsedMetar)}
          {visibilityToKor(parsedMetar)}
          {cloudToKor(parsedMetar)}
          현재기온은 {parsedMetar.temperature}℃, 노점온도는{" "}
          {parsedMetar.dewPoint}℃ 입니다 고도계 수정치는 {parsedMetar.altimeter}
          {"hPa "}
          입니다
        </p>
      </ColumnWrapper>
    </>
  );
};
