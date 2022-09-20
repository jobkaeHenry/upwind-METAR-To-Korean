import React from "react";
import styled from "styled-components";
import niddle from "../img/direction_compass_niddle.png";
import body from "../img/direction_compass_body(rotate).png";

export const CompassContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  min-width: 200px;
  min-height: 200px;
  background-color: ${(props)=>props.bgcolor || "none"};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 16px;
`;
const CompassNiddle = styled.img`
  width: 100%;
  position: absolute;
  transform: rotate(${(props)=>props.degree+180 || "0"}deg);
  z-index: 4;
  transition-duration: 300ms;
`;
export const CompassBody = styled.img`
  width: 100%;
`;

export const WindDirectionCompass = ({degree, bgcolor}) => {
  return (
    <CompassContainer bgcolor={bgcolor}>
      <CompassNiddle src={niddle} degree={degree}/>
      <CompassBody src={body}></CompassBody>
    </CompassContainer>
  );
};
