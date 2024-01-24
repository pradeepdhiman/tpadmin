

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
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useListQuestionMutation } from "layouts/CourseQuestions/functions/query";
import { useDispatch, useSelector } from "react-redux";
import { questiontableheads } from "layouts/CourseQuestions/constant";
import { generateRows } from "utils/utils";
import { setQuestionEdit } from "layouts/CourseQuestions/functions/questionSlice";
import { useDeleteQuestionMutation } from "layouts/CourseQuestions/functions/query";
import { setQuestionList } from "layouts/CourseQuestions/functions/questionSlice";
import { setActiveRow } from "layouts/CourseQuestions/functions/questionSlice";

// Data

function QuestionList(props) {
  // const { columns, rows } = data();
  // const [menu, setMenu] = useState(null);
  // const { course, editid } = useSelector(state => state.question)
  // const dispatch = useDispatch()

  // const [fetchList, { data: listData, isError: fetchErr, isLoading: fetchloading }] = useListQuestionMutation();
  // const [deleteQuestion, { data: delData, isError, isLoading: delLoading }] = useDeleteQuestionMutation();

  // const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  // const closeMenu = () => setMenu(null);

  // const rows = generateRows(listData, questiontableheads, onEdit, onDelete)

  // function onEdit(item) {
  //   dispatch(setQuestionEdit(item))
  //   editFun()
  // }

  // async function onDelete(id) {
  //   try {
  //     const deleteRes = await deleteQuestion(id);
  //     if (deleteRes?.data?.success) {
  //       const fetchRes = await fetchList();
  //       dispatch(setQuestionList(fetchRes?.data));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetchList();
  //       if (res?.data?.success) {
  //         dispatch(setQuestionList(res?.data))
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   if (course?.courseID && !isEdit) {
  //     fetchData();
  //   }
  // }, [course, isEdit]);



  const dispatch = useDispatch()
  const { list = [], loading = false, } = props
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const rows = generateRows(list, questiontableheads).reverse();

  function columnClickhandler(item) {
    console.log(item)
  }

  function rowClickhandler(item) {
    const activeRow = list.data[item]
    dispatch(setActiveRow(activeRow))
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
      <MenuItem onClick={closeMenu}>Latest</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Assessment Questions List
          </SoftTypography>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            <MoreVertIcon />
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox>
      <SoftBox px={2}
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <Table columns={questiontableheads} rows={rows} columnFunc={columnClickhandler} rowFunc={rowClickhandler} />
      </SoftBox>
      {/* <SoftBox mt={2} mb={2}>
        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Pagination count={5} variant="outlined" shape="rounded" />
        </Stack>
      </SoftBox> */}
    </Card>
  );
}

export default QuestionList;
