import React from "react";
import styled from "styled-components";
import niddleGreen from "../../img/windspeed_compass_niddle(green).png";
import niddleAmber from "../../img/windspeed_compass_niddle(amber).png";
import niddleRed from "../../img/windspeed_compass_niddle(red).png";
import body from "../../img/windspeed_compass_body.png";
import { CompassContainer } from "./windDirectionCompass";
import { CompassBody } from "./windDirectionCompass";

const colorCalc = (speed, gust) => {
  if (gust && speed > 25) {
    return niddleRed;
  } else if (gust || speed > 15) {
    return niddleAmber;
  } else return niddleGreen;
};

const CompassNiddle = styled.img`
  width: 100%;
  position: absolute;
  transform: rotate(${(props) => props.degree || "0"}deg);
  z-index: 4;
  transition-duration: 300ms;

  &.vibrate{
    @keyframes gustAnim {

    0% {
      transform: rotate(${(props) => props.degree+1 || "0"}deg);
    }
    50%{
      transform: rotate(${(props) => props.degree-1 || "0"}deg);
    }
  }
  animation: gustAnim 300ms infinite;
  }
`;

export const WindSpeedCompass = ({ speed, gust, bgcolor }) => {
  return (
    <CompassContainer bgcolor={bgcolor} title={gust?`평균 풍속 ${speed}Kt, 최고 ${gust}Kt 의 돌풍`:`${speed}Kt`}>
      <CompassNiddle className={gust||speed>=55?"vibrate":null} src={colorCalc(speed, gust)} degree={speed<=55?speed*3.6 : 55*3.6}/>
      <CompassBody src={body}></CompassBody>
    </CompassContainer>
  );
};
