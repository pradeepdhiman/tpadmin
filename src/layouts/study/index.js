
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
import { Autocomplete, Card, CardContent, Switch, TextField } from "@mui/material";
import { useState } from "react";
import CompleteCourse from "./component/CompleteCourse";
import Projects from "layouts/courses/components/Projects";
import { CardCover } from "@mui/joy";
import VideoList from "examples/Lists/VideoLIst";
import profilesListData from "./data/profilesListData";
import StudyMaterialList from "examples/Lists/StudyMaterialList";
import ScheduleList from "examples/Lists/ScheduleList";
import studymaterialdata from "./data/studymaterialdata";
import schedulelistdata from "./data/schedulelistdata";
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];
function Study() {
  const { size } = typography;
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isLive, setIsLive] = useState(false);

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };

  const videoVSlive = () => setIsLive(!isLive);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox display="flex" alignItems="center" justifyContent="space-between">
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
        <SoftBox display="flex" alignItems="center">
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={videoVSlive}
            color={isLive ? "error" : "success"}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {isLive ? "Live" : "Video"}&nbsp;&nbsp;
          </SoftTypography>
          <Switch checked={isLive} onChange={videoVSlive} />
        </SoftBox>
      </SoftBox>
      <SoftBox pb={3} mt={3}>
        <Grid container gap={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ minWidth: 300, minHeight: 450, width: "100%", flexGrow: 1 }}>
              <CardCover>
                <video
                  autoPlay
                  loop
                  muted
                  poster="https://assets.codepen.io/6093409/river.jpg"
                >
                  <source
                    src="https://assets.codepen.io/6093409/river.mp4"
                    type="video/mp4"
                  />
                </video>
              </CardCover>
              <CardContent>
                <SoftTypography
                  level="body-lg"
                  fontWeight="lg"
                  textColor="#fff"
                  mt={{ xs: 12, sm: 18 }}
                >
                  Video
                </SoftTypography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md>
            <VideoList title="Video List" videolist={profilesListData} />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox pb={3} mt={3}>
        <Grid container gap={2}>
          <Grid item xs={12} md><StudyMaterialList title="Study Material" datalist={studymaterialdata} /></Grid>
          <Grid item xs={12} md={8}><ScheduleList title="Study Material" datalist={schedulelistdata} /></Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Study;
