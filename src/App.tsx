import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Banner from "./components/Banner";
import Snek from "./components/Snek";
import Instructions from "./components/Instructions";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
  body {
    min-height: 100vh;
    background-image: linear-gradient(hsl(278, 100%, 17%) 1px, transparent 1px),
    linear-gradient(to right, hsl(278, 100%, 17%) 1px, transparent 1px),
    linear-gradient(
      0deg,
      hsl(287, 100%, 3%) 0%,
      hsl(269, 100%, 9%) 100%
      );
      background-size: 45px 45px, 45px 45px, 100%;
      backdrop-filter: blur(1px);
      background-attachment: fixed;
      background-position: center;
  }

`;

const StyledApp = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 50px 25px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Banner />
        <Snek />
        <Instructions />
      </StyledApp>
    </>
  );
}

export default App;
