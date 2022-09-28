import styled from "styled-components";

export const GradientText = styled.span`
  background: linear-gradient(to bottom, ${(props)=>props.color || "#fff"}, rgba(255, 255,255, 0.1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${(props)=>props.size || "24px"};
  /* opacity: 0.7; */
`;