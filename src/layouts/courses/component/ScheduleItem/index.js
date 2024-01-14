
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import moment from "moment";

function ScheduleItem({ itemData, onSelect }) {
  const {
    scheduledID = null,
    scheduledName = "",
    courseName = "",
    scheduleCreatedDateTime = "",
    instructorName = "",
    locationName = "",
    statusName = ""
  } = itemData
  return (
    <SoftBox
      onClick={() => onSelect(scheduledID)}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      px={2}
      mb={1}
      sx={{ cursor: "pointer" }}
    >
      <SoftBox lineHeight={1}>
        <SoftTypography display="block" variant="button" fontWeight="medium">
          {scheduledName}
        </SoftTypography>
        <SoftTypography variant="caption" fontWeight="regular" color="text">
          {courseName}
        </SoftTypography>
      </SoftBox>
      <SoftBox lineHeight={1} >
        <SoftBox><SoftTypography display="block" variant="button" fontWeight="medium">
          {instructorName}
        </SoftTypography></SoftBox>
        <SoftTypography variant="caption" fontWeight="regular" color="text">
          {locationName}
        </SoftTypography>
      </SoftBox>
      <SoftBox lineHeight={1} >
        <SoftBox><SoftTypography display="block" variant="button" fontWeight="medium">
          {moment(scheduleCreatedDateTime).format("DD-MM-YYYY")}
        </SoftTypography></SoftBox>
        <SoftTypography variant="caption" fontWeight="regular" color={statusName === "Active" ? "success" : "error"}>
          {statusName}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}



export default ScheduleItem;
