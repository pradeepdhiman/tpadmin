
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Details() {
  const [courseid, setCourseid]=useState("kjfse")
  const Navigate = useNavigate()

  function selectHandler() {
    Navigate("/authentication/sign-up?courseid="+courseid)
  }
  return (
    <Card>
      <SoftBox p={2} mt={3}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12} lg={4} sx={{ position: "relative", ml: "auto" }} >
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox component="img" src={rocketWhite} alt="rocket" width="100%" pt={3} />
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  By Maximan
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Advance javascript
              </SoftTypography>
              <SoftBox mb={2}>
                <SoftTypography variant="body2" color="text">
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                  From colors, cards, typography to complex elements
                </SoftTypography>
              </SoftBox>
              <SoftButton variant="gradient" color="dark" onClick={selectHandler}>
                Select Course
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default Details;
