
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
import EditSchedule from "./component/EditSchedule";
import ScheduleList from "./component/ScheduleList";
import { Autocomplete, TextField } from "@mui/material";
import { useListCourseQuery } from "layouts/Courses/functions/query";
import { useDispatch } from "react-redux";
import { setScheduleCourse } from "./functions/scheduleSlice";
const loadingState = { courseName: "Loading..." }


function Schedule() {
  const dispatch = useDispatch()
  const { size } = typography;
  const { data: courses, error: courseErr, isLoading: courseLoading, refetch: refreshCourse } = useListCourseQuery()
  const [isEdit, setEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (!selectedCourse) {
      dispatch(setScheduleCourse(courses?.data[0]))
      setSelectedCourse(courses?.data[0])
    }
  }, [courses])

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };

  function editMode() {
    setEdit(false)
  }
  function addApplicant() {
    setEdit(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "16px" }}>
              <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-demo"
                value={selectedCourse}
                onChange={handleCourseSelect}
                options={courseLoading ? loadingState : courses?.data || []}
                getOptionLabel={(option) => option.courseName}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
              <SoftButton size="small" color="dark" onClick={addApplicant}>Add New Schedule</SoftButton>
            </SoftBox>
          </Grid>
          {isEdit && <Grid item xs={12} >
            <EditSchedule toggleEdit={editMode} />
          </Grid>}
          <Grid item xs={12} >
            <ScheduleList isEdit={isEdit} showForm={addApplicant} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Schedule;
