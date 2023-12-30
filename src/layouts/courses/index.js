
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
import { useEffect, useState } from "react";
import CoursesList from "./component/CoursesList";
import EditCourse from "./component/EditCourse";
import { useCreateCourseMutation, useListCourseQuery } from "./functions/query";
import SoftSnakBar from "components/SoftSnakbar";
import { useDispatch, useSelector } from "react-redux";
import { setCourseList, setCourseloading } from "./functions/coursesSlice";

function Courses() {

  const dispatch = useDispatch()
  const { courseList = {}, loading = false } = useSelector(state => state.courses)
  const [isEdit, setEdit] = useState(false)

  const { data: courses, error: listErr, isLoading: listLoading } = useListCourseQuery()

  const [addCourse, { data: course, error: courseErr, isLoading: addLoading }] = useCreateCourseMutation()

  useEffect(() => {
    dispatch(setCourseList(courses))
    dispatch(setCourseloading(listLoading))
  }, [listLoading])

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
