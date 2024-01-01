
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
import { useFilterApplicantMutation, useCreateApplicantMutation, useListApplicantQuery, useDeleteApplicantMutation } from "./functions/query";
import { initialFilters } from "./constant";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useDispatch, useSelector } from "react-redux";
import { setApplicantedit, setApplicantlist, setApplicantloading } from "./functions/applicantSlice";

function Applicants() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()

  const { data: applicantList, isLoading: listLoading, isError: listError, refetch: refreshList } = useListApplicantQuery();
  const [filteredList, { data: filterList, error: filtererror, isLoading: filterloading }] = useFilterApplicantMutation()
  const [createApplicant, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateApplicantMutation()
  const [deleteApplicant, { data: delData, error: delErr, isLoading: delLoading }] = useDeleteApplicantMutation()

useEffect(()=>{
  dispatch(setApplicantlist(applicantList?.data))
  dispatch(setApplicantloading(listLoading))
},[listLoading, applicantList, refreshList])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await filteredList(filters);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  function editMode() {
    setEdit(false)
    refreshList()
  }
  function addApplicant() {
    setEdit(true)
  }
  function onEdit(id) {
    dispatch(setApplicantedit(id))
    // setEditId(id)
    setEdit(true)
  }
  async function onDelete(id) {
    try {
      const res = await deleteApplicant(id)
      if (res.data.success) {
        refreshList()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton size="small" color="dark" onClick={addApplicant}>Add Applicant</SoftButton>
            </SoftBox>
          </Grid>
          {isEdit && <Grid item xs={12} >
            <EditApplicant toggleEdit={editMode} editid={editId} addApplicant={createApplicant} loading={createLoading} />
          </Grid>}
          {listLoading && <SoftBarLoader />}
          {!listLoading && (<Grid item xs={12} >
            {applicantList?.success && <ApplicantList list={applicantList} loading={listLoading} onEdit={onEdit} onDelete={onDelete} />}
          </Grid>)}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Applicants;
