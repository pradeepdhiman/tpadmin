
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { useState } from "react";
import EditSchedule from "./component/EditSchedule";
import ScheduleList from "./component/ScheduleList";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow } from "./functions/scheduleSlice";
import { useCreateScheduleMutation, useListScheduleQuery } from "./functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
const loadingState = { courseName: "Loading..." }


function Schedule() {
  const dispatch = useDispatch()
  const { activeRow } = useSelector(state => state.schedule)
  const [editId, setEditId] = useState("")
  const { data: scheduleList, isError: schError, isLoading: schLoading, refetch: refreshSchedule } = useListScheduleQuery()
  const [createSchedule, { data: createRes, isError: createErr, isLoading: createLoading }] = useCreateScheduleMutation()
  const [isEdit, setEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("");

  // useEffect(() => {
  //   if (!selectedCourse) {
  //     dispatch(setScheduleCourse(courses?.data[0]))
  //     setSelectedCourse(courses?.data[0])
  //   }
  // }, [courses])

  // function addNew() {
  //   setEdit(true)
  // }
  // function editMode() {
  //   setEdit(false)
  // }

  // const handleCourseSelect = (event, newValue) => {
  //   setSelectedCourse(newValue);
  //   dispatch(setScheduleCourse(newValue))
  // };


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
      {/* <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "16px" }}>
              <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-demo"
                value={selectedCourse}
                onChange={handleCourseSelect}
                options={courseLoading ? loadingState : courses?.data || []}
                getOptionLabel={(option) => option.courseName}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
              <SoftButton size="small" color="dark" onClick={addNew}>Add New Schedule</SoftButton>
            </SoftBox>
          </Grid>
          {isEdit && <Grid item xs={12} >
            <EditSchedule toggleEdit={editMode} />
          </Grid>}
          <Grid item xs={12} >
            <ScheduleList  isEdit={isEdit} editFun={addNew} loading={courseLoading} />
          </Grid>
        </Grid>
      </SoftBox> */}
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton disabled={Object.keys(activeRow).length !== 0} size="small" color="dark" onClick={addSchedule}>Add Schedule</SoftButton>
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
