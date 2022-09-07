import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@nwaycorp/nway-designsystem-fe";
import { nWeb3 } from "@nwaycorp/nway-web3-react";

function getLibrary(provider: any) {
  return new nWeb3.ReactLibrary(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <nWeb3.ReactProvider getLibrary={getLibrary}>
      <RecoilRoot>
        <ThemeProvider theme={{}}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </nWeb3.ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
