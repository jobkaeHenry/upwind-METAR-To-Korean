import React from "react";
import styled from "styled-components";

export const cloudWrap = styled.div`
  width: 100%;
  min-width: 300px;
  &div .legend {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CloudGraph = (metarCloud) => {
  const cloudsGenerator = () => {
    let maxHeight = 30000
    if (!metarCloud) {
      return;
    } else {
      maxHeight = metarCloud[metarCloud.length - 1].height;

    }

    return (
      <cloudWrap>
        <div className="legend"></div>
        <div className="clouds">{cloudsGenerator()}</div>
      </cloudWrap>
    );
  };
};
