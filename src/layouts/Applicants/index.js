
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
import { useGetApplicantsMutation, useGetApplicantsQuery } from "./functions/query";
import SoftSnakBar from "components/SoftSnakbar";

const initialFilters = {
  draw: 5,
  start: 0,
  length: 10,
  columns: [
    {
      data: "",
      name: "",
      searchable: true,
      orderable: true,
      search: {
        value: "",
        regex: ""
      }
    }
  ],
  search: {
    value: "",
    regex: ""
  },
  order: {
    orderBy: "",
    orderDirection: ""
  },
  filter: {
    applicantID: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    designation: "",
    dob: "",
    nationality: "",
    companyName: "",
    companyContactNumber: "",
    companyAddress: "",
    status: 0,
    createdById: 0,
    updatedById: 0,
    updatedDate: "",
    isDeleted: true,
    remarks: ""
  }
}

function Applicants() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [filters, setFilters] = useState(initialFilters)

  const [getFilterApplicants, {
    data: filteredList,
    isLoading: applicantsLoading,
    error: applicantError,
  }] = useGetApplicantsMutation();


  useEffect(() => {
    getFilterApplicants(filters)
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
      {applicantError && <SoftSnakBar message="thie is a error" severity="error"/>}
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
            <EditApplicant toggleEdit={editMode} />
          </Grid>}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Applicants;
