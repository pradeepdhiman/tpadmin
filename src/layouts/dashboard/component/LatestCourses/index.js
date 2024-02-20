

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
import { useDblistcoursesQuery } from "common/query";
import { generateRows } from "utils/utils";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { dbcoursestableheads } from "layouts/dashboard/constant";
import { useDbCourseFilterMutation } from "layouts/dashboard/functions/query";

// Data


const initialFilter = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "CourseName",
      "name": "CourseName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "Sample",
        "regex": "false"
      }
    },
    {
      "data": "Duration",
      "name": "Duration",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "Sample",
        "regex": "false"
      }
    }
  ],
  "search": {
    "value": "Sample",
    "regex": "false"
  },
  "order": {
    "orderBy": "UpdatedDate",
    "orderDirection": "desc"
  },
  "filter": {
    "courseID": 0,
    "courseName": "",
    "description": "",
    "duration": "",
    "categoryID": 0,
    "categoryName": "",
    "syllabus": "",
    "trainingfee": "",
    "vat": "",
    "totalAmount": "",
    "status": 0,
    "statusName": "",
    "courseImage": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
};

function LatestCourse() {
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [filters, setFilters] = useState(initialFilter)

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [filterCourse, { data: latestCourseList, isError: courseListErr, isLoading: courseListLoading }] = useDbCourseFilterMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        await filterCourse(filters);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);


  const rows = generateRows(latestCourseList, dbcoursestableheads).reverse()


  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Latest Courses
          </SoftTypography>
        </SoftBox>
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
