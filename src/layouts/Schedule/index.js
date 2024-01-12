
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import EditSchedule from "./component/EditSchedule";
import ScheduleList from "./component/ScheduleList";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow, setScheduleCourse } from "./functions/scheduleSlice";
import { useCreateScheduleMutation, useListScheduleQuery, useSchCoursListQuery } from "./functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
const loadingState = { courseName: "Loading..." }


function Schedule() {
  const dispatch = useDispatch()
  const { activeRow} = useSelector(state => state.schedule)
  const [editId, setEditId] = useState("")
  const { data: scheduleList, isError: schError, isLoading: schLoading, refetch: refreshSchedule } = useListScheduleQuery()
  const { data: courselist, isError: courselistError, isLoading: courselistLoading, refetch: refreshcourselist } = useSchCoursListQuery()
  const [createSchedule, { data: createRes, isError: createErr, isLoading: createLoading }] = useCreateScheduleMutation()
  const [isEdit, setEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (!selectedCourse) {
      dispatch(setScheduleCourse(courselist?.data[0]))
      setSelectedCourse(courselist?.data[0])
    }
  }, [courselist])

  // function addNew() {
  //   setEdit(true)
  // }
  // function editMode() {
  //   setEdit(false)
  // }

  const handleCourseSelect = (event, newValue) => {
    refreshSchedule()
    setSelectedCourse(newValue);
    dispatch(setScheduleCourse(newValue))
  };


  function editMode() {
    setEdit(false)
    dispatch(setActiveRow({}))
    refreshSchedule()
  }
  function addSchedule() {
    setEdit(true)
  }
  function onEdit(id) {
    setEdit(true)
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
          <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "16px" }}>
              <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-demo"
                value={selectedCourse}
                onChange={handleCourseSelect}
                options={courselistLoading ? loadingState : courselist?.data || []}
                getOptionLabel={(option) => option.courseName}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
              <SoftButton variant="gradient" disabled={Object.keys(activeRow).length !== 0} size="small" color="dark" onClick={addSchedule}>Add Schedule</SoftButton>
            </SoftBox>
          </Grid>
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <EditSchedule toggleEdit={editMode} editid={editId} addSchedule={createSchedule} loading={createLoading} />
            </Grid>
          )}
          {schLoading && <SoftBarLoader />}
          {Object.keys(activeRow).length === 0 && scheduleList?.success && (
            <Grid item xs={12}>
              <ScheduleList list={scheduleList} loading={schLoading} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Schedule;
