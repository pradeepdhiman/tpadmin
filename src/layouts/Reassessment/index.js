
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import AssessmentDetails from "./component/AssessmentDetails";
import { useFilterReassessmentMutation } from "./function/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useDispatch, useSelector } from "react-redux";
import { initialFilters } from "./constant";
import ReAssessmentList from "./component/AssessmentList";
import { setActiveRow } from "./function/reassessmentSlice";


function Reassessment() {
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()
  const { activeRow } = useSelector(state => state.reassessment)

  const [filterData, { data: assessList, isLoading: assessLoading }] = useFilterReassessmentMutation()

  useEffect(() => {
    async function fetchData() {
      try {
        await filterData(filters);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [filters]);


  useEffect(() => {
    dispatch(setActiveRow({}))
  }, [])

  function editMode() {
    setEdit(false)
    dispatch(setActiveRow({}))
    async function fetchData() {
      try {
        await filterData(filters);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <AssessmentDetails toggleEdit={editMode} editid={editId} />
            </Grid>
          )}
          {Object.keys(activeRow).length === 0 && (
            <Grid item xs={12}>
              <ReAssessmentList list={assessList} loading={assessLoading} changeFilter={setFilters} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Reassessment;
