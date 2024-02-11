

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
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import moment from "moment";

function NewOrders(props) {
  const { list = [], loading = false } = props
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Transactions
        </SoftTypography>
        {/* <SoftBox mt={1} mb={2}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>
                <ArrowUpwardIcon />
              </Icon>
            </SoftTypography>
            &nbsp;
            <SoftTypography variant="button" color="text" fontWeight="medium">
              24%
            </SoftTypography>{" "}
            this month
          </SoftTypography>
        </SoftBox> */}
      </SoftBox>
      <SoftBox p={2}>
        {loading && <SoftBarLoader />}
        {list?.length && list?.map(item => <TimelineItem
          color="error"
          icon={<ImportContactsIcon />}
          title={`$${item?.trainingfee}, ${item?.courseName}`}
          dateTime={moment(item?.enrollmentDate).format("DD-MM-YYYY")}
          key={item?.applicantCourseID}
        />
        )}
      </SoftBox>
    </Card>
  );
}

export default NewOrders;
