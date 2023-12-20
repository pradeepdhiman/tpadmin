import { Divider } from "@mui/material";
import SoftBox from "components/SoftBox";

function Separator() {
  return (
    <SoftBox position="relative" py={0.25}>
      <Divider />
    </SoftBox>
  );
}

export default Separator;
