
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

function Courses() {
  const { size } = typography;
  const [isEdit, setEdit] = useState(false)

  function editMode(){
    setEdit(false)
  }
  function addApplicant(){
    setEdit(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton size="small" color="dark" onClick={addApplicant}>Add New Course</SoftButton>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg>
            <CoursesList />
          </Grid>
          {isEdit && <Grid item xs={12} md={6} lg={4}>
            <EditCourse toggleEdit={editMode} />
          </Grid>}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Courses;
