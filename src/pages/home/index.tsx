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
import {
  CHAIN_NETWORK,
  useNWeb3,
  WalletProvider,
} from "@nwaycorp/nway-web3-react";
import { Injected } from "App";
import { useEffect, useState } from "react";
import NftCard from "stories/components/Home/NftCard";
import constants from "../../constants";

const Page = () => {
  const theme = useTheme();
  const {
    active,
    account,
    chainId,
    activeWallet,
    deactivateWallet,
    getContractInstance,
    sendTransaction,
  } = useNWeb3({
    targetChainIds: [1],
  });
  const [isMinting, setIsMinting] = useState(false);
  const [nfts, setNfts] = useState<any[]>([]);

  const wallet = {
    id: "metamask",
    name: "Metamask",
    imgUrl: "/assets/images/icon_wallet_metamask.svg",
    provider: "INJECTED" as WalletProvider,
    connector: Injected,
    // web3-react는 connector를 연결해서 context가 어떤 데이터를 관리할 지 결정할 수 있다.
    // 그래서 지갑을 연결하기 위해서 connector를 연결한 것
  };

  const handleConnect = async () => {
    if ((window as any).ethereum === undefined) {
      window.open(
        `https://metamask.app.link/dapp/${window.location.host}`,
        "_blank"
      );
      return;
    }
    await activeWallet(wallet.provider, wallet.connector);
    // 생성한 connector 인스턴스를 active 함수에 전달
    // 정상적으로 실행될 경우 useWeb3React에 제공하는 context값들이 갱신된다.
    if (active && account) {
      deactivateWallet();
    }
  };

  const getTokenIds = async () => {
    const abi = [
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ];

    const contractInstance = getContractInstance(
      constants.BAYC_ETH_ADDRESS,
      abi
    );

    const totalBalance = await contractInstance.balanceOf(account);

    const tokenIds = [];
    for (let i = 0; i < totalBalance; i++) {
      // tokenOfOwnerByIndex로는 한번에 모든 배열을 가져올 수 없다. 그래서 반복문이 필요함
      const tokenId = await contractInstance.tokenOfOwnerByIndex(account, i);
      tokenIds.push(tokenId.toString());
    }
    console.log("tokenIds", tokenIds);
    setNfts(
      tokenIds.map((tokenId, index) => {
        return {
          token_id: tokenId,
          asset: `https://ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi`,
        };
      })
    );
  };
  console.log("nfts", nfts);

  useEffect(() => {
    if (active) {
      getTokenIds();
    }
  }, [active]);

  const handleMint = async (address: string) => {
    if (!active) {
      alert("지갑을 연결하세요");
      return;
    }
    const abi = [
      {
        inputs: [{ internalType: "uint256", name: "count", type: "uint256" }],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const contractInstance = getContractInstance(address, abi);

    const data = await contractInstance.populateTransaction.mint(1);
    setIsMinting(true);
    await sendTransaction(data);
    setIsMinting(false);

    getTokenIds();
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
};

export default Page;
