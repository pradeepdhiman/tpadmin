

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";
import data from "./data";
import DoneIcon from '@mui/icons-material/Done';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Pagination, Stack } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { arrayOfObjects } from "layouts/Courses/constant";
import { coursestableheads } from "layouts/Courses/constant";
import { generateRows } from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useListCourseQuery } from "layouts/Courses/functions/query";
import { useCreateCourseMutation } from "layouts/Courses/functions/query";
import { setCourseList } from "layouts/Courses/functions/coursesSlice";
import { setCourseloading } from "layouts/Courses/functions/coursesSlice";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { setCourseEdit } from "layouts/Courses/functions/coursesSlice";
import { useDeleteCourseMutation } from "layouts/Courses/functions/query";

// Data

function CoursesList({isEdit}) {
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch()
  const { courseList = {}, loading = false, editid = "" } = useSelector(state => state.courses)

  const { data: courses, error: listErr, isLoading: listLoading, refetch: refreshList } = useListCourseQuery()

  const [addCourse, { data: course, error: courseErr, isLoading: addLoading }] = useCreateCourseMutation()
  const [delCourse, { isLoading: delLoading }] = useDeleteCourseMutation()

  useEffect(() => {
    dispatch(setCourseList(courses))
    dispatch(setCourseloading(listLoading))
  }, [listLoading])

  // useEffect(() => {
  //   refreshList()
  // }, [editid, isEdit])

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  // const rowList = arrayOfObjects
  const rows = generateRows(courses || [], coursestableheads, onEdit, onDelete)

  function onEdit(id) {
    dispatch(setCourseEdit(id))

  }
  async function onDelete(id) {
    try {
      const res = await delCourse(id)
      if (res?.data?.success) {
        refreshList()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>All</MenuItem>
      <MenuItem onClick={closeMenu}>Latest Course</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Courses List
          </SoftTypography>
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              <DoneIcon />
            </Icon>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 new</strong> this month
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            <MoreVertIcon />
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox>
      {listLoading && <SoftBarLoader />}
      {!listLoading && <>
        <SoftBox
        px={2}
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <Table columns={coursestableheads} rows={rows} />
        </SoftBox>
        <SoftBox mt={2} mb={2}>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Pagination count={5} variant="outlined" shape="rounded" />
          </Stack>
        </SoftBox>
      </>}
    </Card>
  );
}

export default CoursesList;
