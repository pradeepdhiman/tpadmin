

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TimelineItem from "examples/Timeline/TimelineItem";
import { useDbcourselistApplicantQuery } from "layouts/dashboard/functions/query";

function NewOrders() {
  // const { data: applicantCourseList, isLoading: listLoading, isError: listError, refetch: refreshList } = useDbcourselistApplicantQuery();
  // let pendingPaymentCourse = applicantCourseList?.data?.filter(item => item.receipt == null)
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Orders overview
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>
                <ArrowUpwardIcon/>
              </Icon>
            </SoftTypography>
            &nbsp;
            <SoftTypography variant="button" color="text" fontWeight="medium">
              24%
            </SoftTypography>{" "}
            this month
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <TimelineItem
          color="success"
          icon={<ImportContactsIcon/>}
          title="$240, Javascript"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon={<ImportContactsIcon/>}
          title="$50, React js"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon={<ImportContactsIcon/>}
          title="$47, Material UI"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon={<ImportContactsIcon/>}
          title="$78, Web designing"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon={<ImportContactsIcon/>}
          title="$65, Network Marketing"
          dateTime="18 DEC 4:54 AM"
        />
        <TimelineItem color="dark" icon={<ImportContactsIcon/>} title="$75, RDBMS" dateTime="17 DEC" />
      </SoftBox>
    </Card>
  );
}

export default NewOrders;
