
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ListItem({ item }) {

  const styles = {
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "top",
      py: 1,
      pr: 1,
      mb: 1,
    },
    softBox: {
      lineHeight: 1,
    },
  };

  return (
    <SoftBox component="li" {...styles.listItem}>
      {Object.entries(item).map(([key, value]) => (
        key !== "applicantCourseID" && (
          <SoftBox lineHeight={1} key={`${key}-item`} {...styles.softBox}>
            <SoftTypography display="block" variant="button" fontWeight="medium" fontSize="12px">
              {key.toUpperCase()}
            </SoftTypography>
            <SoftTypography variant="caption" fontWeight="bold" color="text">
              {value}
            </SoftTypography>
          </SoftBox>
        )
      ))}
    </SoftBox>
  );
}


export default ListItem;
