

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
import DoneIcon from '@mui/icons-material/Done';
import { FormControl, Pagination, Select, Stack } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { generateRows } from "utils/utils";
import { tableheads } from "layouts/Orders/constant";
import { useNavigate } from "react-router-dom";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import SoftFilter from "examples/SoftFilter";

// Data

const filterdata = {
  courseName: { type: "text", label: "Course", value: "", search: true },
  applicantName: { type: "text", label: "Learner", value: "" },
  scheduleName: { type: "text", label: "Schedule", value: "" },
  paymentStatusName: { type: "text", label: "Payment Status", value: "" },
  remarks: { type: "text", label: "Remarks", value: "" }
};



function OrderList(props) {
  const { list = [], loading = false, changeFilter } = props
  const [rowPerPage, setRowPerPage] = useState(10);
  const [rows, setRows] = useState();
  const [orderby, setOrderby] = useState("");

  const [menu, setMenu] = useState(null);
  const navigate = useNavigate()

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  // const rows = generateRows(list, tableheads);


  function rowClickhandler(item) {
    const activeRow = list?.data[item]
    // dispatch(setActiveRow(activeRow))
    navigate(`/applicants?id=${activeRow?.applicantID}&verify=true`)
  }

  useEffect(() => {
    const rowList = generateRows(list, tableheads, orderby, "asc");
    setRows(rowList);
  }, [list, orderby]);

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

  function filterFunction(data) {
    changeFilter(prev => ({
      ...prev,
      filter: {
        ...prev.filter,
        ...data
      }
    }));
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
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Training Requests
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <SoftFilter filterObj={filterdata} listFilter={filterFunction} />
      </SoftBox>
      {loading && <SoftBarLoader />}
      {!loading && rows?.length ? <>
        <SoftBox px={2} pt={2}
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <Table columns={tableheads} rows={rows} columnFunc={columnClickhandler} rowFunc={rowClickhandler} />
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

export default OrderList;
