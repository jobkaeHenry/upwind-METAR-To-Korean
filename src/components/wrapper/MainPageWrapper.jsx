import styled from 'styled-components'


export const GradientWrapper=styled.main`
  background: linear-gradient(180deg, #3F5EFB 0%, #FF6584 100%);
  border-radius: 0px 0px 0px 60px;
  width: 100%;
  padding : 36px;
  display: flex;
  @media screen and (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
  @media screen and (max-width: 425px) {
    padding : 16px;
  }
`
export const CenteringWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const CompassWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding:0 36px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    max-width: 300px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
    max-width: none;
    justify-content: center;
  }
`