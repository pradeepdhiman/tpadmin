
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import CoursesList from "./component/CoursesList";
import EditCourse from "./component/EditCourse";
import { useSelector } from "react-redux";
import CategoryTable from "./component/CategoryTable";

function Courses() {

  const [isEdit, setEdit] = useState(false)
  const [manageCat, setManageCat] = useState(false)
  const { editid = "" } = useSelector(state => state.courses)

  function editMode() {
    setEdit(false)
  }
  function addCoursehandler() {
    setEdit(true)
    if (manageCat) {
      setManageCat(false)
    }
  }

  useEffect(() => {
    if (editid) {
      setEdit(true)
    }
  }, [editid])

  function showCategory() {
    setManageCat(!manageCat)
    if (isEdit) {
      setEdit(false)
    }
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SoftBox px={3} sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "16px" }}>
              <SoftButton size="small" color="dark" onClick={addCoursehandler}>Add New Course</SoftButton>
              <SoftButton variant="outlined" size="small" color="info" onClick={showCategory}>Manage Category</SoftButton>
            </SoftBox>
          </Grid>
          {manageCat && <Grid item xs={12} >
            <CategoryTable toggleCat={showCategory} />
          </Grid>}
          {isEdit && <Grid item xs={12} >
            <EditCourse toggleEdit={editMode} />
          </Grid>}
          <Grid item xs={12} >
            {/* <CoursesList isEdit={isEdit} /> */}
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Courses;
