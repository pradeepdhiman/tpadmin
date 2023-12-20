
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import { Autocomplete, Card, TextField } from "@mui/material";
import { useState } from "react";
import AssessmentCourseDetail from "./component/AssessmentCourseDetail";
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];
function Assessment() {
  const { size } = typography;
  const [selectedCourse, setSelectedCourse] = useState(top100Films[0]);

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
        <AssessmentCourseDetail />
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assessment;
