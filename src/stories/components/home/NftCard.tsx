import { Box, Image, Stack, Typography } from "@nwaycorp/nway-designsystem-fe";

interface nftCardProps {
  asset: string;
  id: string;
}

const NftCard = ({ asset, id }: nftCardProps) => {
  return (
    <Box borderRadius={5} border="1px solid black">
      <Image src={asset} width={"100%"} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={"200"}
      >
        <Typography variant="body1">{id}</Typography>
      </Stack>
    </Box>
  );
};
export default NftCard;
