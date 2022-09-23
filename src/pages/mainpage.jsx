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
import { GhostButton } from "./../components/button";
import { GradientText } from "./../components/text";

export const MainPage = () => {
  const defaultMetar = parseMetar(
    "RKSG 230656Z AUTO 30014KT 10SM -RASN FG HZ 19/09 A2991 RMK AO2 SLP131 T01940093 $"
  );
  console.log(defaultMetar);

  const [rawMetar, setRawMetar] = useState("");
  const [parsedMetar, setParsedMetar] = useState(defaultMetar);
  const [ICAO, setICAO] = useState("RKPC");
  const [airportName, setAirportName] = useState("");
  // console.log(parsedMetar);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://apis.data.go.kr/1360000/AmmService/getMetar?servicekey=${API_KEY}&icao=${ICAO}&dataType=JSON`
      )
      .then((res) => {
        // console.log(res.data.response.body.items.item[0]);
        const response = res.data.response.body.items.item[0];
        setAirportName(response.airportName);
        setRawMetar(response.metarMsg.replace(`METAR `, ""));
        setParsedMetar(parseMetar(response.metarMsg.replace(`METAR `, "")));
        setICAO(response.icaoCode);
      });
  }, [ICAO]);

  const windDataToKor = (parsedMetar) => {
    let result = ` 현재 바람은 ${
      parsedMetar.wind.degrees
        ? parsedMetar.wind.degrees + "°"
        : "평균풍향 측정이 불가한"
    } 방향에서 ${parsedMetar.wind.speed}${
      parsedMetar.wind.unit
    }의 세기로 불고 있으`;
    if (
      parsedMetar.wind.minVariation ||
      parsedMetar.wind.maxVariation ||
      parsedMetar.wind.gust
    ) {
      result += "나,";
      if (parsedMetar.wind.gust && parsedMetar.wind.minVariation) {
        result += ` 최고 ${parsedMetar.wind.gust}Kt 의 돌풍과 ${parsedMetar.wind.minVariation}°~${parsedMetar.wind.maxVariation}°사이의 변동을 가진 바람이 관측되니`;
      } else if (parsedMetar.wind.gust) {
        result += ` ${parsedMetar.wind.gust}Kt 의 돌풍이 관측되니`;
      } else if (parsedMetar.wind.minVariation) {
        result += ` ${parsedMetar.wind.minVariation}°~${parsedMetar.wind.maxVariation}° 사이의 변동을 가진 바람이 관측되니`;
      }
      result += " 주의가 필요합니다.";
    } else {
      result += "며, ";
    }
    return result;
  };
  const visibilityToKor = (parsedMetar) => {
    const visibility = parsedMetar.visibility;
    let result = "현재 우세시정은 ";
    if (parsedMetar.cavok) {
      result += " 10km 이상이며, 운항 상 장애요인이 없는 CAVOK ";
    } else if (visibility.value === 9999) {
      result += " 10km 이상";
    } else result += `${visibility.value}${visibility.unit}`;
    if (visibility.min) {
      result += `이며, 최소 시정은 ${
        visibility.min.direction ? `${visibility.min.direction}방향에서 ` : ""
      } ${visibility.min.value}m `;
    }
    result += "입니다. ";
    return result;
  };
  const cloudToKor = (parsedMetar) => {
    const cloud = parsedMetar.clouds;
    let result = "";
    if (cloud.length > 0) {
      result += "현재 구름은 ";
      for (let i = 0; i < cloud.length; i++) {
        result += `${cloud[i].height}ft 높이에 ${cloud[i].quantity}구름`;
        if (i === cloud.length - 1) {
          result += "이 관측됩니다.";
        } else result += ", ";
      }
    } else if (parsedMetar.cavok || cloud.length === 0) {
      return;
    }
    return result;
  };

  return (
    <>
      <GradientWrapper>
        <ColumnWrapper>
          <ColumnWrapper>
            <span className="white">{ICAO}</span>
            <GradientText size={"3rem"} className={"xbold"}>{airportName}</GradientText>
          </ColumnWrapper>
          <RowWrapper>
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
          METAR 입니다.
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
