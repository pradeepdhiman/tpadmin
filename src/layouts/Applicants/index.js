
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import ApplicantList from "./component/ApplicantList";
import SoftButton from "components/SoftButton";
import EditApplicant from "./component/EditApplicant";
import { useEffect, useState } from "react";
import SoftSnakBar from "components/SoftSnakbar";
import { crudApi } from "utils/utils";
import { useListApplicant, useFilterMutation, useCreateMutation } from "./functions/query";
import { initialFilters } from "./constant";

function Applicants() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [filters, setFilters] = useState(initialFilters)

  const {data} = useListApplicant()
  const [filteredList, { data: filterList, error: filtererror, isLoading: filterloading }] = useFilterMutation()
  const [createApplicant, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateMutation()



  useEffect(async () => {
    const res = await filteredList(filters)
  }, [])

  function editMode() {
    setEdit(false)
  }
  function addApplicant() {
    setEdit(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {newApplicant?.success === true ? <SoftSnakBar message="Success!" severity="success" /> : <SoftSnakBar message={newApplicant?.errors[0]} severity="error" />}
      {filtererror && <SoftSnakBar message="An error accure" severity="error" />}
      {createError && <SoftSnakBar message="An error accure" severity="error" />}
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton size="small" color="dark" onClick={addApplicant}>Add Applicant</SoftButton>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg>
            <ApplicantList />
          </Grid>
          {isEdit && <Grid item xs={12} md={6} lg={4}>
            <EditApplicant toggleEdit={editMode} addApplicant={createApplicant} loading={createLoading} />
          </Grid>}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Applicants;
