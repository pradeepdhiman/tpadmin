
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
import { useFilterApplicantMutation, useCreateApplicantMutation, useDeleteApplicantMutation } from "./functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow } from "./functions/applicantSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { initialFilters } from "./constant";


function Applicants() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const verify = queryParams.get('verify');

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()
  const { activeRow = {} } = useSelector(state => state.applicant)

 
  const [filteredList, { data: filterList, error: filtererror, isLoading: filterloading }] = useFilterApplicantMutation()
  const [createApplicant, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateApplicantMutation()
  const [deleteApplicant, { data: delData, error: delErr, isLoading: delLoading }] = useDeleteApplicantMutation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await filteredList(filters);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filters]);

  useEffect(() => {
    if (id && verify && filterList && filterList.data) {
      const foundUser = filterList.data.find((x) => x.applicantID === +id);
      if (foundUser !== undefined) {
        dispatch(setActiveRow(foundUser));
      }
    }
  }, [filterList, dispatch]);


  useEffect(() => {
    if (id) return
    dispatch(setActiveRow({}))
  }, [])


  async function editMode() {
    if(id){
      navigate(window.location.pathname, { replace: true });
    }
    setEdit(false)
    dispatch(setActiveRow({}))
    await filteredList(filters)
  }
  function addApplicant() {
    setEdit(true)
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {/* <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton variant="gradient" disabled={Object.keys(activeRow).length !== 0} size="small" color="dark" onClick={addApplicant}>Add Applicant</SoftButton>
            </SoftBox>
          </Grid> */}
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <EditApplicant toggleEdit={editMode} editid={editId} addApplicant={createApplicant} loading={createLoading} />
            </Grid>
          )}
          {filterloading && <SoftBarLoader />}
          {Object.keys(activeRow).length === 0 && filterList?.data && (
            <Grid item xs={12}>
              <ApplicantList list={filterList} loading={filterloading} changeFilter={setFilters} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Applicants;
