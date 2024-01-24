

import { useState } from "react";

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
import { Pagination, Stack } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { generateRows } from "utils/utils";
import { assessmentTableHeads } from "layouts/Assessments/constant";
import { setActiveRow } from "layouts/Assessments/function/assessmentSlice";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";

// Data

function AssessmentList(props) {
  
  const { list = [], loading = false, } = props
  // const { columns, rows } = data();
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(null);
  const { activeRow } = useSelector(state => state.assessment)

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const rows = generateRows(list, assessmentTableHeads).reverse()

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
      <MenuItem onClick={closeMenu}>New Orders</MenuItem>
      <MenuItem onClick={closeMenu}>Compleated</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Assessment List
          </SoftTypography>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            <MoreVertIcon />
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox>
      {loading && <SoftBarLoader/>}
      {!loading && <SoftBox
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
        <Table columns={assessmentTableHeads} rows={rows} columnFunc={columnClickhandler} rowFunc={rowClickhandler} />
      </SoftBox>}
      {/* <SoftBox mt={2} mb={2}>
        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Pagination count={5} variant="outlined" shape="rounded" />
        </Stack>
      </SoftBox> */}
    </Card>
  );
}

export default AssessmentList;
