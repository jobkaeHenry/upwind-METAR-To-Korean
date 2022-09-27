import React from "react";
import styled from "styled-components";
import { GhostButton } from "../button";
import { randomNum } from './../../controller/controller';

import cloudImg01 from "../../img/cloud01.png"
import cloudImg02 from "../../img/cloud02.png"
import cloudImg03 from "../../img/cloud03.png"
import cloudImg04 from "../../img/cloud04.png"
import cloudImg05 from "../../img/cloud05.png"


const randomCloud =()=>{
  const cloudsList = [cloudImg01,cloudImg02,cloudImg03,cloudImg04,cloudImg05]
  console.log(cloudsList[randomNum(0,4)])
  return cloudsList[randomNum(0,4)]
}

const CloudWrap = styled.div`
  width: 100%;
  min-width: 300px;
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "none")};
  padding: 10px;
  display: flex;
`;

const CloudTable = styled.div`
  width: 100%;
  height: 100%;
  min-height: 150px;
  border-width: 0px 0px 1px 1px;
  border-style: solid;
  border-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 8px;
  position: relative;
`;

const AltitudeLegned = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;
const LegendElem = styled.span`
  color: #fff;
`;

const NoCloud = styled(GhostButton)`
  border-color: #fff;
`;

const CloudElem = styled.img`
  position: absolute;
  bottom: ${(props)=>props.position}%;
  width: 10%;
`

const CloudGenaratorElem = ({ height, quantity }) => {

  let positionByHeight = height/100;
  let oktas;
  switch (quantity) {
    case "FEW":
      oktas = 2;
      break;
    case "SCT":
      oktas = 4;
      break;
    case "BKN":
      oktas = 6;
      break;
    case "OVC":
      oktas = 8;
      break;
    default:
      break;
  }
  return <CloudElem position={positionByHeight} src={randomCloud()} />

};

export const CloudGraph = ({ metarCloud, bgcolor }) => {

  const cloudsGenerator = () => {
    if (metarCloud === undefined || metarCloud.length === 0) {
      return <NoCloud className="white">구름이 없습니다</NoCloud>;
    } else {
      return metarCloud.map((e) => {
        return (
          <CloudGenaratorElem
            height={e.height}
            quantity={e.quantity}
          />
        );
      });
    }
  };

  return (
    <CloudWrap bgcolor={bgcolor}>
      <AltitudeLegned>
        <LegendElem>10,000</LegendElem>
        <LegendElem>5,000</LegendElem>
        <LegendElem>0</LegendElem>
      </AltitudeLegned>
      <CloudTable>{cloudsGenerator(metarCloud)}</CloudTable>
    </CloudWrap>
  );
};
