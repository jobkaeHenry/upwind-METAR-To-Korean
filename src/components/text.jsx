import styled from "styled-components";

export const GradientText = styled.span`
  background: linear-gradient(to bottom, ${(props)=>props.color || "#fff"}, rgba(0, 0, 0, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${(props)=>props.size || "24px"};
  /* opacity: 0.7; */
`;