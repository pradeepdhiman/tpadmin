

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
import { FormControl, Pagination, Select, Stack } from "@mui/material";
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
import SoftFilter from "examples/SoftFilter";

// Data

const filterdata = {
  questionTitle: { type: "text", label: "Question", value: "", search: true },
  courseName: { type: "text", label: "Course", value: "" },
  correctAnswer: { type: "text", label: "Correct Answer", value: "" },
  optionA: { type: "text", label: "Option A", value: "" },
  optionB: { type: "text", label: "Option B", value: "" },
  optionC: { type: "text", label: "Option C", value: "" },
  optionD: { type: "text", label: "Option D", value: "" },
  optionE: { type: "text", label: "Option E", value: "" }
};

function QuestionList(props) {

  const dispatch = useDispatch()
  const { list = [], loading = false, changeFilter, filterValue } = props
  const [menu, setMenu] = useState(null);
  const [rowPerPage, setRowPerPage] = useState(filterValue?.length);
  const [rows, setRows] = useState();
  const [orderby, setOrderby] = useState("");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  // const rows = generateRows(list, questiontableheads).reverse();

  useEffect(() => {
    const rowList = generateRows(list.data, questiontableheads, orderby, "asc");
    setRows(rowList);
  }, [list, orderby]);

  function columnClickhandler(item) {
    if (orderby === item) {
      setOrderby("")
    } else {
      setOrderby(item)
    }
  }



  function rowClickhandler(item) {
    const activeRow = list.data[item]
    dispatch(setActiveRow(activeRow))
  }

  function handlerRowperpagechange(event) {
    changeFilter(prev => ({ ...prev, start: 0, length: event.target.value }))
    // setRowPerPage(event.target.value);
  }



  function paginghandler(e, value) {
    let startfrom = (rowPerPage * value) - rowPerPage
    changeFilter(prev => ({ ...prev, start: startfrom }))
  }


  const renderRowperpage = (
    <SoftBox sx={{ display: "flex", alignItems: "center" }}>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        Rows per page :  &nbsp;
      </SoftTypography>
      <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={rowPerPage}
          onChange={handlerRowperpagechange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
    </SoftBox>
  );


  function filterFunction(data) {
    changeFilter(prev => ({
      ...prev,
      filter: {
        ...prev.filter,
        ...data
      }
    }));
  }


  return (
    <Card>
      <SoftBox p={2}>
        <SoftFilter filterObj={filterdata} listFilter={filterFunction} />
      </SoftBox>
      {loading && <SoftBarLoader />}
      {!loading && rows?.length ? <>
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
        <SoftBox mt={2} mb={2} px={2}>
          <Stack spacing={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {renderRowperpage}
            <Pagination onChange={paginghandler} count={Math.ceil(list?.recordsTotal / rowPerPage)} variant="outlined" shape="rounded" />
          </Stack>
        </SoftBox>
      </> : null}
    </Card>
  );
}

export default QuestionList;
