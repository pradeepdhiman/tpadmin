

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
import data from "./data";
import DoneIcon from '@mui/icons-material/Done';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useDblistcoursesQuery } from "common/query";
import { generateRows } from "utils/utils";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { dbcoursestableheads } from "layouts/dashboard/constant";

// Data

function LatestCourse() {
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const { data: latestCourseList, isError: courseListErr, isLoading: courseListLoading } = useDblistcoursesQuery()

  const rows = generateRows(latestCourseList, dbcoursestableheads).reverse()

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
            Latest Courses
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
              &nbsp;<strong>{latestCourseList?.data?.length} new</strong> this month
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            <OpenInFullIcon />
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox>
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        {courseListLoading && <SoftBarLoader />}
        {latestCourseList?.data.length !== 0 ? <SoftBox px={2} pb={2}><Table columns={dbcoursestableheads} rows={rows} /></SoftBox> : <SoftTypography variant="h6" gutterBottom>
          No course available
        </SoftTypography>}
      </SoftBox>
    </Card>
  );
}

export default LatestCourse;
