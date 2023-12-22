
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ApplicantsContainer from "./component/ApplicantsContainer";
import CoursesContainer from "./component/CoursesContainer";
import NewOrders from "./component/NewOrders";
import LatestCourse from "./component/LatestCourses";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useFilteredCoursesQuery, useGetApplicantListQuery, useGetCoursesListQuery, usePostCoursesMutation } from "./functions/query";
import { useEffect } from "react";
import moment from "moment";

function Dashboard() {
  const { size } = typography;
  const {
    data: applicantList,
    isLoading: isApplicantListLoading,
    error: applicantListError,
  } = useGetApplicantListQuery();

  const {
    data: coursesList,
    isLoading: isCoursesListLoading,
    error: coursesListError,
  } = useGetCoursesListQuery();

  const [createCourse, {
    data: latestCoursesList,
    isLoading: isLatestCoursesLoading,
    error: lstestCoursesError,
  }] = usePostCoursesMutation();

  useEffect(() => {
    const today = moment().format('DD/MM/YYYY');
    const filterObject = {
      "draw":0,
      "start": 0,
      "length": 10,
      "columns": null,
      "search": null,
      "order": {
        "orderBy": "applicantID",
        "orderDirection": "desc"
      },
      "filter": null
    }
    createCourse(filterObject)
  }, [])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Courses" }}
                count={isCoursesListLoading ? "Loading..." : coursesList?.data?.length || "0"}
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <MenuBookIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Applicants" }}
                count={isApplicantListLoading ? "Loading..." : applicantList?.data?.length || "0"}
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <PersonIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "New Request" }}
                count="45"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <PeopleAltIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Today sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: <TrendingUpIcon />,
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <ApplicantsContainer />
            </Grid>
            <Grid item xs={12} lg={5}>
              <CoursesContainer />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <LatestCourse />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <NewOrders />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
