
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import { useState } from "react";
import AssessmentList from "./component/AssessmentList";
import AssessmentDetails from "./component/AssessmentDetails";

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

function Assessments() {
  const { size } = typography;
  const [isEdit, setEdit] = useState(true)
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
          <Grid item xs={12} md={6} lg>
            <AssessmentList />
          </Grid>
          {isEdit && <Grid item xs={12} md={6} lg={4}>
            <AssessmentDetails toggleEdit={editMode} />
          </Grid>}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assessments;
