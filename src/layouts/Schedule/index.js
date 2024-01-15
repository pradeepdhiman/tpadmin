
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
import { useCreateScheduleMutation, useListScheduleQuery, useListSchedulebyCourseIDMutation, useSchCoursListQuery } from "./functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
const loadingState = { courseName: "Loading..." }


function Schedule() {
  const dispatch = useDispatch()
  const { activeRow, course } = useSelector(state => state.schedule)
  const [editId, setEditId] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: scheduleList, isError: schError, isLoading: schLoading, refetch: refreshSchedule } = useListScheduleQuery()
  const { data: courselist, isError: courselistError, isLoading: courselistLoading, refetch: refreshcourselist } = useSchCoursListQuery()
  const [createSchedule, { data: createRes, isError: createErr, isLoading: createLoading }] = useCreateScheduleMutation()
  const [isEdit, setEdit] = useState(false)
  const [getSchByCourseId, { data: schDataList, isLoading: schListLoading }] = useListSchedulebyCourseIDMutation()

  useEffect(() => {
    if (!selectedCourse) {
      dispatch(setScheduleCourse(courselist?.data[0]))
      setSelectedCourse(courselist?.data[0])
    }
  }, [courselist])



  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSchByCourseId({ courseID: course?.courseID });
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    if (course) {
      fetchData();
    }
  }, [course]);


  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
    dispatch(setScheduleCourse(newValue))
  };


  function editMode() {
    setEdit(false)
    dispatch(setActiveRow({}))
    getSchByCourseId({ courseID: course?.courseID })
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
                disabled={Object.keys(activeRow).length !== 0}
              />
              <SoftButton variant="gradient" disabled={Object.keys(activeRow).length !== 0} size="small" color="dark" onClick={addSchedule}>Add Schedule</SoftButton>
            </SoftBox>
          </Grid>
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <EditSchedule toggleEdit={editMode} editid={editId} addSchedule={createSchedule} loading={createLoading} />
            </Grid>
          )}
          {schListLoading && <SoftBarLoader />}
          {Object.keys(activeRow).length === 0 && schDataList?.success && (
            <Grid item xs={12}>
              <ScheduleList list={schDataList} loading={schListLoading} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Schedule;
