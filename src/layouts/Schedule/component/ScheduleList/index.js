

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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { scheduletableheads } from "layouts/Schedule/constant";
import { generateRows } from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow } from "layouts/Schedule/functions/scheduleSlice";
import { FormControl, Pagination, Select, Stack } from "@mui/material";

// Data

function ScheduleList(props) {
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(null);

  const { list = [], loading = false, changeFilter  } = props
  const [rowPerPage, setRowPerPage] = useState(10);
  const [orderby, setOrderby] = useState("");
  const [rows, setRows] = useState();


  const { course, editid } = useSelector(state => state.schedule)

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  // const rows = generateRows(list, scheduletableheads)

  useEffect(() => {
    const rowList = generateRows(list, scheduletableheads, orderby, "asc");
    setRows(rowList);
  }, [list, orderby]);

  function columnClickhandler(item) {
    console.log(item)
  }

  function rowClickhandler(item) {
    const activeRow = list.data[item]
    dispatch(setActiveRow(activeRow))
  }

  function columnClickhandler(item) {
    if (orderby === item) {
      setOrderby("")
    } else {
      setOrderby(item)
    }
  }

  function handlerRowperpagechange(event) {
    changeFilter(prev => ({ ...prev, start: 0, length: event.target.value }))
    setRowPerPage(event.target.value);
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

 
  return (
    <Card>
      {/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Schedule List
          </SoftTypography>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            <MoreVertIcon />
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox> */}
      {rows?.length ? <SoftBox pt={2}
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
        <Table columns={scheduletableheads} rows={rows} columnFunc={columnClickhandler} rowFunc={rowClickhandler} />
      </SoftBox> :
        <SoftBox p={2} sx={{ display: "block", width: "100%" }}>
          <SoftTypography >No schedules are available</SoftTypography>
        </SoftBox>
      }
      <SoftBox mt={2} mb={2} px={2}>
        <Stack spacing={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {renderRowperpage}
          <Pagination onChange={paginghandler} count={Math.ceil(list?.recordsTotal / rowPerPage)} variant="outlined" shape="rounded" />
        </Stack>
      </SoftBox>
    </Card>
  );
}

export default ScheduleList;
