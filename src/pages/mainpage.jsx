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

  //개발용
  const defaultMetar = parseMetar(
    "RKSI 280830Z 27006KT 8000 NSC 22/18 Q1013 NOSIG="
  );

  // 배포용
  // const defaultMetar = parseMetar(
  //   "RKSG 230656Z AUTO 00000KT -RASN FG HZ 19/09 A2991 RMK AO2 SLP131 T01940093 $"
  // );

  console.log(defaultMetar);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const [rawMetar, setRawMetar] = useState("");
  const [parsedMetar, setParsedMetar] = useState(defaultMetar);
  const [ICAO, setICAO] = useState("RKSI");
  const [airportName, setAirportName] = useState("");
  // console.log(parsedMetar);

  useEffect(() => {
    
    axios
      .get(
        `https://apis.data.go.kr/1360000/AmmService/getMetar?servicekey=${API_KEY}&icao=${ICAO}&dataType=JSON`
      )
      .then((res) => {
        const response = res.data.response.body.items.item[0];
        console.log(response)
        setAirportName(response.airportName);
        setRawMetar(response.metarMsg.replace(`METAR `, ""));
        setParsedMetar(parseMetar(response.metarMsg.replace(`METAR `, "").replace("NCD","NSC")));
        setICAO(response.icaoCode);
      }).catch((err)=>{console.log(err)});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ICAO]);

  return (
    <>
      <GradientWrapper>
{/* 공항이름 */}
        <ColumnWrapper>
          <ColumnWrapper>
            <span className="white bold">{ICAO}</span>
            <GradientText size={"3rem"} className={"bold"}>{airportName}</GradientText>
          </ColumnWrapper>
          <RowWrapper>
{/* 구름그래프 */}
            <CloudGraph metarCloud={parsedMetar.clouds}/>
{/* 콤파스 */}
            <WindDirectionCompass degree={parsedMetar.wind.degrees} variable={parsedMetar.wind.minVariation} />
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
