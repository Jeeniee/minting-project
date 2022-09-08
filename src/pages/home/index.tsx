import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@nwaycorp/nway-designsystem-fe";
import { StyledSampleDiv } from "./styles";
import { Injected } from "App";
import { useEffect, useState } from "react";
import constants from "../../constants";
import NftCard from "stories/components/home/NftCard";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const Page = () => {
  const theme = useTheme();
  const {
    account,
    chainId,
    active,
    activate,
    deactivate,
    library,
  } = useWeb3React();

  const [isMinting, setIsMinting] = useState(false);
  const [nfts, setNfts] = useState<any[]>([]);

  const handleConnect = () => {
    if ((window as any).ethereum === undefined) {
      // 설치가 안되어있으면 설치 페이지를 오픈
      window.open(
        `https://metamask.app.link/dapp/${window.location.host}`,
        "_blank"
      );
      return;
    }
    if (active && account) {
      deactivate();
    }
    activate(Injected);
    // activate 함수로, App에서 만든 Injected란 이름의 connector 인스턴스를 넘겨준다
  };

  const handleMint = async (address: string) => {
    const abi = [
      {
        inputs: [{ internalType: "uint256", name: "count", type: "uint256" }],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const contractInstance = new ethers.Contract(address, abi);
    const data = await contractInstance.populateTransaction.mint(1);
    setIsMinting(true);
    const signer = library.getSigner(); // 잠금해제된 계정을 받아왔다.
    const signedTransaction = await signer.sendTransaction(data);
    // 잠금해제된 계정으로, 아까의 트랜잭션 구조 객체를 담아서 트랜잭션을 전송한다.
    let reciept = await signedTransaction.wait();
    console.log("reciept", reciept);
    setIsMinting(false);
  };

  return (
    <Container>
      <StyledSampleDiv theme={theme}>
        <Typography variant="h4" color={theme.colors.gray[1000]}>
          Account: {account}
        </Typography>
        <Typography variant="h4" color={theme.colors.gray[1000]}>
          chainId: {chainId}
        </Typography>
        <Button onClick={handleConnect}>
          {active ? "연결 해제" : "지갑 연결하기"}
        </Button>
        <Stack direction="row" alignItems="center" spacing="400">
          <Box>
            <Typography variant="h6">Contract Address :</Typography>
            <Typography variant="h6">
              0x095dB0F30c13e9bfaBb77f5f3E51F2FCE5Ad0bE1
            </Typography>
          </Box>
          <Button
            onClick={() => handleMint(constants.BAYC_ETH_ADDRESS)}
            color="primary"
            disabled={isMinting === true}
            isLoading={isMinting}
          >
            Minting
          </Button>
        </Stack>
        {active && (
          <Box>
            <Typography variant="h6">Your NFTs</Typography>
            <Stack direction="row" spacing="300">
              {nfts?.map((item) => {
                return (
                  <NftCard
                    key={item.token_id}
                    id={item.token_id}
                    asset={item.asset}
                  />
                );
              })}
            </Stack>
          </Box>
        )}
      </StyledSampleDiv>
    </Container>
  );
};;;;;;

export default Page;
