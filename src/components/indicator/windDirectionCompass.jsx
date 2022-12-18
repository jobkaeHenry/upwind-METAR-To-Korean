import React from "react";
import styled from "styled-components";
import niddle from "../../img/direction_compass_niddle.png";
import body from "../../img/direction_compass_body(rotate).png";

export const CompassContainer = styled.div`
  width: 100%;
  max-width: 350px;
  min-width: 160px;
  background-color: ${(props) => props.bgcolor || "none"};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 16px;
  opacity: 0.7;

&:hover{
  opacity: 1;
}
`;
const CompassNiddle = styled.img`
  width: 100%;
  position: absolute;
  transform: rotate(${(props) => props.degree || "0"}deg);
  z-index: 4;
  
  
  
  &.variable {
    @keyframes variableAnim {
      0% {
        transform: rotate(${(props) => props.degree + 1 || "0"}deg);
      }
      50% {
        transform: rotate(${(props) => props.degree - 1 || "0"}deg);
      }
    }
    animation: variableAnim 300ms infinite;
  }

`;
export const CompassBody = styled.img`
  width: 100%;
`;

export const WindDirectionCompass = ({ degree, variable, bgcolor }) => {
  return (
    <CompassContainer bgcolor={bgcolor} title={variable.min?`${variable.min}°~${variable.max}°`:`${degree}°`}>
      <CompassNiddle className={variable.min?"variable":null} src={niddle} degree={degree+180} />
      <CompassBody src={body}></CompassBody>
    </CompassContainer>
  );
};
