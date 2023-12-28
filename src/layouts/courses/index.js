
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import SoftButton from "components/SoftButton";
import { useState } from "react";
import CoursesList from "./component/CoursesList";
import EditCourse from "./component/EditCourse";
import { useCreateCourseMutation } from "./functions/query";
import SoftSnakBar from "components/SoftSnakbar";

function Courses() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)

  const [addCourse, { data: course, error: courseErr, isLoading: addLoading }] = useCreateCourseMutation()

  function editMode() {
    setEdit(false)
  }
  function addCoursehandler() {
    setEdit(true)
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {course?.success === true ? <SoftSnakBar message="Success!" severity="success" /> : <SoftSnakBar message={course?.errors[0]} severity="error" />}
      {courseErr && <SoftSnakBar message="An error accure" severity="error" />}
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton size="small" color="dark" onClick={addCoursehandler}>Add New Course</SoftButton>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg>
            <CoursesList />
          </Grid>
          {isEdit && <Grid item xs={12} md={6} lg={4}>
            <EditCourse toggleEdit={editMode} submitAdd={addCourse} loading={addLoading} />
          </Grid>}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Courses;
