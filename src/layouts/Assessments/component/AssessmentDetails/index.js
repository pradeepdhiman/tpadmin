

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SoftInput from "components/SoftInput";
import { useState } from "react";
import SoftButton from "components/SoftButton";
import CloseIcon from '@mui/icons-material/Close';
import Header from "../Header";
import { Grid } from "@mui/material";

function AssessmentDetails({ toggleEdit }) {

  function closeEdit() {
    toggleEdit()
  }
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Course Name
        </SoftTypography>
        <Icon
          sx={{
            fontWeight: "bold",
            color: ({ palette: { error } }) => error.main,
            cursor: "pointer",
            mt: -0.5,
          }}
          onClick={closeEdit}
        >
          <CloseIcon />
        </Icon>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} sx={{ display: "flex", justifyContent: "center", alignItem: 'center' }}>
          <Header />
        </SoftBox>
        <SoftBox mb={2}>
          <Grid container>
            <Grid item xs={5}>
              <SoftTypography variant="button" color="text" fontWeight="bold">
                Course name
              </SoftTypography>
            </Grid>
            <Grid item xs={7}>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                Jquery
              </SoftTypography>
            </Grid>
            <Grid item xs={5}>
              <SoftTypography variant="button" color="text" fontWeight="bold">
                Attempted
              </SoftTypography>
            </Grid>
            <Grid item xs={7}>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                24
              </SoftTypography>
            </Grid>
            <Grid item xs={5}>
              <SoftTypography variant="button" color="text" fontWeight="bold">
                Total
              </SoftTypography>
            </Grid>
            <Grid item xs={7}>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                30
              </SoftTypography>
            </Grid>
            <Grid item xs={5}>
              <SoftTypography variant="button" color="text" fontWeight="bold">
                Correct
              </SoftTypography>
            </Grid>
            <Grid item xs={7}>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                15
              </SoftTypography>
            </Grid>
            <Grid item xs={5}>
              <SoftTypography variant="button" color="text" fontWeight="bold">
                Result
              </SoftTypography>
            </Grid>
            <Grid item xs={7}>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                Pass
              </SoftTypography>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default AssessmentDetails;
