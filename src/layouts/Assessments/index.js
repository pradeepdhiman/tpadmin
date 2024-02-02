
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import { useEffect, useState } from "react";
import AssessmentList from "./component/AssessmentList";
import AssessmentDetails from "./component/AssessmentDetails";
import { useAssessListQuery } from "./function/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useDispatch, useSelector } from "react-redux";
import { initialFilters } from "./constant";
import { setActiveRow } from "./function/assessmentSlice";


function Assessments() {
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()
  const { activeRow = {} } = useSelector(state => state.assessment)

  const { data: assessList, isLoading: assessLoading, refatch: refreshlist } = useAssessListQuery()

  useEffect(() => {
    async function fatchListData() {
      try {
        await refreshlist(filters)
      } catch (err) { console.log(err) }
    }
    fatchListData()
  }, [filters])

  useEffect(() => {
    dispatch(setActiveRow({}))
  }, [])

  function editMode() {
    setEdit(false)
    dispatch(setActiveRow({}))
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <AssessmentDetails toggleEdit={editMode} editid={editId}  />
            </Grid>
          )}
          {/* {assessLoading && <SoftBarLoader />} */}
          {Object.keys(activeRow).length === 0 && (
            <Grid item xs={12}>
              <AssessmentList list={assessList?.data} loading={assessLoading} changeFilter={setFilters} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assessments;
