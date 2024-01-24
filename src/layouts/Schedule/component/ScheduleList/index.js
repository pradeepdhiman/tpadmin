

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
import { useListScheduleQuery } from "layouts/Schedule/functions/query";
import { scheduletableheads } from "layouts/Schedule/constant";
import { generateRows } from "utils/utils";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { setScheduleList } from "layouts/Schedule/functions/scheduleSlice";
import { setScheduleloading } from "layouts/Schedule/functions/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleEdit } from "layouts/Schedule/functions/scheduleSlice";
import { useDeleteScheduleMutation } from "layouts/Schedule/functions/query";
import { setActiveRow } from "layouts/Schedule/functions/scheduleSlice";

// Data

function ScheduleList(props) {
  const { list = [], loading = false, } = props
  // const { columns, rows } = data();
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(null);
  const { course, editid } = useSelector(state => state.schedule)

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const rows = generateRows(list, scheduletableheads).reverse()

  function columnClickhandler(item) {
    console.log(item)
  }

  function rowClickhandler(item) {
    const activeRow = list.data[item]
    dispatch(setActiveRow(activeRow))
  }


  function onEdit(item) {
    dispatch(setScheduleEdit(item))
    editFun()
  }

  async function onDelete(id) {
    try {
      const deleteRes = await deleteSchedule(id);
      if (deleteRes?.data?.success) {
        const fetchRes = await refreshSchedule();
        dispatch(setScheduleList(fetchRes?.data));
      }
    } catch (err) {
      console.error(err);
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await refreshSchedule();
  //       if (res?.data?.success) {
  //         dispatch(setScheduleList(res?.data))
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   if (course?.courseID && !isEdit) {
  //     fetchData();
  //   }
  // }, [course, isEdit]);

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
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
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
      </SoftBox>
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
        <Table columns={scheduletableheads} rows={rows} columnFunc={columnClickhandler} rowFunc={rowClickhandler} />
      </SoftBox>
      {/* <SoftBox mt={2} mb={2}>
        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Pagination count={5} variant="outlined" shape="rounded" />
        </Stack>
      </SoftBox> */}
    </Card>
  );
}

export default ScheduleList;
