
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
import EditSchedule from "./component/EditSchedule";
import ScheduleList from "./component/ScheduleList";
import { Autocomplete, TextField } from "@mui/material";

const top100Films = [
  { label: 'Java', year: 1994 },
  { label: 'Javascript', year: 1972 },
  { label: 'Node js', year: 1974 },
  { label: 'Core php', year: 2008 },
  { label: 'Web Designing', year: 1957 },
  { label: "AI", year: 1993 },
  { label: 'Ember js', year: 1994 }
];

function Schedule() {
  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(top100Films[0]);

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
            <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap:"16px" }}>
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
              <SoftButton size="small" color="dark" onClick={addApplicant}>Add New Schedule</SoftButton>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg>
            <ScheduleList />
          </Grid>
          {isEdit && <Grid item xs={12} md={6} lg={4}>
            <EditSchedule toggleEdit={editMode} />
          </Grid>}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Schedule;
