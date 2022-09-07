import { Global } from "@emotion/react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Routes from "./routes";
import { prevRouteNameState } from "./store";
import Layout from "./stories/components/Layout";
import * as styles from "./styles";
import { AmplitudeManager } from "./utils/AmplitudeManager";

let _prevPath = "";
export const Injected = new InjectedConnector({
  // wallet에 맞는 connector를 active 함수에 전달해야한다.
  // 메타마스크이기 때문에 InjectedConnector로 Injected 인스턴스를 생성
});

function App() {
  const location = useLocation();
  const setPrevRouteName = useSetRecoilState<string>(prevRouteNameState);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // prevPath
    setPrevRouteName(_prevPath);
    _prevPath = location.pathname;
    // onLoadpage
    AmplitudeManager.Instance.onLoadpage(window.location.href);
  }, [location.pathname]);

  return (
    <div css={styles.app} className="App">
      <Global styles={styles.global} />
      <Layout>
        <Routes></Routes>
      </Layout>
    </div>
  );
}

export default App;
