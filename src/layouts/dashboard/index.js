
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
import { useDbApplicantQuery, useDbCoursesQuery, useDbcourselistApplicantQuery } from "./functions/query";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDbschedulelistQuery } from "common/query";

const initialFilter = {
  draw: 5,
  start: 0,
  length: 10,
  columns: [
    {
      data: "",
      name: "",
      searchable: true,
      orderable: true,
      search: {
        value: "",
        regex: ""
      }
    }
  ],
  search: {
    value: "",
    regex: ""
  },
  order: {
    orderBy: "",
    orderDirection: ""
  },
  filter: {
    courseID: 0,
    courseName: "",
    description: "",
    duration: 0,
    categoryID: 0,
    categoryName: "",
    syllabus: "",
    trainingfee: 0,
    vat: 0,
    totalAmount: 0,
    receiptID: 0,
    receiptDate: "",
    amountReceived: 0,
    status: 0,
    createdById: 0,
    updatedById: 0,
    updatedDate: "",
    isDeleted: true,
    remarks: ""
  }
}

function Dashboard() {
  const [filters, setFilters] = useState(initialFilter)
  const navigate = useNavigate();
  const { size } = typography;
  const {
    data: applicantList,
    isLoading: isApplicantListLoading,
    error: applicantListError,
  } = useDbApplicantQuery();

  const {
    data: coursesList,
    isLoading: isCoursesListLoading,
    error: coursesListError,
  } = useDbCoursesQuery();

  const { data: applicantCourseList, isLoading: listLoading, isError: listError, refetch: refreshList } = useDbcourselistApplicantQuery();
  const { data: schedulelist, isLoading: schloading, isError: scherr, refetch: refreshschedule } = useDbschedulelistQuery();
  let pendingPaymentCourse = applicantCourseList?.data?.filter(item => item.paymentStatusName === "Pending")
  // const [createCourse, {
  //   data: latestCoursesList,
  //   isLoading: isLatestCoursesLoading,
  //   error: lstestCoursesError,
  // }] = usePostCoursesMutation();

  // useEffect(() => {
  //   const today = moment().format('DD/MM/YYYY');
  //   createCourse(filters)
  // }, [])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Active Courses" }}
                count={isCoursesListLoading ? "Loading..." : coursesList?.data?.length || "0"}
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <MenuBookIcon /> }}
                redirectTo={() => navigate("/courses?type=active")}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Active Learners" }}
                count={isApplicantListLoading ? "Loading..." : applicantList?.data?.length || "0"}
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <PersonIcon /> }}
                redirectTo={() => navigate("/applicants?type=active")}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Activation Requests" }}
                count={listLoading ? "Loading..." : pendingPaymentCourse?.length}
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <PeopleAltIcon /> }}
                redirectTo={() => navigate("/orders?type=active")}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Active Schedules" }}
                count={schloading ? "Loading...": schedulelist?.data?.length}
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: <TrendingUpIcon />,
                }}
                redirectTo={() => navigate("/schedule?type=active")}
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
            <NewOrders list={pendingPaymentCourse} loading={listLoading} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
