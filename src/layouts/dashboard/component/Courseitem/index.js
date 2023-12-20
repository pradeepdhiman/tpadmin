
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import { useLocation } from "react-router-dom";
import SoftButton from "components/SoftButton";
import { Box, LinearProgress } from "@mui/material";
import { useState } from "react";
import SoftProgress from "components/SoftProgress";

function CourseItem({ complete = false, relativeCourse = false }) {
  const [progress, setProgress] = useState(30);

  const location = useLocation()
  console.log(location)
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }} >
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
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  By Maximan
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Advance javascript
              </SoftTypography>
              {/* <SoftBox mb={2}>
                <SoftTypography variant="body2" color="text">
                  From colors, cards, typography to complex elements
                </SoftTypography>
              </SoftBox> */}
              {(!complete && !relativeCourse) && <SoftTypography
                component="a"
                href={`${location.pathname}/mycourses?1`}
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Start Learning
              </SoftTypography>}
              {relativeCourse && <SoftTypography
                component="a"
                href={`${location.pathname}/1`}
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Read more
              </SoftTypography>}
              {complete && <Box mt={2}><SoftButton color="dark">Download Certificate</SoftButton></Box>}
              {(!complete && !relativeCourse) &&
                <SoftBox width="100%" textAlign="left" mt={2} >
                  <SoftProgress value={25} color="error" variant="gradient" label={false} />
            </SoftBox>
              }
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
    </Card >
  );
}

export default CourseItem;
