
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function MatItem({ date, id, price, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={1}
    >
      <SoftBox lineHeight={1}>
        <SoftTypography display="block" variant="button" fontWeight="medium">
          {date}
        </SoftTypography>
        <SoftTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </SoftTypography>
      </SoftBox>
      <SoftBox display="flex" alignItems="center">
        {/* <SoftTypography variant="button" fontWeight="regular" color="text">
          {price}
        </SoftTypography> */}
        <SoftBox display="flex" alignItems="center" lineHeight={0} ml={3} sx={{ cursor: "poiner" }}>
          <Icon fontSize="small">picture_as_pdf</Icon>
          <SoftTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" alignItems="center" lineHeight={0} ml={3} sx={{ cursor: "poiner" }}>
          <Icon fontSize="small" color="error" sx={{cursor:"pointer"}}><DeleteForeverIcon/></Icon>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}



export default MatItem;
