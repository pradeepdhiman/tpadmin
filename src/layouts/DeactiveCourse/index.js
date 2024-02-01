
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
import { useCreateCourseMutation, useFilterCourseQuery } from "./functions/query";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";

function DeactiveCourses() {

  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()
  const { activeRow = {} } = useSelector(state => state.courses)


  const { data: courseList, isError: listErr, isLoading: courseLoading, refetch: refreshCourse } = useFilterCourseQuery(filters)
  const { data: courseStatusList, isLoading: loadingStatus } = useMasterListByTypeQuery({ TypeID: masterCode.Status })


  useEffect(() => {
    if (courseStatusList?.success ) {
      const foundStatus = courseStatusList.data.find(x => x.value === "Disabled").masterCodeID;
      setFilters(prev => ({
        ...prev,
        filter: {
          ...prev.filter,
          status: foundStatus
        }
      }));
    }
  }, [courseStatusList]);

 

  useEffect(() => {
    async function fatchListData() {
      try {
        await refreshCourse(filters)
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
    refreshCourse()
  }
  function addCourse() {
    setEdit(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {/* <Grid xs={12}>
            <SoftBox px={3}>
              <SoftButton variant="gradient" disabled={Object.keys(activeRow).length !== 0} size="small" color="dark" onClick={addCourse}>Add Course</SoftButton>
            </SoftBox>
          </Grid> */}
          {courseLoading && <SoftBarLoader />}
          {Object.keys(activeRow).length === 0 && courseList?.data?.length && (
            <Grid item xs={12}>
              <CoursesList list={courseList} loading={courseLoading} changeFilter={setFilters} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DeactiveCourses;
