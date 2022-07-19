import styled from "@emotion/styled";
import { Box, ThemeOptions } from "@nwaycorp/nwayplay-designsystem-fe";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  padding: 20px 0px;
  background: violet;
  border: 1px solid black;
`;

export const StyledBox = styled(Box)<{ theme: ThemeOptions }>`
  ${({ theme }) => `
    width: fit-content;
    padding: ${theme.spacing[200]}px;
    border: 2px solid ${theme.colors.system.info};
    border-radius: 8px;
  `}
`;
