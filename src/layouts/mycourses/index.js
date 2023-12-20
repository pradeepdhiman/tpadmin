
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import typography from "assets/theme/base/typography";
import { Autocomplete, Card, TextField } from "@mui/material";
import { useState } from "react";
import CompleteCourse from "./component/CompleteCourse";
import Projects from "layouts/courses/components/Projects";
import Details from "layouts/courses/components/BuildByDevelopers/details";
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];
function MyCourses() {
  const { size } = typography;
  const [selectedCourse, setSelectedCourse] = useState({});
  
  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox >
      <Autocomplete
          disablePortal
          disableClearable
          id="combo-box-demo"
          value={selectedCourse}
          onChange={handleCourseSelect}
          options={top100Films}
          getOptionLabel={(option) => option.label}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </SoftBox>
      <SoftBox pb={3}>
        <Details />
      </SoftBox>
      <SoftBox >
        <Card>
          <SoftBox mb={3} >
            <SoftBox px={3} py={3}>
              <SoftTypography variant="h4" gutterBottom>
                Traning Schedule
              </SoftTypography>
            </SoftBox>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Monday" }}
                  count="11:30AM"
                  percentage={{ color: "success", text: "+55%" }}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Monday" }}
                  count="11:30AM"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Monday" }}
                  count="11:30AM"
                  percentage={{ color: "error", text: "-2%" }}
                  icon={{ color: "info", component: "emoji_events" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Monday" }}
                  count="11:30AM"
                  percentage={{ color: "success", text: "+5%" }}
                  icon={{
                    color: "info",
                    component: "shopping_cart",
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <Grid container >
      <Grid item xs={8}>
          <Projects />
        </Grid>
        <Grid item xs={4}>
          <CompleteCourse/>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default MyCourses;
