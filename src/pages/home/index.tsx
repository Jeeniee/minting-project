import {
  Container,
  Grid,
  Typography,
  useTheme,
} from "@nwaycorp/nway-designsystem-fe";
import { StyledSampleDiv } from "./styles";

const Page = () => {
  const theme = useTheme();

  console.log("1");

  return (
    <Container>
      <StyledSampleDiv theme={theme}>
        <Typography variant="h4" color={theme.colors.gray[1000]}>
          메인 홈 화면
        </Typography>
      </StyledSampleDiv>
    </Container>
  );
};

export default Page;
