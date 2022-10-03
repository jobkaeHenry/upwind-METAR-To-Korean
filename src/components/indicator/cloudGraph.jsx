import React from "react";
import styled from "styled-components";
import { GhostButton } from "../button";
import { numberComma, randomNum } from "./../../controller/controller";

import cloudImg01 from "../../img/cloud01.png";
import cloudImg02 from "../../img/cloud02.png";
import cloudImg03 from "../../img/cloud03.png";
import cloudImg04 from "../../img/cloud04.png";
import cloudImg05 from "../../img/cloud05.png";

const randomCloud = () => {
  const cloudsList = [
    cloudImg01,
    cloudImg02,
    cloudImg03,
    cloudImg04,
    cloudImg05,
  ];
  return cloudsList[randomNum(0, 4)];
};

const CloudWrap = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "none")};
  padding: 10px;
  display: flex;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const CloudTable = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 100%;
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

const CloudElemWrapper = styled.div`
  position: absolute;
  bottom: ${(props) => props.position}%;
  display: flex;
  justify-content: space-around;
`;

const CloudElem = styled.img`
  width: ${(props) => props.randomNum(12, 20)}%;
  object-position: bottom;
  padding-bottom: ${(props) => props.randomNum(0, 2)}vh;
  /* padding-right: ${(props) => -props.randomNum(0, 12)}px; */
  margin : 0 -15vw;
`;

const CloudRow = ({ height, quantity, maxHeight }) => {
  let positionByHeight = height / (maxHeight / 91);
  let oktas;
  let emptyArr = [];

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
  for (let i = 0; i < oktas; i++) {
    emptyArr.push("henry");
  }

  return (
    <CloudElemWrapper position={positionByHeight} title={`${quantity}/${height}ft`}>
      {emptyArr.map((e,i) => {
        return <CloudElem src={randomCloud()} randomNum={randomNum} key={`${height}${i}`} />;
      })}
    </CloudElemWrapper>
  );
};

const cloudsGenerator = (metarCloud, maxHeight) => {
  if (metarCloud.length === 0 || metarCloud[0].quantity === "NSC") {
    return <NoCloud className="white">구름이 없습니다</NoCloud>;
  } else {
    return metarCloud.map((e,i) => {
      return (
        <CloudRow
          height={e.height}
          quantity={e.quantity}
          maxHeight={maxHeight}
          key ={`${e.height}`}
        />
      );
    });
  }
};

export const CloudGraph = ({ metarCloud, bgcolor }) => {
  let maxHeight = 10000;
  if (metarCloud !== [] && metarCloud[0].height !== undefined) {
    if(metarCloud[metarCloud.length - 1].height>maxHeight)
    {maxHeight = metarCloud[metarCloud.length - 1].height;}
  }

  return (
    <CloudWrap bgcolor={bgcolor}>
      <AltitudeLegned>
        <LegendElem>{numberComma(maxHeight)}</LegendElem>
        <LegendElem>{numberComma(maxHeight / 2)}</LegendElem>
        <LegendElem>0</LegendElem>
      </AltitudeLegned>
      <CloudTable>{cloudsGenerator(metarCloud, maxHeight)}</CloudTable>
    </CloudWrap>
  );
};