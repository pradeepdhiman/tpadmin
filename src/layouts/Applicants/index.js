
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
import { useCreateMutation, useFilterMutation } from "./functions/query";



const initialFilters = {
  draw: 10,
  start: 0,
  length: 10,
  columns: [
    {
      data: "firstName",
      name: "firstName",
      searchable: true,
      orderable: true,
      search: {
        value: "firstName",
        regex: "test",
      },
    },
  ],
  search: {
    value: "firstName",
    regex: "test",
  },
  order: {
    orderBy: "firstName",
    orderDirection: "desc",
  },
  filter: null,
};




function Applicants() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [filters, setFilters] = useState(initialFilters)

  const [filteredList, { data: filterList, error: filtererror, isLoading: filterloading }] = useFilterMutation()
  const [createApplicant, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateMutation()

  useEffect(async () => {
    const res = await filteredList(filters)
  }, [])

  console.log(createError)

  function editMode() {
    setEdit(false)
  }
  function addApplicant() {
    setEdit(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {filtererror && <SoftSnakBar message="An error accure" severity="error" />}
      {createError && <SoftSnakBar message={createError.data.title || "An error accure"} severity="error" />}
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
