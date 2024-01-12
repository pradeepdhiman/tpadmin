


// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import EditQuestion from "./component/EditQuestions";
import QuestionList from "./component/QuestionsList";
import { useListCourseQuery } from "layouts/Courses/functions/query";
import { setQuestionCourse, setActiveRow } from "./functions/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateQuestionMutation, useListQuestionQuery } from "./functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";

const loadingState = { courseName: "Loading..." }

function CourseQuestions() {
  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("");
  const dispatch = useDispatch()
  const { activeRow } = useSelector(state => state.question)

  const { data: courses, error: courseErr, isLoading: courseLoading, refetch: refreshCourse } = useListCourseQuery()
  const { data: courseslist, error: courseListErr, isLoading: courseListLoading, refetch: refreshQuestion } = useListQuestionQuery()
  const [createSchedule, { data: createResp, isError: createErr, isLoading: createLoading }] = useCreateQuestionMutation()

  useEffect(() => {
    if (!selectedCourse) {
      dispatch(setQuestionCourse(courses?.data[0]))
      setSelectedCourse(courses?.data[0])
    }
  }, [courses])

  

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
    dispatch(setQuestionCourse(newValue))
  };

  function editMode() {
    setEdit(false)
    dispatch(setActiveRow({}))
    refreshQuestion()
  }
  function addschedule() {
    setEdit(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
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
              <SoftButton variant="gradient" size="small" color="dark" onClick={addschedule}>New Question</SoftButton>
            </SoftBox>
          </Grid>
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <EditQuestion toggleEdit={editMode} editid={editId} addCourse={createSchedule} loading={createLoading} />
            </Grid>
          )}
          {courseListLoading && <SoftBarLoader />}
          {Object.keys(activeRow).length === 0 && courseslist?.success && (
            <Grid item xs={12}>
              <QuestionList list={courseslist} loading={courseListLoading} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CourseQuestions;
