
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function ScheduleItem({itemData, onAssign}) {
  const {
    scheduledID=null,
    scheduledName = "",
    startDate = "",
    instructor = "",
    location = ""
  } = itemData
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={1}
    >
      <SoftBox lineHeight={1}>
        <SoftTypography display="block" variant="button" fontWeight="medium">
          {scheduledName}
        </SoftTypography>
        <SoftTypography variant="caption" fontWeight="regular" color="text">
          {startDate}
        </SoftTypography>
      </SoftBox>
      <SoftBox lineHeight={1} >
        <SoftBox><SoftTypography display="block" variant="button" fontWeight="medium">
          {instructor}
        </SoftTypography></SoftBox>
        <SoftTypography variant="caption" fontWeight="regular" color="text">
          {location}
        </SoftTypography>
      </SoftBox>
      <SoftButton onClick={()=>onAssign(scheduledID)} size="small" variant="text" color="info">Assign</SoftButton>
    </SoftBox>
  );
}



export default ScheduleItem;
