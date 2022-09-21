import axios from "axios";
import { parseMetar } from "metar-taf-parser";
import React, { useEffect, useState } from "react";
import { WindDirectionCompass } from "../components/windDirectionCompass";
import { WindSpeedCompass } from "../components/windSpeedCompass";
import { GradientWrapper } from "../components/wrapper/MainPageWrapper";
import { GhostButton } from "./../components/button";

export const MainPage = () => {
  const defaultMetar = parseMetar(
    "RKSI 210700Z VRB05KTKT 10SM CAVOK 23/11 Q1016 NOSIG="
  );

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
    console.log(parsedMetar)
    let result = ` 현재 바람은 ${(parsedMetar.wind.degrees?parsedMetar.wind.degrees+"°":"변동으로 인해 측정이 불가능한")} 방향에서 ${parsedMetar.wind.speed}${parsedMetar.wind.unit}의 세기로 불고 있으`;
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
    }else {result+="며, "}
    return result
  };

  const visibilityToKor =(parsedMetar)=>{
    let result = "현재 활주로 시정은"
      if(parsedMetar.cavok){
        result+=" 10km 이상이며, 운항 상 장애요인이 없는 CAVOK 입니다. "
      }else if(parsedMetar.visibility.value === 9999){
        result+=" 10km 이상입니다. "
      }else result+= `${parsedMetar.visibility.value}${parsedMetar.visibility.unit} 입니다. `
    return result
  }

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
      <div>
        <p>{`메타 전문: ${rawMetar}`}</p>
        <GhostButton>{parsedMetar.wind.degrees}</GhostButton>
        <p>
          {airportName} ({ICAO}) 에서 국제 표준시(UTC) {parsedMetar.day}일 {parsedMetar.hour}
          시 {parsedMetar.minute === 0 ? "00" : parsedMetar.minute}분에 발행된
          METAR 입니다. 
          {windDataToKor(defaultMetar)}
          {visibilityToKor(defaultMetar)}
          <br/>
          현재기온은 {parsedMetar.temperature}℃,
          노점온도는 {parsedMetar.dewPoint}℃ 입니다
          고도계 수정치는 {parsedMetar.altimeter} 입니다
        </p>
      </div>
    </>
  );
};
