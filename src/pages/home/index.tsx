import { Grid, Typography, useTheme } from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledSampleDiv } from "./styles";

const Page = () => {
  const theme = useTheme();

  console.log("1");

  return (
    <Grid outer>
      <Grid container>
        <Grid xs={12} item>
          <StyledSampleDiv theme={theme}>
            <Typography variant="h4" color={theme.colors.gray[1000]}>
              메인 홈 화면
            </Typography>
          </StyledSampleDiv>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
