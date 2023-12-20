
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import CourseItem from "./component/Courseitem";

function Dashboard() {
  const { size } = typography;
  


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <SoftTypography variant="h4" gutterBottom px={2}>
          My Courses
        </SoftTypography>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={3}>
            <CourseItem />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseItem />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseItem />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseItem />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
        <SoftTypography variant="h4" gutterBottom px={2}>
          Completed Courses
        </SoftTypography>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={3}>
            <CourseItem complete={true} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseItem complete={true} />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
        <SoftTypography variant="h4" gutterBottom px={2}>
          Relative Courses
        </SoftTypography>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={3}>
            <CourseItem relativeCourse={true} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseItem relativeCourse={true} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseItem relativeCourse={true} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
