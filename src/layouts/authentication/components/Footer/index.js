
// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <SoftBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="/aboutus" variant="body2" color="secondary">
                About Us
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 0, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="/courses" variant="body2" color="secondary">
                Courses
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="/faq" variant="body2" color="secondary">
                Faq
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="/contectus" variant="body2" color="secondary">
                Contact us
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography component="a" href="/privacypolicy" variant="body2" color="secondary">
                Privacy Policy
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={8}>
          <SoftBox display="flex" justifyContent="center" mt={1} mb={3}>
            <SoftBox mr={3} color="secondary">
              <FacebookIcon fontSize="small" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <TwitterIcon fontSize="small" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <InstagramIcon fontSize="small" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <PinterestIcon fontSize="small" />
            </SoftBox>
            <SoftBox color="secondary">
              <LinkedInIcon fontSize="small" />
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="secondary">
            Copyright &copy; 2023 Soft by Bilberry.
          </SoftTypography>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
