import styled from "@emotion/styled";
import { ThemeOptions } from "@nwaycorp/nwayplay-designsystem-fe";

export const StyledSampleDiv = styled.div`
  background: ${({ theme }: { theme: ThemeOptions }) => theme.colors.primary};
`;
