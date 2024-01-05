
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
import { initialFilters } from "./constant";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow } from "./functions/coursesSlice";
import CoursesList from "./component/CoursesList";
import EditCourse from "./component/EditCourse";
import { useCreateCourseMutation, useDeleteCourseMutation, useFilterCourseMutation, useListCourseQuery, useUpdateCourseMutation } from "./functions/query";

function Courses() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()
  const { activeRow = {} } = useSelector(state => state.courses)


  const { data: courseList, isError: listErr, isLoading: courseLoading, refetch: refreshCourse } = useListCourseQuery()
  // const [filterCourse, { data: filterResp, isError: filterErr, isLoading: filterLoading }] = useFilterCourseMutation()
  const [createCourse, { data: createResp, isError: createErr, isLoading: createLoading }] = useCreateCourseMutation()
  const [updateCourse, { data: updateResp, isError: updateErr, isLoading: updateLoading }] = useUpdateCourseMutation()
  const [delCourse, { data: delResp, isError: delErr, isLoading: delLoading }] = useDeleteCourseMutation()


  useEffect(() => {
    const fetchData = async () => {
      try {
        await filterCourse(filters);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  function editMode() {
    setEdit(false)
    dispatch(setActiveRow({}))
    refreshCourse()
  }
  function addCourse() {
    setEdit(true)
  }
  function onEdit(id) {
    setEdit(true)
  }
  async function onDelete(id) {
    try {
      const res = await delCourse(id)
      if (res.data.success) {
        refreshCourse()
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
              <SoftButton disabled={Object.keys(activeRow).length !== 0} size="small" color="dark" onClick={addCourse}>Add Course</SoftButton>
            </SoftBox>
          </Grid>
          {(Object.keys(activeRow).length !== 0 || isEdit) && (
            <Grid item xs={12}>
              <EditCourse toggleEdit={editMode} editid={editId} addCourse={createCourse} loading={createLoading} />
            </Grid>
          )}
          {courseLoading && <SoftBarLoader />}
          {Object.keys(activeRow).length === 0 && courseList?.success && (
            <Grid item xs={12}>
              <CoursesList list={courseList} loading={courseLoading} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Courses;
